addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response('Username is required', { status: 400 });
  }

  // Call Instaloader to download the videos
  const result = await fetch(`https://instaloader-script.com?username=${username}`);
  const data = await result.json();

  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}
