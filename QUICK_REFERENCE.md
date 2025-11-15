# 🎯 Quick Reference Guide

## 🚀 Launch in 3 Steps

### Step 1: Setup
```bash
cd "c:\Users\Public\projects\ai chat bot"
setup.bat
```

### Step 2: Configure
Edit `.env`:
```env
OPENAI_API_KEY=sk-your_key_here
MONGODB_URI=mongodb://localhost:27017/ai-chatbot
JWT_SECRET=random_secret_string
```

### Step 3: Run
```bash
# Terminal 1
mongod

# Terminal 2
npm run dev

# Terminal 3
npm run client

# Open browser
http://localhost:3000
```

---

## 📋 Feature Checklist

| Feature | Status | Location |
|---------|--------|----------|
| **Authentication** | ✅ | `/api/auth` |
| **Chat with AI** | ✅ | `/api/chat` |
| **Conversations** | ✅ | `/api/conversations` |
| **File Upload** | ✅ | `/api/files` |
| **Voice Chat** | ✅ | `/api/voice` |
| **Share Conversations** | ✅ | `/api/conversations/:id/share` |
| **Export Chats** | ✅ | `/api/conversations/:id/export/json` |
| **Dark Mode** | ✅ | Profile Page |
| **Archive** | ✅ | Sidebar |
| **Message Editing** | ✅ | Chat Window |

---

## 🔗 Important URLs & Ports

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend | http://localhost:5000 | 5000 |
| API Health | http://localhost:5000/api/health | 5000 |
| MongoDB | mongodb://localhost:27017 | 27017 |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas | Cloud |

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `server/index.js` | Backend entry point |
| `client/src/App.js` | Frontend entry point |
| `.env` | Configuration |
| `package.json` | Dependencies |
| `server/routes/auth.js` | Authentication |
| `server/routes/chat.js` | Chat logic |
| `client/stores/authStore.js` | Auth state |
| `client/stores/chatStore.js` | Chat state |

---

## 🔐 API Authentication

### How It Works
1. User logs in → Receives JWT token
2. Token stored in localStorage
3. Token added to all API requests
4. Server validates token before processing

### Token Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 🛠️ Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Module not found | `npm install && npm run install-all` |
| MongoDB connection failed | Check `.env` MONGODB_URI & mongod running |
| OpenAI API error | Verify API key has credits |
| Port in use | `netstat -ano \| findstr :5000` |
| CORS error | Check FRONTEND_URL in .env |
| Token invalid | Clear localStorage, login again |

---

## 📚 Documentation Index

| Document | Content |
|----------|---------|
| **README.md** | Full project documentation |
| **QUICKSTART.md** | 30-second setup guide |
| **SETUP_GUIDE.md** | Detailed instructions |
| **FEATURES.md** | Feature list & roadmap |
| **FILE_STRUCTURE.md** | Complete file tree |
| **PROJECT_SUMMARY.md** | Project overview |
| **THIS FILE** | Quick reference |

---

## 🎨 UI Components

### Pages
- **LoginPage** - User authentication
- **RegisterPage** - New user signup
- **ChatPage** - Main chat interface
- **ProfilePage** - User settings
- **SharedConversationPage** - View shared chats

### Components
- **ChatWindow** - Chat interface
- **Sidebar** - Conversation list
- **Message** - Individual message
- **ChatOptions** - Share/export menu

---

## 🗄️ Database Collections

```
MongoDB: ai-chatbot
├── users
│   └── {username, email, password, theme, language}
├── conversations
│   └── {userId, title, model, temperature, messages}
├── messages
│   └── {conversationId, content, role, type, attachments}
└── files
    └── {userId, filename, fileType, path, size}
```

---

## 🔑 Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-...          # OpenAI API key
MONGODB_URI=mongodb://...      # Database URL
JWT_SECRET=random_string       # Token secret

# Optional (have defaults)
PORT=5000
NODE_ENV=development
JWT_EXPIRE=7d
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,pdf,doc,docx,txt
FRONTEND_URL=http://localhost:3000
```

---

## 📊 API Endpoints Quick Reference

### Users
```
POST   /api/auth/register       # Register
POST   /api/auth/login          # Login
GET    /api/auth/me             # Get user
PUT    /api/auth/profile        # Update profile
```

### Messages
```
POST   /api/chat/message                   # Send message
GET    /api/chat/messages/:conversationId  # Get messages
PUT    /api/chat/message/:messageId        # Edit message
POST   /api/chat/message/:messageId/rate   # Rate message
DELETE /api/chat/message/:messageId        # Delete message
```

### Conversations
```
POST   /api/conversations                    # Create
GET    /api/conversations                    # List
GET    /api/conversations/:conversationId    # Get details
PUT    /api/conversations/:conversationId    # Update
DELETE /api/conversations/:conversationId    # Delete
POST   /api/conversations/:conversationId/archive    # Archive
POST   /api/conversations/:conversationId/share      # Share
GET    /api/conversations/public/:shareToken        # View shared
GET    /api/conversations/:conversationId/export/json  # Export
```

### Files
```
POST   /api/files/upload                           # Upload
GET    /api/files                                  # List
DELETE /api/files/:fileId                          # Delete
GET    /api/files/download/:fileId                 # Download
GET    /api/files/conversation/:conversationId     # List for conversation
```

### Voice
```
POST   /api/voice/start-recording   # Start recording
POST   /api/voice/send-message      # Send voice
POST   /api/voice/synthesize        # TTS
```

---

## 🎯 User Flow

### First Time User
```
Landing Page
  ↓
Click "Sign Up"
  ↓
Enter details → RegisterPage
  ↓
Submit → Create account
  ↓
Auto-login → Redirect to ChatPage
  ↓
Create first conversation
  ↓
Start chatting!
```

### Existing User
```
Landing Page
  ↓
Click "Sign In"
  ↓
Enter credentials → LoginPage
  ↓
Submit → Authenticate
  ↓
Redirect to ChatPage
  ↓
See conversation history
  ↓
Continue chatting!
```

---

## 🚀 Deployment Checklist

- [ ] Change JWT_SECRET to strong value
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (not local)
- [ ] Setup HTTPS certificate
- [ ] Configure CORS origins
- [ ] Add rate limiting
- [ ] Setup error logging
- [ ] Backup database
- [ ] Test all features
- [ ] Monitor performance

---

## 💡 Pro Tips

1. **Development Speed**
   - Use `npm run dev` with nodemon for hot reload
   - React Fast Refresh auto-reloads components
   - Check console for real-time errors

2. **Debugging**
   - Use browser DevTools (F12) for frontend
   - Check server logs for backend errors
   - Use MongoDB Compass to inspect database

3. **Security**
   - Keep .env file private (never commit)
   - Use strong JWT_SECRET
   - Validate all inputs
   - Use HTTPS in production

4. **Performance**
   - Monitor API response times
   - Check file upload sizes
   - Optimize database queries
   - Use message pagination

---

## 📞 Getting Help

1. **Check Documentation**
   - README.md - Comprehensive guide
   - SETUP_GUIDE.md - Installation help
   - FILE_STRUCTURE.md - File organization

2. **Check Errors**
   - Browser console (F12)
   - Terminal output
   - Server logs

3. **Verify Setup**
   - Backend running on :5000?
   - Frontend running on :3000?
   - MongoDB running?
   - .env configured?

4. **External Resources**
   - React: https://react.dev/
   - Node.js: https://nodejs.org/docs/
   - MongoDB: https://docs.mongodb.com/
   - OpenAI: https://platform.openai.com/docs/

---

## ✅ Installation Verification

Run these commands to verify setup:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check MongoDB
mongo --version

# Start backend
npm run dev
# Should show: "Server running on port 5000"

# Start frontend (new terminal)
npm run client
# Should show: "Compiled successfully!"
# Browser opens to localhost:3000
```

---

## 🎉 You're Ready!

Everything is installed and configured. Now:

1. ✅ Follow QUICKSTART.md for immediate setup
2. ✅ Test all features
3. ✅ Customize the UI as needed
4. ✅ Deploy to production
5. ✅ Invite users

**Happy coding!** 🚀

---

**Quick Links:**
- [QUICKSTART.md](QUICKSTART.md) - Fast setup
- [README.md](README.md) - Full docs
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed help
- [FEATURES.md](FEATURES.md) - Feature list
