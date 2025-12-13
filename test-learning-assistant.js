#!/usr/bin/env node

/**
 * Test ORA Learning Content Assistant
 * Tests if the AI agent can answer questions about the uploaded learning content
 */

const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.VITE_OPENAI_ASSISTANT_ID;

async function testAssistant(question) {
  try {
    console.log(`🤖 Testing: "${question}"`);

    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: question
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    let attempts = 0;
    while (runStatus.status !== "completed" && attempts < 15) {
      console.log(`⏳ Waiting... (${attempts + 1}/15)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      attempts++;
    }

    if (runStatus.status === "completed") {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const response = messages.data[0].content[0].text.value;
      console.log('✅ Assistant response:');
      console.log(response);
      console.log('---');
      return true;
    } else {
      console.log('❌ Assistant did not complete in time');
      return false;
    }

  } catch (error) {
    console.error('❌ Error testing assistant:', error.message);
    return false;
  }
}

async function main() {
  console.log('🧪 Testing ORA Learning Content Assistant\n');

  const testQuestions = [
    "What are the main learning modules in the ORA Platform?",
    "Tell me about Applied AI Governance and Organizational Blind Spots",
    "What is the ORA mission and framework?",
    "How long are the learning modules?",
    "What topics does the Artificial Intelligence Foundation cover?"
  ];

  for (const question of testQuestions) {
    await testAssistant(question);
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('🎉 Testing complete!');
}

if (require.main === module) {
  main();
}
