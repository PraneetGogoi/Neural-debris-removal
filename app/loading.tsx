export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0b0e',
      zIndex: 99999
    }}>
      <div style={{
        fontFamily: 'var(--font-ibm), monospace',
        fontSize: '0.8rem',
        letterSpacing: '0.15em',
        color: '#8a8b86',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        animation: 'pulse 1.5s infinite alternate'
      }}>
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.4; }
              100% { opacity: 1; }
            }
          `}
        </style>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#10b981'
        }}></span>
        [ NDR ]
      </div>
    </div>
  );
}
