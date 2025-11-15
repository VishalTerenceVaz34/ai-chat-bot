# AI Chat Bot - Complete Setup & Run Guide

This guide will help you set up and run the AI Chat Bot application locally.

## Prerequisites

- **Node.js**: v14 or higher (Download from https://nodejs.org/)
- **npm**: Comes with Node.js
- **OpenAI API Key** (Optional - Demo mode works without it)

## Step 1: Get Your OpenAI API Key (Optional)

To use real AI responses, you need an OpenAI API key:

1. Go to https://platform.openai.com/api/keys
2. Sign up or log in to your OpenAI account
3. Create a new API key
4. Copy the key (you'll need it in Step 3)

**Note**: You can run the app without an API key in demo mode, but you'll get placeholder responses.

## Step 2: Install Dependencies

Open a terminal in the project root directory and run:

```bash
npm install
npm run install-all
```

This will install dependencies for both the backend server and frontend client.

## Step 3: Configure Environment Variables

Edit the `.env` file in the project root:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (using in-memory for now)
DISABLE_DB=true

# JWT (Keep as-is for local development)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# OpenAI (IMPORTANT: Add your API key here)
OPENAI_API_KEY=sk-your_openai_api_key_here

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
ALLOWED_EXTENSIONS=jpg,jpeg,png,pdf,doc,docx,txt

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**If you have an OpenAI API key**, replace `sk-your_openai_api_key_here` with your actual key.

**If you don't have a key**, the app will run in demo mode with sample responses.

## Step 4: Start the Application

### Option A: Run Both Frontend and Backend Together

Open a terminal in the project root and run:

```bash
npm run dev
```

This starts the backend server on `http://localhost:5000`

Then open another terminal and run:

```bash
npm run client
```

This starts the React app on `http://localhost:3000`

### Option B: Run Backend and Frontend Separately

**Terminal 1 - Backend Server:**
```bash
cd server
npm install  # If not already installed
npm start
# Or for development with auto-reload:
npm run dev
```

Server will run on: `http://localhost:5000`

**Terminal 2 - Frontend Client:**
```bash
cd client
npm install  # If not already installed
npm start
```

Client will run on: `http://localhost:3000`

## Step 5: Access the Application

1. Open your browser and go to `http://localhost:3000`
2. You'll see the login page
3. Click "Sign up" to create a new account
4. Fill in your details:
   - **Username**: Pick any username
   - **Email**: any@email.com (doesn't need to be real for local testing)
   - **Password**: any password
5. Click "Sign Up"
6. You'll be logged in and see the chat interface
7. Type a message and press Enter or click Send
8. The bot will respond!

## Troubleshooting

### Port Already in Use

If port 5000 is already in use, change it in `.env`:
```
PORT=5001
```

### Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run install-all
```

### "Cannot find module 'openai'"

```bash
cd server
npm install openai@^4.24.0
```

### Frontend Won't Load

Make sure the backend is running first, then:
```bash
cd client
npm install
npm start
```

### Bot Responses are Demo Mode

If you see "[Demo Mode]" responses, it means:
1. Your OpenAI API key isn't set in `.env`
2. The API key is incorrect
3. The API key has insufficient credits

To fix:
1. Get a valid API key from https://platform.openai.com/api/keys
2. Add it to `.env`: `OPENAI_API_KEY=sk-...`
3. Restart the backend server

### "CORS Error" or "Network Error"

Make sure:
1. Backend is running on `http://localhost:5000`
2. Frontend is running on `http://localhost:3000`
3. Check `.env` has `FRONTEND_URL=http://localhost:3000`

## Features to Test

Once the app is running:

1. **Chat**: Type a message and get a response from the AI
2. **New Conversation**: Click "New Chat" button to start a new conversation
3. **Conversation List**: See all your conversations in the sidebar
4. **Profile**: Click the settings icon to update your profile
5. **Logout**: Click the logout button to sign out

## File Structure

```
ai-chat-bot/
├── server/              # Backend (Express.js)
│   ├── routes/         # API endpoints
│   ├── models/         # Data models
│   ├── middleware/     # Auth, file upload
│   ├── utils/          # OpenAI, helpers
│   ├── index.js        # Main server file
│   └── mockDb.js       # In-memory database
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── pages/      # Login, Chat, Profile
│   │   ├── components/ # ChatWindow, Sidebar
│   │   ├── stores/     # Zustand state management
│   │   ├── api/        # Axios configuration
│   │   └── styles/     # CSS files
│   └── package.json
├── .env                # Environment variables
└── package.json        # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Chat
- `POST /api/chat/message` - Send message & get AI response
- `GET /api/chat/messages/:conversationId` - Get conversation messages

### Conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations` - List conversations
- `GET /api/conversations/:conversationId` - Get conversation details
- `PUT /api/conversations/:conversationId` - Update conversation
- `DELETE /api/conversations/:conversationId` - Delete conversation
- `POST /api/conversations/:conversationId/archive` - Archive conversation

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files` - List user files
- `DELETE /api/files/:fileId` - Delete file

## Development Mode

For development with hot reload:

```bash
# Backend with nodemon
npm run dev

# Frontend with React Scripts
npm run client
```

## Production Build

To build for production:

```bash
npm run build
```

This creates an optimized build in `client/build/`.

## Next Steps

1. Deploy to a hosting service (Vercel, Heroku, etc.)
2. Set up a real MongoDB database
3. Add more AI models or custom AI integrations
4. Implement voice features with Whisper API
5. Add user authentication with real email verification

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the console logs in your browser (F12)
3. Check terminal output for backend errors
4. Ensure all prerequisites are installed

Happy chatting! 🚀
