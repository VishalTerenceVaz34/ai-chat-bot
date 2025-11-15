const express = require('express');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const File = require('../models/File');
const { getFileType } = require('../utils/helpers');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Upload file
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { conversationId } = req.body;
    const fileType = getFileType(req.file.mimetype);

    const file = new File({
      userId: req.userId,
      conversationId: conversationId || null,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      fileType
    });

    await file.save();

    res.status(201).json({
      id: file._id,
      filename: file.filename,
      originalName: file.originalName,
      url: `/uploads/${file.filename}`,
      fileType: file.fileType,
      size: file.size
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'File upload failed' });
  }
});

// Get user files
router.get('/', authMiddleware, async (req, res) => {
  try {
    const files = await File.find({ userId: req.userId })
      .select('_id originalName fileType size createdAt')
      .sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Get conversation files
router.get('/conversation/:conversationId', authMiddleware, async (req, res) => {
  try {
    const files = await File.find({
      userId: req.userId,
      conversationId: req.params.conversationId
    });

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversation files' });
  }
});

// Delete file
router.delete('/:fileId', authMiddleware, async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Delete from database
    await File.findByIdAndDelete(req.params.fileId);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Download file
router.get('/download/:fileId', authMiddleware, async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
});

module.exports = router;
