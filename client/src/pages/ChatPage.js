import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import '../styles/ChatPage.css';

function ChatPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { conversations, loadConversations, currentConversation, setCurrentConversation, createConversation } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initChat = async () => {
      try {
        await loadConversations();
        
        // If no conversations exist, create one
        if (conversations.length === 0 || !currentConversation) {
          const newConv = await createConversation('New Conversation');
          if (newConv) {
            // Handle both _id and id properties
            const convId = newConv._id || newConv.id;
            setCurrentConversation(convId);
          }
        }
      } catch (err) {
        console.error('Failed to initialize chat:', err);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, []); // Run only once on mount

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading chat...</div>;
  }

  if (!currentConversation) {
    return (
      <div className="chat-page">
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          onLogout={handleLogout}
        />
        <div className="chat-loading">
          <p>Initializing conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
        onLogout={handleLogout}
      />
      <ChatWindow conversationId={currentConversation} />
    </div>
  );
}

export default ChatPage;
