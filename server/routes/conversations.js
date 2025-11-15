const express = require('express');
const authMiddleware = require('../middleware/auth');
const mockDb = require('../mockDb');
const { generateShareToken } = require('../utils/helpers');

const router = express.Router();

// Create new conversation
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title = 'New Conversation', model = 'gpt-3.5-turbo', temperature = 0.7 } = req.body;

    const conversation = mockDb.createConversation({
      userId: req.userId,
      title,
      model,
      temperature,
      isArchived: false,
      isShared: false
    });

    res.status(201).json({
      _id: conversation._id,
      id: conversation._id,
      title: conversation.title,
      model: conversation.model,
      temperature: conversation.temperature,
      createdAt: conversation.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Get all conversations for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const conversations = mockDb.findConversationsByUserId(req.userId)
      .filter(c => !c.isArchived)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Get archived conversations
router.get('/archived/list', authMiddleware, async (req, res) => {
  try {
    const conversations = mockDb.findConversationsByUserId(req.userId)
      .filter(c => c.isArchived)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch archived conversations' });
  }
});

// Get single conversation with messages
router.get('/:conversationId', authMiddleware, async (req, res) => {
  try {
    const conversation = mockDb.findConversationById(req.params.conversationId);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const messages = mockDb.findMessagesByConversationId(req.params.conversationId);
    
    res.json({
      ...conversation,
      messages
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// Update conversation
router.put('/:conversationId', authMiddleware, async (req, res) => {
  try {
    const { title, description, model, temperature } = req.body;

    const conversation = mockDb.updateConversation(req.params.conversationId, {
      title: title || undefined,
      description: description || undefined,
      model: model || undefined,
      temperature: temperature || undefined
    });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update conversation' });
  }
});

// Archive conversation
router.post('/:conversationId/archive', authMiddleware, async (req, res) => {
  try {
    const conversation = mockDb.updateConversation(req.params.conversationId, {
      isArchived: true
    });

    res.json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to archive conversation' });
  }
});

// Restore conversation
router.post('/:conversationId/restore', authMiddleware, async (req, res) => {
  try {
    const conversation = mockDb.updateConversation(req.params.conversationId, {
      isArchived: false
    });

    res.json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to restore conversation' });
  }
});

// Delete conversation
router.delete('/:conversationId', authMiddleware, async (req, res) => {
  try {
    // Delete all messages in conversation
    const messages = mockDb.findMessagesByConversationId(req.params.conversationId);
    messages.forEach(msg => mockDb.deleteMessage(msg._id));
    
    // Delete conversation
    mockDb.deleteConversation(req.params.conversationId);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

// Share conversation
router.post('/:conversationId/share', authMiddleware, async (req, res) => {
  try {
    const shareToken = generateShareToken();

    const conversation = mockDb.updateConversation(req.params.conversationId, {
      isShared: true,
      shareToken
    });

    res.json({
      shareUrl: `${process.env.FRONTEND_URL}/share/${shareToken}`,
      shareToken
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to share conversation' });
  }
});

// Get shared conversation
router.get('/public/:shareToken', async (req, res) => {
  try {
    const conversation = mockDb.conversations.find(c => 
      c.shareToken === req.params.shareToken && c.isShared
    );

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found or not shared' });
    }

    const messages = mockDb.findMessagesByConversationId(conversation._id);

    res.json({
      ...conversation,
      messages
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// Export conversation as JSON
router.get('/:conversationId/export/json', authMiddleware, async (req, res) => {
  try {
    const conversation = mockDb.findConversationById(req.params.conversationId);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const messages = mockDb.findMessagesByConversationId(req.params.conversationId);

    const data = {
      title: conversation.title,
      description: conversation.description,
      createdAt: conversation.createdAt,
      messages
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="conversation-${conversation._id}.json"`);
    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
    res.status(500).json({ error: 'Failed to export conversation' });
  }
});

module.exports = router;
