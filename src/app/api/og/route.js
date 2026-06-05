import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B1D3A', // Dark navy background
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 80,
              color: '#F59E0B', // Gold/amber
              margin: '0 0 20px 0',
              fontWeight: 800,
            }}
          >
            Levora Academy
          </h1>
          <p
            style={{
              fontSize: 36,
              color: '#FFFFFF',
              margin: '0 0 40px 0',
              fontWeight: 500,
            }}
          >
            Premium Education | JEE · NEET · School · Coding
          </p>
        </div>
        
        {/* Bottom Strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: '#94A3B8', // Slate-400
              letterSpacing: '0.05em',
            }}
          >
            levoraacademy.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
