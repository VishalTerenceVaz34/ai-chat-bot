const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Conversation'
  },
  description: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: 'gpt-3.5-turbo',
    enum: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
  },
  temperature: {
    type: Number,
    default: 0.7,
    min: 0,
    max: 2
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  isShared: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String,
    default: null
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Conversation', conversationSchema);
