#!/usr/bin/env node

/**
 * ORA Platform - OpenAI Assistant Content Upload Script
 * Uploads extracted learning content to OpenAI Assistant for enhanced AI responses
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.VITE_OPENAI_ASSISTANT_ID;
const CONTENT_FILE = path.join(__dirname, 'ora-learning-content.md');

async function uploadContentToAssistant() {
  try {
    console.log('🚀 Starting content upload to OpenAI Assistant...');
    console.log(`Assistant ID: ${ASSISTANT_ID}`);
    console.log(`Content file: ${CONTENT_FILE}`);

    // Check if content file exists
    if (!fs.existsSync(CONTENT_FILE)) {
      throw new Error(`Content file not found: ${CONTENT_FILE}`);
    }

    // Read the content
    const content = fs.readFileSync(CONTENT_FILE, 'utf8');
    console.log(`📄 Content loaded (${content.length} characters)`);

    // Upload file to OpenAI
    console.log('📤 Uploading content to OpenAI...');
    const file = await openai.files.create({
      file: fs.createReadStream(CONTENT_FILE),
      purpose: 'assistants',
    });

    console.log(`✅ File uploaded successfully! File ID: ${file.id}`);

    // Attach file to assistant
    console.log('🔗 Attaching file to assistant...');
    const assistant = await openai.beta.assistants.update(ASSISTANT_ID, {
      file_ids: [file.id],
    });

    console.log('✅ Content successfully attached to assistant!');
    console.log(`📚 Assistant now has access to ${content.split('\n').filter(line => line.startsWith('###')).length} learning modules`);
    console.log(`📖 Content includes: AI governance, workforce readiness, and organizational learning`);

    // Test the assistant with a sample question
    console.log('\n🧪 Testing assistant with sample question...');
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "What are the main learning modules available in the ORA Platform?"
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    let attempts = 0;
    while (runStatus.status !== "completed" && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      attempts++;
    }

    if (runStatus.status === "completed") {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const response = messages.data[0].content[0].text.value;
      console.log('🤖 Assistant response:');
      console.log(response.substring(0, 200) + (response.length > 200 ? '...' : ''));
    }

    console.log('\n🎉 Setup complete! Your AI agent can now answer questions about ORA learning content.');

  } catch (error) {
    console.error('❌ Error uploading content:', error.message);
    process.exit(1);
  }
}

async function main() {
  // Check environment variables
  if (!process.env.VITE_OPENAI_API_KEY) {
    console.error('❌ VITE_OPENAI_API_KEY environment variable not found');
    console.log('Please ensure your .env.local file contains the OpenAI API key');
    process.exit(1);
  }

  if (!process.env.VITE_OPENAI_ASSISTANT_ID) {
    console.error('❌ VITE_OPENAI_ASSISTANT_ID environment variable not found');
    console.log('Please ensure your .env.local file contains the OpenAI Assistant ID');
    process.exit(1);
  }

  await uploadContentToAssistant();
}

if (require.main === module) {
  main();
}
