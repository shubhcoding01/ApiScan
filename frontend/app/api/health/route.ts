import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      service: 'apiscan-frontend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(), // Seconds the Node.js process has been running
    },
    { status: 200 }
  );
}