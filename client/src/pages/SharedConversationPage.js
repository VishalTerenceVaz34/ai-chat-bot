import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import '../styles/ChatPage.css';

function SharedConversationPage() {
  const { shareToken } = useParams();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await api.get(`/conversations/public/${shareToken}`);
        setConversation(response.data);
      } catch (err) {
        setError('Conversation not found or not shared');
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [shareToken]);

  if (loading) {
    return <div className="loading">Loading shared conversation...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{conversation?.title || 'Shared Conversation'}</h1>
      </div>
      <div className="messages">
        {conversation?.messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharedConversationPage;
