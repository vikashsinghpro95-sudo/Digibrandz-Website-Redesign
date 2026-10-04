exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    // Parse the multipart form data manually
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Expected multipart/form-data' }),
      };
    }

    // Extract boundary
    const boundaryMatch = contentType.match(/boundary=(.+)/);
    if (!boundaryMatch) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No boundary found' }) };
    }

    const boundary = boundaryMatch[1];

    // Decode the body (Netlify Functions receive base64 for binary)
    const bodyBuffer = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body, 'binary');

    // Parse multipart data
    const parts = parseMultipart(bodyBuffer, boundary);
    const imagePart = parts.find(p => p.name === 'image');

    if (!imagePart) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No image field in form data' }) };
    }

    // Validate file type
    const mimeType = imagePart.contentType || '';
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(mimeType)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG' }) };
    }

    // Validate file size (5MB)
    if (imagePart.data.length > 5 * 1024 * 1024) {
      return { statusCode: 400, body: JSON.stringify({ error: 'File too large (max 5MB)' }) };
    }

    // Upload to ImgBB
    const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
    if (!IMGBB_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Image upload service not configured. Please add IMGBB_API_KEY to environment variables.' }) };
    }

    const base64Image = imagePart.data.toString('base64');

    const formBody = new URLSearchParams();
    formBody.append('key', IMGBB_API_KEY);
    formBody.append('image', base64Image);
    if (imagePart.filename) {
      formBody.append('name', imagePart.filename.replace(/\.[^.]+$/, ''));
    }

    const imgbbResponse = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formBody,
    });

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      console.error('ImgBB error:', imgbbData);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Upload to image service failed: ' + (imgbbData.error?.message || 'Unknown error') }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        success: true,
        url: imgbbData.data.url,        // direct full URL to the image
        display_url: imgbbData.data.display_url,
        thumb_url: imgbbData.data.thumb?.url || imgbbData.data.url,
      }),
    };

  } catch (err) {
    console.error('Upload function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error: ' + err.message }),
    };
  }
};

/**
 * Simple multipart/form-data parser
 */
function parseMultipart(buffer, boundary) {
  const parts = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  const endBoundaryBuf = Buffer.from('--' + boundary + '--');

  let start = 0;

  while (start < buffer.length) {
    // Find the next boundary
    const boundaryIndex = indexOf(buffer, boundaryBuf, start);
    if (boundaryIndex === -1) break;

    // Check if this is the end boundary
    const afterBoundary = boundaryIndex + boundaryBuf.length;
    if (buffer.slice(afterBoundary, afterBoundary + 2).toString() === '--') break;

    // Skip past boundary + CRLF
    const headersStart = afterBoundary + 2; // skip \r\n

    // Find end of headers (double CRLF)
    const headerEnd = indexOf(buffer, Buffer.from('\r\n\r\n'), headersStart);
    if (headerEnd === -1) break;

    const headersRaw = buffer.slice(headersStart, headerEnd).toString();
    const headers = parseHeaders(headersRaw);

    // Data starts after the double CRLF
    const dataStart = headerEnd + 4;

    // Find next boundary to know where data ends
    const nextBoundary = indexOf(buffer, boundaryBuf, dataStart);
    if (nextBoundary === -1) break;

    // Data ends before \r\n--boundary
    const dataEnd = nextBoundary - 2;
    const data = buffer.slice(dataStart, dataEnd);

    // Parse Content-Disposition
    const disposition = headers['content-disposition'] || '';
    const nameMatch = disposition.match(/name="([^"]+)"/);
    const filenameMatch = disposition.match(/filename="([^"]+)"/);

    parts.push({
      name: nameMatch ? nameMatch[1] : null,
      filename: filenameMatch ? filenameMatch[1] : null,
      contentType: headers['content-type'] || null,
      data,
    });

    start = nextBoundary;
  }

  return parts;
}

function parseHeaders(raw) {
  const headers = {};
  raw.split('\r\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim().toLowerCase();
      const val = line.slice(idx + 1).trim();
      headers[key] = val;
    }
  });
  return headers;
}

function indexOf(buffer, search, start = 0) {
  for (let i = start; i <= buffer.length - search.length; i++) {
    let found = true;
    for (let j = 0; j < search.length; j++) {
      if (buffer[i + j] !== search[j]) {
        found = false;
        break;
      }
    }
    if (found) return i;
  }
  return -1;
}
