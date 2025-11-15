import create from 'zustand';
import api from '../api/axios';

export const useChatStore = create((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  conversation: null,

  loadConversations: async () => {
    try {
      const response = await api.get('/conversations');
      set({ conversations: response.data });
      return response.data;
    } catch (error) {
      console.error('Failed to load conversations:', error);
      return [];
    }
  },

  setCurrentConversation: (id) => {
    set({ currentConversation: id });
  },

  createConversation: async (title = 'New Conversation') => {
    try {
      const response = await api.post('/conversations', { title });
      const newConv = response.data;
      // Handle both _id and id properties from backend
      const convId = newConv._id || newConv.id;
      
      set((state) => ({
        conversations: [newConv, ...state.conversations],
        currentConversation: convId
      }));
      
      return newConv;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    }
  },

  loadMessages: async (conversationId) => {
    try {
      const convResponse = await api.get(`/conversations/${conversationId}`);
      set({
        conversation: convResponse.data,
        messages: convResponse.data.messages || []
      });
      return convResponse.data.messages || [];
    } catch (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
  },

  sendMessage: async (conversationId, content, attachments = []) => {
    try {
      if (!content || !content.trim()) {
        throw new Error('Message content cannot be empty');
      }

      const response = await api.post('/chat/message', {
        conversationId,
        content,
        attachments: attachments.map(f => f.id || f._id)
      });

      if (!response.data.success && !response.data.userMessage) {
        throw new Error('Invalid response from server');
      }

      const { userMessage, aiMessage } = response.data;
      
      set((state) => ({
        messages: [...state.messages, userMessage, aiMessage]
      }));

      return { userMessage, aiMessage };
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  },

  deleteConversation: async (conversationId) => {
    try {
      await api.delete(`/conversations/${conversationId}`);
      set((state) => ({
        conversations: state.conversations.filter(c => (c._id !== conversationId && c.id !== conversationId)),
        currentConversation: state.conversations[0]?._id || state.conversations[0]?.id || null
      }));
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      throw error;
    }
  },

  archiveConversation: async (conversationId) => {
    try {
      await api.post(`/conversations/${conversationId}/archive`);
      set((state) => ({
        conversations: state.conversations.filter(c => (c._id !== conversationId && c.id !== conversationId))
      }));
    } catch (error) {
      console.error('Failed to archive conversation:', error);
      throw error;
    }
  },

  shareConversation: async (conversationId) => {
    try {
      const response = await api.post(`/conversations/${conversationId}/share`);
      return response.data;
    } catch (error) {
      console.error('Failed to share conversation:', error);
      throw error;
    }
  },

  exportConversation: async (conversationId) => {
    try {
      const response = await api.get(`/conversations/${conversationId}/export/json`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `conversation-${conversationId}.json`);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (error) {
      console.error('Failed to export conversation:', error);
      throw error;
    }
  }
}));
