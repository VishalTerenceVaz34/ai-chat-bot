import React from 'react';
import { FiMenu, FiPlus, FiArchive, FiLogOut, FiTrash2, FiSettings } from 'react-icons/fi';
import { useChatStore } from '../stores/chatStore';
import '../styles/Sidebar.css';

function Sidebar({ open, onToggle, user, onLogout }) {
  const { conversations, currentConversation, setCurrentConversation, createConversation, deleteConversation, archiveConversation } = useChatStore();

  const handleNewChat = async () => {
    const newConversation = await createConversation();
    // API may return `id` or `_id` depending on backend; handle both
    setCurrentConversation(newConversation?.id || newConversation?._id || null);
  };

  const handleArchive = async (convId, e) => {
    e.stopPropagation();
    await archiveConversation(convId);
  };

  const handleDelete = async (convId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(convId);
    }
  };

  return (
    <>
      <button className="menu-toggle" onClick={onToggle}>
        <FiMenu size={24} />
      </button>

      <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1>AI Chat Bot</h1>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          <FiPlus /> New Chat
        </button>

        <div className="conversations-list">
          <h3>Conversations</h3>
          {conversations.map((conv) => (
            <div
              key={conv._id}
              className={`conversation-item ${currentConversation === conv._id ? 'active' : ''}`}
              onClick={() => setCurrentConversation(conv._id)}
            >
              <span className="conv-title">{conv.title}</span>
              <div className="conv-actions">
                <button
                  className="action-btn"
                  onClick={(e) => handleArchive(conv._id, e)}
                  title="Archive"
                >
                  <FiArchive size={16} />
                </button>
                <button
                  className="action-btn"
                  onClick={(e) => handleDelete(conv._id, e)}
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <p className="user-name">{user?.username}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>

          <button className="profile-link" title="Settings">
            <FiSettings />
          </button>

          <button className="logout-btn" onClick={onLogout} title="Logout">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
