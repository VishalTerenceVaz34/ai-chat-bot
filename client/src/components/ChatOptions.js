import React from 'react';
import { FiDownload, FiShare2, FiTrash2, FiArchive } from 'react-icons/fi';
import { useChatStore } from '../stores/chatStore';
import '../styles/ChatOptions.css';

function ChatOptions({ conversationId }) {
  const { shareConversation, exportConversation, deleteConversation, archiveConversation } = useChatStore();
  const [showMenu, setShowMenu] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState('');

  const handleShare = async () => {
    try {
      const result = await shareConversation(conversationId);
      setShareUrl(result.shareUrl);
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleExport = async () => {
    try {
      await exportConversation(conversationId);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob());
      link.download = `conversation-${conversationId}.json`;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleArchive = async () => {
    try {
      await archiveConversation(conversationId);
      setShowMenu(false);
    } catch (error) {
      console.error('Archive failed:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      try {
        await deleteConversation(conversationId);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div className="chat-options-menu">
      <button className="menu-trigger" onClick={() => setShowMenu(!showMenu)}>
        ⋯
      </button>

      {showMenu && (
        <div className="options-dropdown">
          <button onClick={handleShare} className="option-item">
            <FiShare2 /> Share
          </button>
          <button onClick={handleExport} className="option-item">
            <FiDownload /> Export
          </button>
          <button onClick={handleArchive} className="option-item">
            <FiArchive /> Archive
          </button>
          <button onClick={handleDelete} className="option-item danger">
            <FiTrash2 /> Delete
          </button>
        </div>
      )}

      {shareUrl && (
        <div className="share-modal">
          <h3>Share Conversation</h3>
          <input type="text" value={shareUrl} readOnly />
          <button onClick={() => navigator.clipboard.writeText(shareUrl)}>
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatOptions;
