// Simple local API test for meetings endpoints
(async () => {
  const base = process.env.BASE_URL || 'http://localhost:3001';

  async function call(path, init) {
    const res = await fetch(base + path, init);
    const text = await res.text();
    return { status: res.status, text };
  }

  try {
    const health = await call('/api/health');
    console.log('HEALTH', health.status, health.text);

    const payload = {
      title: 'Test Meeting ' + new Date().toISOString(),
      meeting_date: new Date().toISOString(),
      duration_minutes: 60
    };

    const post = await call('/api/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('POST', post.status, post.text);

    const get = await call('/api/meetings');
    console.log('GET', get.status, get.text.slice(0, 400));
  } catch (e) {
    console.error('TEST_ERROR', e);
    process.exit(1);
  }
})();
