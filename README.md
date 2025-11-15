# AI Chat Bot - Full Stack Application

A comprehensive full-stack AI chatbot application with user authentication, real-time chat, document/image sharing, and voice chat capabilities.

## ⚡ Quick Start

> **New to this project?** Follow these steps to get up and running in 5 minutes!

### For Windows Users:
```bash
# Double-click START.bat in the project folder
# Or run in terminal:
START.bat
```

### For Mac/Linux Users:
```bash
# Install dependencies
npm install
npm run install-all

# Terminal 1 - Start Backend
npm run dev

# Terminal 2 - Start Frontend (in a new terminal)
npm run client
```

Then open your browser to: **http://localhost:3000**

### First Time Setup:
1. Click "Sign up" on the login page
2. Create an account (any credentials work locally)
3. Start chatting!

> 📖 For detailed setup instructions, see [SETUP_AND_RUN.md](./SETUP_AND_RUN.md)

## Features

### Authentication & User Management
- User registration and login
- JWT-based authentication
- Profile management (username, theme, language)
- Secure password hashing with bcryptjs

### Chat Functionality
- Real-time AI-powered conversations using OpenAI API
- Multiple conversation support
- Conversation archiving and management
- Message editing and rating system
- Conversation sharing with unique tokens
- Export conversations as JSON

### File & Media Handling
- Document upload (PDF, DOCX, TXT)
- Image upload and sharing
- File preview and download
- Integrated document and image analysis

### Voice Features
- Voice message recording
- Audio upload support
- Speech-to-text (ready for Whisper API integration)
- Text-to-speech synthesis (ready for implementation)

### Advanced Features
- Dark/Light theme support
- Multiple language support
- Markdown message rendering
- Syntax highlighting for code blocks
- Responsive design (mobile, tablet, desktop)
- Message copy-to-clipboard
- Loading indicators and error handling

## Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **React Icons** - Icon library
- **React Syntax Highlighter** - Code syntax highlighting

### Backend
- **Node.js/Express** - Server framework
- **MongoDB/Mongoose** - Database
- **OpenAI API** - AI responses
- **Multer** - File upload handling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OpenAI API key

### Setup Steps

1. **Clone and Install Dependencies**
   \\\ash
   npm install
   npm run install-all
   \\\

2. **Configure Environment**
   - Copy \.env.example\ to \.env\
   - Update with your credentials:
     \\\
     MONGODB_URI=your_mongodb_uri
     OPENAI_API_KEY=your_openai_key
     JWT_SECRET=your_secret_key
     FRONTEND_URL=http://localhost:3000
     \\\

3. **Start MongoDB**
   \\\ash
   mongod
   \\\

4. **Run Development Servers**

   Terminal 1 (Backend):
   \\\ash
   npm run dev
   \\\
   Server runs on \http://localhost:5000\

   Terminal 2 (Frontend):
   \\\ash
   npm run client
   \\\
   App runs on \http://localhost:3000\

## API Endpoints

### Authentication
- \POST /api/auth/register\ - Create new account
- \POST /api/auth/login\ - User login
- \GET /api/auth/me\ - Get current user
- \PUT /api/auth/profile\ - Update user profile

### Chat
- \POST /api/chat/message\ - Send message and get AI response
- \GET /api/chat/messages/:conversationId\ - Get conversation messages
- \PUT /api/chat/message/:messageId\ - Edit message
- \POST /api/chat/message/:messageId/rate\ - Rate message
- \DELETE /api/chat/message/:messageId\ - Delete message

### Conversations
- \POST /api/conversations\ - Create conversation
- \GET /api/conversations\ - List user conversations
- \GET /api/conversations/:conversationId\ - Get conversation details
- \PUT /api/conversations/:conversationId\ - Update conversation
- \DELETE /api/conversations/:conversationId\ - Delete conversation
- \POST /api/conversations/:conversationId/archive\ - Archive conversation
- \POST /api/conversations/:conversationId/share\ - Share conversation
- \GET /api/conversations/public/:shareToken\ - Get shared conversation
- \GET /api/conversations/:conversationId/export/json\ - Export as JSON

### Files
- \POST /api/files/upload\ - Upload file
- \GET /api/files\ - List user files
- \GET /api/files/conversation/:conversationId\ - Get conversation files
- \DELETE /api/files/:fileId\ - Delete file
- \GET /api/files/download/:fileId\ - Download file

### Voice
- \POST /api/voice/start-recording\ - Start voice recording
- \POST /api/voice/send-message\ - Send voice message
- \POST /api/voice/synthesize\ - Text-to-speech

## Usage

### Creating a Chat
1. Click "New Chat" in the sidebar
2. Start typing your message
3. Press Enter or click the send button
4. AI responds with helpful information

### Sharing Conversations
1. Click the options menu (three dots)
2. Select "Share"
3. Copy the share link
4. Share with others

### Uploading Files
1. Click the attachment icon
2. Select image or document
3. File appears in preview area
4. Send message with attachment

### Voice Chat
1. Click the microphone icon
2. Allow microphone access
3. Speak your message
4. Click again to stop recording
5. Message is sent

## Configuration

### AI Model Settings
Edit in conversation settings:
- **Model**: gpt-3.5-turbo, gpt-4, gpt-4-turbo
- **Temperature**: 0-2 (creativity level)
- **Max Tokens**: Adjust response length

### Theme & Language
Access in Profile Settings:
- **Theme**: Light or Dark mode
- **Language**: English, Spanish, French, German

## Environment Variables

\\\
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-chatbot
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
OPENAI_API_KEY=your_openai_api_key
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
ALLOWED_EXTENSIONS=jpg,jpeg,png,pdf,doc,docx,txt
FRONTEND_URL=http://localhost:3000
\\\

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify credentials if using Atlas

### OpenAI API Errors
- Verify API key is correct
- Check account balance
- Monitor rate limits

### CORS Errors
- Verify FRONTEND_URL matches client address
- Check backend CORS configuration

### File Upload Issues
- Check file size limits
- Verify upload directory permissions
- Confirm allowed file extensions

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review environment configuration
3. Check browser console for errors
4. Review server logs

---

**Note**: This is a full-featured starter template. For production deployment, implement additional security measures, set up proper logging, and configure your deployment environment accordingly.
