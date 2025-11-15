const express = require('express');
const authMiddleware = require('../middleware/auth');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const mockDb = require('../mockDb');
const { generateChatCompletion } = require('../utils/openai');

const router = express.Router();

// Create message and get AI response
router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { conversationId, content, attachments = [] } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Message content cannot be empty' });
    }

    // Find or create conversation using mockDb (in-memory)
    let conversation = mockDb.findConversationById(conversationId);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Create user message
    const userMessage = mockDb.createMessage({
      conversationId,
      userId: req.userId,
      content,
      role: 'user',
      attachments,
      type: attachments.length > 0 ? 'image' : 'text'
    });

    conversation.messages.push(userMessage._id);

    // Get previous messages for context
    const previousMessages = mockDb.findMessagesByConversationId(conversationId);
    const messages = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add current message
    messages.push({ role: 'user', content });

    // Get AI response
    let aiResponse;
    try {
      aiResponse = await generateChatCompletion(
        messages,
        conversation.model,
        conversation.temperature
      );
    } catch (error) {
      console.error('Error generating AI response:', error);
      aiResponse = 'I encountered an error processing your message. Please try again or check your OpenAI API configuration.';
    }

    // Create AI message
    const aiMessage = mockDb.createMessage({
      conversationId,
      userId: null,
      content: aiResponse,
      role: 'assistant',
      type: 'text'
    });

    conversation.messages.push(aiMessage._id);
    conversation.updatedAt = new Date();
    mockDb.updateConversation(conversationId, { updatedAt: conversation.updatedAt });

    res.json({
      success: true,
      userMessage: {
        _id: userMessage._id,
        id: userMessage._id,
        content: userMessage.content,
        role: 'user',
        createdAt: userMessage.createdAt
      },
      aiMessage: {
        _id: aiMessage._id,
        id: aiMessage._id,
        content: aiMessage.content,
        role: 'assistant',
        createdAt: aiMessage.createdAt
      }
    });
  } catch (error) {
    console.error('Error in chat message route:', error);
    res.status(500).json({ error: error.message || 'Failed to process message' });
  }
});

// Get messages in conversation
router.get('/messages/:conversationId', authMiddleware, async (req, res) => {
  try {
    const messages = mockDb.findMessagesByConversationId(req.params.conversationId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Edit message
router.put('/message/:messageId', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const message = mockDb.updateMessage(req.params.messageId, {
      content,
      isEdited: true,
      editedAt: new Date()
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit message' });
  }
});

// Rate message
router.post('/message/:messageId/rate', authMiddleware, async (req, res) => {
  try {
    const { rating } = req.body; // -1, 0, or 1
    const message = mockDb.updateMessage(req.params.messageId, { rating });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to rate message' });
  }
});

// Delete message
router.delete('/message/:messageId', authMiddleware, async (req, res) => {
  try {
    mockDb.deleteMessage(req.params.messageId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
