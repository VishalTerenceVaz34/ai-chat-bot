# Complete File Structure & Reference

## Full Project Tree

```
ai-chatbot/
│
├── 📄 package.json                        # Root npm dependencies
├── 📄 .env.example                        # Environment variables template
├── 📄 README.md                           # Main documentation
├── 📄 QUICKSTART.md                       # Quick setup guide
├── 📄 SETUP_GUIDE.md                      # Detailed setup instructions
├── 📄 FEATURES.md                         # Feature list & roadmap
├── 📄 PROJECT_SUMMARY.md                  # This file - project overview
├── 📄 setup.sh                            # Setup script (macOS/Linux)
├── 📄 setup.bat                           # Setup script (Windows)
│
├── 📂 server/                             # Backend - Node.js/Express
│   │
│   ├── 📄 index.js                        # Main server entry point
│   │   └─ Port: 5000
│   │   └─ Features: CORS, Helmet, Compression
│   │
│   ├── 📂 models/                         # Database schemas
│   │   ├── 📄 User.js                     # User schema
│   │   │   └─ Fields: username, email, password, theme, language
│   │   ├── 📄 Conversation.js             # Conversation schema
│   │   │   └─ Fields: userId, title, model, temperature, messages
│   │   ├── 📄 Message.js                  # Message schema
│   │   │   └─ Fields: content, role, type, attachments, rating
│   │   └── 📄 File.js                     # File schema
│   │       └─ Fields: filename, mimetype, size, fileType, path
│   │
│   ├── 📂 routes/                         # API route handlers
│   │   ├── 📄 auth.js                     # Authentication endpoints
│   │   │   ├─ POST /register
│   │   │   ├─ POST /login
│   │   │   ├─ GET /me
│   │   │   └─ PUT /profile
│   │   │
│   │   ├── 📄 chat.js                     # Chat endpoints
│   │   │   ├─ POST /message
│   │   │   ├─ GET /messages/:conversationId
│   │   │   ├─ PUT /message/:messageId
│   │   │   ├─ POST /message/:messageId/rate
│   │   │   └─ DELETE /message/:messageId
│   │   │
│   │   ├── 📄 conversations.js            # Conversation endpoints
│   │   │   ├─ POST / (create)
│   │   │   ├─ GET / (list)
│   │   │   ├─ GET /:conversationId
│   │   │   ├─ PUT /:conversationId
│   │   │   ├─ DELETE /:conversationId
│   │   │   ├─ POST /:conversationId/archive
│   │   │   ├─ POST /:conversationId/restore
│   │   │   ├─ POST /:conversationId/share
│   │   │   ├─ GET /public/:shareToken
│   │   │   └─ GET /:conversationId/export/json
│   │   │
│   │   ├── 📄 files.js                    # File handling endpoints
│   │   │   ├─ POST /upload
│   │   │   ├─ GET / (list)
│   │   │   ├─ GET /conversation/:conversationId
│   │   │   ├─ DELETE /:fileId
│   │   │   └─ GET /download/:fileId
│   │   │
│   │   └── 📄 voice.js                    # Voice endpoints
│   │       ├─ POST /start-recording
│   │       ├─ POST /send-message
│   │       └─ POST /synthesize
│   │
│   ├── 📂 middleware/                     # Express middleware
│   │   ├── 📄 auth.js                     # JWT authentication
│   │   │   └─ Checks Authorization header
│   │   └── 📄 upload.js                   # File upload handler
│   │       └─ Uses multer for file storage
│   │
│   └── 📂 utils/                          # Utility functions
│       ├── 📄 openai.js                   # OpenAI API integration
│       │   ├─ generateChatCompletion()
│       │   ├─ generateImage()
│       │   └─ transcribeAudio()
│       └── 📄 helpers.js                  # Helper functions
│           ├─ generateShareToken()
│           ├─ formatDate()
│           └─ getFileType()
│
└── 📂 client/                             # Frontend - React
    │
    ├── 📄 package.json                    # Frontend dependencies
    ├── 📄 tsconfig.json                   # TypeScript configuration
    │
    ├── 📂 public/                         # Static files
    │   └── 📄 index.html                  # HTML entry point
    │
    └── 📂 src/                            # React source code
        │
        ├── 📄 App.js                      # Main App component
        │   └─ Routes all pages with React Router
        │
        ├── 📄 index.js                    # React entry point
        │   └─ Renders App to #root
        │
        ├── 📄 index.css                   # Global styles
        │   ├─ CSS variables (--primary, --bg-light, etc.)
        │   ├─ Button styles
        │   ├─ Input styles
        │   └─ Animation keyframes
        │
        ├── 📂 pages/                      # Page components
        │   ├── 📄 LoginPage.js
        │   │   ├─ Email input
        │   │   ├─ Password input
        │   │   ├─ Login functionality
        │   │   └─ Link to register
        │   │
        │   ├── 📄 RegisterPage.js
        │   │   ├─ Username input
        │   │   ├─ Email input
        │   │   ├─ Password inputs
        │   │   ├─ Registration functionality
        │   │   └─ Link to login
        │   │
        │   ├── 📄 ChatPage.js
        │   │   ├─ Sidebar component
        │   │   ├─ ChatWindow component
        │   │   ├─ Loads conversations
        │   │   └─ Main application page
        │   │
        │   ├── 📄 ProfilePage.js
        │   │   ├─ Username update
        │   │   ├─ Theme selector
        │   │   ├─ Language selector
        │   │   ├─ Logout button
        │   │   └─ Settings page
        │   │
        │   └── 📄 SharedConversationPage.js
        │       ├─ Displays shared conversation
        │       ├─ Uses shareToken from URL
        │       └─ Read-only view
        │
        ├── 📂 components/                 # Reusable components
        │   ├── 📄 ChatWindow.js
        │   │   ├─ Message list
        │   │   ├─ Message input
        │   │   ├─ File upload
        │   │   ├─ Voice recording
        │   │   └─ Send button
        │   │
        │   ├── 📄 Sidebar.js
        │   │   ├─ Conversation list
        │   │   ├─ New chat button
        │   │   ├─ User info
        │   │   ├─ Profile link
        │   │   └─ Logout button
        │   │
        │   ├── 📄 Message.js
        │   │   ├─ Message content rendering
        │   │   ├─ Markdown support
        │   │   ├─ Code highlighting
        │   │   ├─ Copy button
        │   │   └─ Message actions
        │   │
        │   ├── 📄 ChatOptions.js
        │   │   ├─ Share option
        │   │   ├─ Export option
        │   │   ├─ Archive option
        │   │   ├─ Delete option
        │   │   └─ Options menu
        │   │
        │   └── 📄 PrivateRoute.js
        │       └─ Route guard for authenticated pages
        │
        ├── 📂 stores/                     # Zustand state management
        │   ├── 📄 authStore.js
        │   │   ├─ user state
        │   │   ├─ token state
        │   │   ├─ isAuthenticated state
        │   │   ├─ register()
        │   │   ├─ login()
        │   │   ├─ logout()
        │   │   ├─ checkAuth()
        │   │   └─ updateProfile()
        │   │
        │   └── 📄 chatStore.js
        │       ├─ conversations state
        │       ├─ currentConversation state
        │       ├─ messages state
        │       ├─ loadConversations()
        │       ├─ createConversation()
        │       ├─ sendMessage()
        │       ├─ deleteConversation()
        │       ├─ archiveConversation()
        │       ├─ shareConversation()
        │       └─ exportConversation()
        │
        ├── 📂 api/                       # API client
        │   └── 📄 axios.js
        │       ├─ Base URL configuration
        │       ├─ Request interceptors (add token)
        │       ├─ Response interceptors (error handling)
        │       └─ Auto-redirect on 401
        │
        ├── 📂 hooks/                     # Custom React hooks
        │   └── 📄 useChat.js
        │       ├─ useVoiceChat()
        │       ├─ useAIResponse()
        │       └─ useFileUpload()
        │
        └── 📂 styles/                    # Component-specific styles
            ├── 📄 Auth.css               # Login/Register pages
            │   ├─ .auth-container
            │   ├─ .auth-box
            │   ├─ .error-message
            │   └─ .auth-link
            │
            ├── 📄 ChatPage.css           # Main chat interface
            │   ├─ .chat-page
            │   ├─ .chat-window
            │   ├─ .messages-container
            │   ├─ .chat-input-area
            │   ├─ .attachments-preview
            │   └─ .typing-indicator
            │
            ├── 📄 Sidebar.css            # Conversation sidebar
            │   ├─ .sidebar
            │   ├─ .conversation-item
            │   ├─ .new-chat-btn
            │   ├─ .user-info
            │   ├─ .logout-btn
            │   └─ .profile-link
            │
            ├── 📄 Message.css            # Message styling
            │   ├─ .message
            │   ├─ .message-content
            │   ├─ .message-actions
            │   ├─ .action-btn
            │   └─ Markdown overrides
            │
            ├── 📄 ProfilePage.css        # Settings page
            │   ├─ .profile-container
            │   ├─ .profile-box
            │   ├─ .button-group
            │   └─ .logout-section
            │
            └── 📄 ChatOptions.css        # Options menu
                ├─ .chat-options-menu
                ├─ .options-dropdown
                ├─ .option-item
                └─ .share-modal
```

---

## File Dependencies & Flow

### Authentication Flow
```
LoginPage.js
  ↓ useAuthStore.login()
  ↓ POST /api/auth/login
  ↓ server/routes/auth.js
  ↓ models/User.js
  ↓ Token stored in localStorage
  ↓ Redirect to ChatPage
```

### Chat Flow
```
ChatWindow.js
  ↓ useChatStore.sendMessage()
  ↓ POST /api/chat/message
  ↓ server/routes/chat.js
  ↓ utils/openai.js (generateChatCompletion)
  ↓ OpenAI API
  ↓ Response returned
  ↓ Message displayed
```

### File Upload Flow
```
ChatWindow.js (file input)
  ↓ FormData with file
  ↓ POST /api/files/upload
  ↓ server/middleware/upload.js (multer)
  ↓ File saved to /uploads
  ↓ models/File.js saved
  ↓ File preview shown
```

---

## Configuration Files

### .env Variables
```
PORT                    Server port (default: 5000)
NODE_ENV               development/production
MONGODB_URI            MongoDB connection string
JWT_SECRET             Secret for token signing
JWT_EXPIRE             Token expiration time
OPENAI_API_KEY         OpenAI API key
MAX_FILE_SIZE          Max file upload size
UPLOAD_DIR             Directory for uploads
ALLOWED_EXTENSIONS     Allowed file types
FRONTEND_URL           Frontend URL for CORS
```

### package.json Scripts
```
npm start              Start production server
npm run dev            Start development server (nodemon)
npm run client         Start React dev server
npm run build          Build React for production
npm run install-all    Install both front & backend dependencies
```

---

## Key Routes Summary

### Auth Routes (`/api/auth`)
- `POST /register` → Create user
- `POST /login` → Authenticate user
- `GET /me` → Get current user
- `PUT /profile` → Update user

### Chat Routes (`/api/chat`)
- `POST /message` → Send/receive message
- `GET /messages/:id` → Load messages
- `PUT /message/:id` → Edit message
- `POST /message/:id/rate` → Rate message
- `DELETE /message/:id` → Delete message

### Conversation Routes (`/api/conversations`)
- `POST /` → Create conversation
- `GET /` → List conversations
- `GET /:id` → Get conversation
- `PUT /:id` → Update conversation
- `DELETE /:id` → Delete conversation
- `POST /:id/archive` → Archive
- `POST /:id/share` → Get share link
- `GET /public/:token` → View shared
- `GET /:id/export/json` → Export

### File Routes (`/api/files`)
- `POST /upload` → Upload file
- `GET /` → List files
- `DELETE /:id` → Delete file
- `GET /download/:id` → Download file

### Voice Routes (`/api/voice`)
- `POST /start-recording` → Start voice
- `POST /send-message` → Send voice message
- `POST /synthesize` → Text-to-speech

---

## Component Hierarchy

```
App.js (Router)
├── LoginPage
├── RegisterPage
├── ChatPage
│   ├── Sidebar
│   │   ├── UserInfo
│   │   ├── ConversationList
│   │   └── ProfileButton
│   └── ChatWindow
│       ├── ChatHeader
│       ├── MessageList
│       │   └── Message (multiple)
│       │       ├── MessageContent
│       │       └── MessageActions
│       └── ChatInput
│           ├── FileUpload
│           ├── TextInput
│           ├── VoiceButton
│           └── SendButton
├── ProfilePage
└── SharedConversationPage
```

---

## State Management Flow

```
authStore (Zustand)
├── user
├── token
├── isAuthenticated
└── Actions: login, logout, register, etc.

chatStore (Zustand)
├── conversations
├── currentConversation
├── messages
└── Actions: sendMessage, createConversation, etc.
```

---

## API Response Examples

### Chat Message Response
```json
{
  "userMessage": {
    "id": "123",
    "content": "Hello AI",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "aiMessage": {
    "id": "124",
    "content": "Hello! How can I help?",
    "role": "assistant",
    "createdAt": "2024-01-01T00:00:01Z"
  }
}
```

### Conversation Response
```json
{
  "_id": "conv123",
  "title": "My Chat",
  "userId": "user123",
  "messages": ["msg1", "msg2"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

## Environment Setup Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or Atlas account
- [ ] OpenAI API key obtained
- [ ] `.env` file created from `.env.example`
- [ ] All variables in `.env` filled in
- [ ] MongoDB running (`mongod` command)
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed

---

## Quick Commands Reference

```bash
# Setup
npm install                    # Install root dependencies
npm run install-all           # Install all dependencies
cp .env.example .env         # Create .env

# Development
npm run dev                   # Start backend
npm run client               # Start frontend
mongod                       # Start MongoDB

# Build
npm run build                # Build frontend for production

# Testing
curl http://localhost:5000/api/health  # Test backend
```

---

This complete file structure gives you a production-ready, fully-documented AI chatbot application ready to customize and deploy!

**All files are created and ready to use. See QUICKSTART.md to get started!** 🚀
