const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateChatCompletion = async (messages, model = 'gpt-3.5-turbo', temperature = 0.7) => {
  try {
    // If no messages provided or API key not set, return a demo response
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
      console.log('OpenAI API key not configured, returning demo response');
      return generateDemoResponse(messages);
    }

    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: 2000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    // Fallback to demo response
    return generateDemoResponse(messages);
  }
};

const generateDemoResponse = (messages) => {
  const lastMessage = messages[messages.length - 1]?.content || '';
  
  const demoResponses = {
    'hello': 'Hi there! I\'m an AI chatbot. Please configure a real OpenAI API key in your .env file to use actual AI responses.',
    'how are you': 'I\'m doing well! Note: This is a demo response. Configure your OpenAI API key to get real AI responses.',
    'what can you do': 'I can help with writing, coding, questions, and more! However, I\'m currently in demo mode. To use real AI responses, please set up your OpenAI API key.',
  };

  const lowerMessage = lastMessage.toLowerCase();
  for (const [key, response] of Object.entries(demoResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return `[Demo Mode] You said: "${lastMessage}"\n\nTo enable real AI responses, please:\n1. Get an OpenAI API key from https://platform.openai.com\n2. Add it to your .env file as OPENAI_API_KEY=sk-...\n3. Restart the server`;
};

const generateImage = async (prompt) => {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    return response.data[0].url;
  } catch (error) {
    console.error('OpenAI image generation error:', error.message);
    throw new Error('Failed to generate image');
  }
};

const transcribeAudio = async (audioBuffer) => {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
      throw new Error('OpenAI API key not configured');
    }
    // This is a placeholder - requires actual audio file handling
    // In production, you'd use Whisper API or a similar service
    return 'Transcribed text would go here';
  } catch (error) {
    console.error('Transcription error:', error.message);
    throw new Error('Failed to transcribe audio');
  }
};

module.exports = {
  openai,
  generateChatCompletion,
  generateImage,
  transcribeAudio
};
