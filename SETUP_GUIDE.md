# Installation & Setup Guide

## Quick Start (Windows)

1. **Run the setup script:**
   ```cmd
   setup.bat
   ```

2. **Configure your environment:**
   - Edit `.env` file with:
     - MongoDB connection string
     - OpenAI API key
     - JWT secret

3. **Start MongoDB:**
   ```cmd
   mongod
   ```

4. **Start the backend (Terminal 1):**
   ```cmd
   npm run dev
   ```

5. **Start the frontend (Terminal 2):**
   ```cmd
   npm run client
   ```

6. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Quick Start (macOS/Linux)

1. **Run the setup script:**
   ```bash
   bash setup.sh
   ```

2. **Configure your environment:**
   - Edit `.env` file with your credentials

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Start the backend:**
   ```bash
   npm run dev
   ```

5. **Start the frontend:**
   ```bash
   npm run client
   ```

## Prerequisites

### System Requirements
- Node.js 14+ ([Download](https://nodejs.org/))
- MongoDB 4.4+ ([Download](https://www.mongodb.com/try/download/community))
- npm or yarn

### API Keys Required
- **OpenAI API Key** - Get from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
  - Sign up for OpenAI account
  - Create API key
  - Add credits to your account

### MongoDB Setup Options

**Option 1: Local MongoDB**
```bash
# Windows
mongod

# macOS (via Homebrew)
brew services start mongodb-community

# Linux (Ubuntu)
sudo systemctl start mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

## Environment Variables

Create `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-chatbot

# Authentication
JWT_SECRET=your_very_secret_key_here_change_in_production
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-your_actual_key_here

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
ALLOWED_EXTENSIONS=jpg,jpeg,png,pdf,doc,docx,txt

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Installation Steps

### 1. Clone/Download Project
```bash
cd your-project-path
```

### 2. Install Dependencies
```bash
npm install
npm run install-all
```

### 3. Setup Environment
```bash
cp .env.example .env
# Edit .env with your actual values
```

### 4. Start MongoDB
```bash
mongod
```

### 5. Start Backend
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### 6. Start Frontend (New Terminal)
```bash
npm run client
```
Frontend will run on `http://localhost:3000`

## Verification

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Ensure MongoDB is running (`mongod` command)
- Check MONGODB_URI in .env
- Try: `mongo` to test connection

### Issue: OpenAI API Error
**Solution:**
- Verify API key is correct
- Check account has sufficient credits
- Test API key: https://platform.openai.com/account/api-keys

### Issue: Port Already in Use
**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: Module Not Found
**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run install-all
```

### Issue: Frontend Can't Connect to Backend
**Solution:**
- Check FRONTEND_URL in backend .env
- Verify backend is running on port 5000
- Check CORS settings in server/index.js

## Production Deployment

### Before Deploying
1. Change JWT_SECRET to a strong value
2. Set NODE_ENV=production
3. Use MongoDB Atlas or managed database
4. Enable HTTPS
5. Set secure cookie flags
6. Update FRONTEND_URL and CORS origins

### Deployment Options

**Heroku:**
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

**Vercel (Frontend):**
1. Connect GitHub repo
2. Add env variables
3. Deploy

**AWS/Digital Ocean:**
- Use EC2/Droplet
- Install Node.js and MongoDB
- Use PM2 for process management
- Setup Nginx as reverse proxy

## Development Tips

### Hot Reload
Backend automatically restarts with nodemon
Frontend automatically reloads with React Scripts

### Database Tools
- **MongoDB Compass** - GUI for MongoDB
- **Postman** - API testing

### Debugging
```javascript
// In server code
console.log('Debug:', variable);

// In React code
console.log('Debug:', variable);
console.error('Error:', error);
```

## Performance Optimization

### Backend
- Enable response compression (already configured)
- Use MongoDB indexes
- Implement caching
- Rate limiting for APIs

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Production build: `npm run build`
- CDN for static assets

## Testing

### Manual Testing
1. Register new account
2. Create conversation
3. Send messages
4. Upload files
5. Test voice recording
6. Share conversation

### API Testing with Curl
See "Test Authentication" section above

## Support & Resources

### Documentation
- [Node.js Docs](https://nodejs.org/en/docs/)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [OpenAI Docs](https://platform.openai.com/docs/)
- [React Docs](https://react.dev/)

### Community
- GitHub Issues
- Stack Overflow
- OpenAI Community Forum

---

**Happy coding! 🚀**
