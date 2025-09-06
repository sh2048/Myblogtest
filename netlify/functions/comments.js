// netlify/functions/comments.js
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

exports.handler = async (event) => {
  const { method } = event;

  if (method === 'GET') {
    const postId = event.queryStringParameters.postId;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments?post_id=eq.${postId}&select=*`, {
      headers: {
        apiKey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  }

  if (method === 'POST') {
    const { postId, author, content } = JSON.parse(event.body);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
      method: 'POST',
      headers: {
        apiKey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: postId, author, content })
    });
    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
