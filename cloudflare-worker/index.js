export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(triggerProcessEvents(env));
  },

  async fetch(request, env) {
    // Manual trigger via HTTP for testing
    const url = new URL(request.url);
    if (url.pathname === '/trigger') {
      const result = await triggerProcessEvents(env);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response('XiaonNET Cron Worker. Use /trigger to test.', { status: 200 });
  }
};

async function triggerProcessEvents(env) {
  const SUPABASE_URL = 'https://klnnojrhyblrauclwivp.supabase.co';
  const SUPABASE_KEY = env.SUPABASE_SERVICE_KEY || '';

  try {
    const res = await fetch(SUPABASE_URL + '/functions/v1/process-events', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: '{}'
    });

    const data = await res.text();
    return { status: res.status, body: data, time: new Date().toISOString() };
  } catch (e) {
    return { error: e.message, time: new Date().toISOString() };
  }
}
