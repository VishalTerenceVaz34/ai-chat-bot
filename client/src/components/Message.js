import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/Message.css';

function Message({ message }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <div className={`message ${message.role}`}>
      <div className="message-content">
        <ReactMarkdown components={{ code: CodeBlock }}>
          {message.content}
        </ReactMarkdown>
      </div>
      <div className="message-actions">
        {message.role === 'assistant' && (
          <>
            <button className="action-btn" onClick={handleCopy} title="Copy">
              <FiCopy size={16} />
            </button>
            {copied && <span className="copy-feedback">Copied!</span>}
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
