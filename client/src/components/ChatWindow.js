import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiMic, FiPaperclip, FiMoreVertical } from 'react-icons/fi';
import { useChatStore } from '../stores/chatStore';
import api from '../api/axios';
import Message from './Message';
import '../styles/ChatPage.css';

function ChatWindow({ conversationId }) {
  const { messages, loadMessages, sendMessage, conversation } = useChatStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [recording, setRecording] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    if (conversationId) {
      setLoading(true);
      loadMessages(conversationId).finally(() => {
        setLoading(false);
      });
    }
  }, [conversationId, loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError('');

    if (!input.trim() && attachments.length === 0) {
      return;
    }

    setSending(true);

    try {
      await sendMessage(conversationId, input, attachments);
      setInput('');
      setAttachments([]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversationId', conversationId);

    try {
      const response = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAttachments([...attachments, response.data]);
    } catch (error) {
      console.error('Failed to upload file:', error);
      setError('Failed to upload file');
    }
  };

  const handleVoiceRecord = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const file = new File([blob], `audio-${Date.now()}.wav`, { type: 'audio/wav' });
          await handleFileUpload(file);
        };

        mediaRecorder.start();
        setRecording(true);
      } catch (error) {
        console.error('Microphone access denied:', error);
        setError('Microphone access denied');
      }
    } else {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{conversation?.title || 'Chat'}</h2>
        <div className="chat-options">
          <button className="btn-icon" title="Options">
            <FiMoreVertical />
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages">
          {messages.length === 0 && !loading ? (
            <div className="empty-state">
              <h3>Start a conversation</h3>
              <p>Ask me anything! I can help with questions, writing, coding, and more.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <Message key={msg._id || msg.id} message={msg} />
            ))
          )}
          {sending && (
            <div className="message assistant">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-area">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')}>×</button>
          </div>
        )}

        {attachments.length > 0 && (
          <div className="attachments-preview">
            {attachments.map((file) => (
              <div key={file.id || file._id} className="attachment-item">
                <span>{file.originalName}</span>
                <button
                  onClick={() => setAttachments(attachments.filter(f => (f.id !== (file.id || file._id) && f._id !== (file.id || file._id))))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />

          <button
            type="button"
            className="btn-icon"
            onClick={() => fileInputRef.current?.click()}
            title="Attach file"
            disabled={sending}
          >
            <FiPaperclip />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={sending}
          />

          <button
            type="button"
            className={`btn-icon ${recording ? 'recording' : ''}`}
            onClick={handleVoiceRecord}
            title={recording ? 'Stop recording' : 'Start voice message'}
            disabled={sending}
          >
            <FiMic />
          </button>

          <button
            type="submit"
            className="btn-icon send"
            disabled={sending || (!input.trim() && attachments.length === 0)}
            title="Send message"
          >
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
