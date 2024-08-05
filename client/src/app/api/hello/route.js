// app/api/hello/route.js
export async function GET() {
    return new Response(JSON.stringify({ message: 'Hello, world!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  