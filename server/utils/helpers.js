const crypto = require('crypto');

const generateShareToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateUserId = () => {
  return crypto.randomBytes(16).toString('hex');
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getFileType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.includes('pdf') || mimetype.includes('document') || mimetype.includes('word')) return 'document';
  return 'other';
};

module.exports = {
  generateShareToken,
  generateUserId,
  formatDate,
  getFileType
};
