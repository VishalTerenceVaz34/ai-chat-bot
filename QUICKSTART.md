# 🚀 AI Chat Bot - Quick Start Guide

## 📋 What You've Got

A **production-ready full-stack AI chatbot** with all the features you requested:

✅ **Sign-in/Authentication** - Register, login, profile management
✅ **Chat Interface** - Real-time AI conversations with OpenAI
✅ **Document/Image Sharing** - Upload and share files in chat
✅ **Voice Chat** - Record voice messages, voice synthesis ready
✅ **Advanced Features** - Export, share, archive, dark mode, and more

---

## ⚡ 30-Second Setup (Windows)

1. **Navigate to project folder:**
   ```cmd
   cd c:\Users\Public\projects\ai chat bot
   ```

2. **Run setup:**
   ```cmd
   setup.bat
   ```

3. **Edit `.env` with your credentials:**
   - OPENAI_API_KEY: [Get from https://platform.openai.com/api-keys]
   - MONGODB_URI: [MongoDB connection string]
   - JWT_SECRET: [Any long random string]

4. **Start MongoDB** (in one terminal):
   ```cmd
   mongod
   ```

5. **Start Backend** (in another terminal):
   ```cmd
   npm run dev
   ```

6. **Start Frontend** (in another terminal):
   ```cmd
   npm run client
   ```

7. **Open browser:**
   ```
   http://localhost:3000
   ```

---

## 📦 Project Structure

```
ai-chatbot/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # UI Components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   ├── styles/         # CSS files
│   │   └── api/            # API client
│   └── package.json
│
├── server/                  # Express Backend
│   ├── routes/             # API endpoints
│   ├── models/             # Database schemas
│   ├── middleware/         # Auth, upload, etc.
│   ├── utils/              # Helper functions
│   ├── index.js            # Main server
│   └── .env                # Configuration
│
├── README.md               # Full documentation
├── SETUP_GUIDE.md          # Installation guide
├── FEATURES.md             # Complete feature list
└── package.json            # Root dependencies
```

---

## 🎯 Key Features

### 1. **Authentication**
- User registration & login
- JWT token management
- Secure password hashing
- Profile customization

### 2. **Chat**
- Real-time AI conversations
- Message editing & deletion
- Message rating system
- Markdown rendering with code highlighting

### 3. **Files & Media**
- Image upload support
- Document upload (PDF, DOCX, TXT)
- File preview in chat
- Download uploaded files

### 4. **Voice**
- Record voice messages
- Voice message upload
- Text-to-speech ready
- Microphone access management

### 5. **Sharing & Collaboration**
- Share conversations with unique links
- Export conversations as JSON
- Archive conversations
- View shared conversations

### 6. **UI/UX**
- Dark/Light theme toggle
- Responsive mobile design
- Smooth animations
- Intuitive interface

---

## 🔐 Environment Setup

Create `.env` file with these variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-chatbot

# Authentication
JWT_SECRET=your_secret_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# AI (Required!)
OPENAI_API_KEY=sk-your_api_key_from_openai

# Files
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
ALLOWED_EXTENSIONS=jpg,jpeg,png,pdf,doc,docx,txt

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

## 🔑 Getting API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create new API key
4. Add credits to your account
5. Copy key to `.env`

### MongoDB
- **Local:** Install from https://www.mongodb.com/try/download/community
- **Cloud:** Create free account at https://www.mongodb.com/cloud/atlas

---

## 🧪 Testing the App

### 1. Register a New Account
- Click "Sign Up"
- Enter email, username, password
- Click "Create Account"

### 2. Create First Conversation
- Click "New Chat" button
- Start typing your message
- Click send or press Enter

### 3. Test File Upload
- Click attachment icon (📎)
- Select an image or document
- File appears as attachment
- Send message

### 4. Test Voice
- Click microphone icon (🎤)
- Allow microphone access
- Speak your message
- Click again to stop
- Message is transcribed and sent

### 5. Share Conversation
- Click options menu (⋯)
- Select "Share"
- Copy the link
- Share with anyone

---

## 🛠️ Common Commands

```bash
# Start everything
npm run dev              # Backend only
npm run client          # Frontend only
npm run install-all     # Install all dependencies
npm run build           # Build frontend for production

# MongoDB
mongod                  # Start MongoDB (Windows)
mongo                   # Connect to MongoDB
```

---

## ⚠️ Troubleshooting

### "Cannot find module" error
```bash
npm install
npm run install-all
```

### MongoDB connection failed
- Ensure `mongod` is running
- Check MONGODB_URI in .env
- Try local: `mongodb://localhost:27017/ai-chatbot`

### OpenAI API error
- Verify API key is correct
- Check account has credits
- Ensure you're using valid model name

### Port already in use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS error
- Verify FRONTEND_URL in .env
- Check backend is running
- Verify both ports (3000, 5000)

---

## 📚 API Endpoints (Quick Reference)

**Auth:**
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

**Chat:**
- `POST /api/chat/message` - Send message
- `GET /api/chat/messages/:id` - Get messages

**Conversations:**
- `POST /api/conversations` - Create new
- `GET /api/conversations` - List all
- `POST /api/conversations/:id/share` - Share

**Files:**
- `POST /api/files/upload` - Upload file
- `GET /api/files` - List files
- `DELETE /api/files/:id` - Delete file

---

## 🚀 Production Deployment

### Before deploying:
1. Change JWT_SECRET to a strong value
2. Set NODE_ENV=production
3. Use MongoDB Atlas for database
4. Use environment variables for sensitive data
5. Enable HTTPS

### Deploy to Heroku:
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

---

## 📖 Full Documentation

- **README.md** - Complete project documentation
- **SETUP_GUIDE.md** - Detailed installation instructions
- **FEATURES.md** - All features and enhancement ideas

---

## 💡 Next Steps

1. ✅ Setup the project (follow 30-second guide above)
2. ✅ Get OpenAI API key
3. ✅ Configure .env file
4. ✅ Start development servers
5. ✅ Test all features
6. 🚀 Deploy to production

---

## 🎓 Learn More

- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [OpenAI API Guide](https://platform.openai.com/docs/)
- [Express.js Guide](https://expressjs.com/)

---

## ❓ Need Help?

1. Check SETUP_GUIDE.md for detailed troubleshooting
2. Review FEATURES.md for feature list
3. Check console for error messages
4. Look at server logs for API issues
5. Verify all environment variables are set

---

**You're all set! Happy coding! 🎉**

*For comprehensive documentation, see README.md*
