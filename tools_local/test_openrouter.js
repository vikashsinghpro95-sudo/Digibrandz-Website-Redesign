async function run() {
  const apiKey = 'sk-or-v1-REDACTED';
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://digibrandz.in',
        'X-Title': 'DigiBrandz Chatbot'
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          { role: 'user', content: 'Hello' }
        ]
      })
    });
    
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

run();
