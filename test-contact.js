#!/usr/bin/env node

// Test script to check the contact form API endpoint
const fetch = require('node-fetch');

async function testContactAPI() {
  try {
    console.log('Testing contact form API...');
    
    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+254 700 123 456",
      message: "This is a test message to verify the contact form functionality."
    };

    const response = await fetch('http://localhost:3004/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const result = await response.text();
    console.log('Response body:', result);

    try {
      const json = JSON.parse(result);
      console.log('Parsed JSON:', json);
    } catch (e) {
      console.log('Response is not valid JSON');
    }

  } catch (error) {
    console.error('Error testing contact API:', error);
  }
}

testContactAPI();
