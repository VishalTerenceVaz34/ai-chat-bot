// Mock Database for Development - Stores data in memory
class MockDb {
  constructor() {
    this.users = [];
    this.conversations = [];
    this.messages = [];
    this.files = [];
  }

  // User methods
  createUser(userData) {
    const user = {
      _id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  findUserById(id) {
    return this.users.find(u => u._id === id);
  }

  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (user) {
      Object.assign(user, updates, { updatedAt: new Date() });
    }
    return user;
  }

  // Conversation methods
  createConversation(convData) {
    const conversation = {
      _id: `conv_${Date.now()}`,
      ...convData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.conversations.push(conversation);
    return conversation;
  }

  findConversationById(id) {
    return this.conversations.find(c => c._id === id);
  }

  findConversationsByUserId(userId) {
    return this.conversations.filter(c => c.userId === userId);
  }

  updateConversation(id, updates) {
    const conv = this.findConversationById(id);
    if (conv) {
      Object.assign(conv, updates, { updatedAt: new Date() });
    }
    return conv;
  }

  deleteConversation(id) {
    const index = this.conversations.findIndex(c => c._id === id);
    if (index > -1) {
      this.conversations.splice(index, 1);
      return true;
    }
    return false;
  }

  // Message methods
  createMessage(msgData) {
    const message = {
      _id: `msg_${Date.now()}`,
      ...msgData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.messages.push(message);
    return message;
  }

  findMessagesByConversationId(conversationId) {
    return this.messages.filter(m => m.conversationId === conversationId);
  }

  findMessageById(id) {
    return this.messages.find(m => m._id === id);
  }

  updateMessage(id, updates) {
    const msg = this.findMessageById(id);
    if (msg) {
      Object.assign(msg, updates, { updatedAt: new Date() });
    }
    return msg;
  }

  deleteMessage(id) {
    const index = this.messages.findIndex(m => m._id === id);
    if (index > -1) {
      this.messages.splice(index, 1);
      return true;
    }
    return false;
  }

  // File methods
  createFile(fileData) {
    const file = {
      _id: `file_${Date.now()}`,
      ...fileData,
      createdAt: new Date()
    };
    this.files.push(file);
    return file;
  }

  findFilesByConversationId(conversationId) {
    return this.files.filter(f => f.conversationId === conversationId);
  }

  deleteFile(id) {
    const index = this.files.findIndex(f => f._id === id);
    if (index > -1) {
      this.files.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = new MockDb();
