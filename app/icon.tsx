import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0b0e',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #10b981',
          borderRadius: '4px',
          color: '#10b981',
          fontSize: '22px',
          fontWeight: 700,
          fontFamily: 'monospace',
        }}
      >
        N
      </div>
    ),
    { ...size }
  )
}
