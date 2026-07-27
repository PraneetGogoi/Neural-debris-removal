import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--f-mono)'
    }}>
      <div style={{
        background: 'var(--panel)',
        border: '1px solid var(--poison)',
        padding: '2.5rem',
        maxWidth: '540px',
        width: '100%',
        boxShadow: '0 0 40px rgba(225,29,72,0.1)'
      }}>
        <div style={{ 
          color: 'var(--poison)', 
          fontSize: '0.8rem', 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--poison)',
            boxShadow: '0 0 8px var(--poison)'
          }}></span>
          Signal Lost
        </div>
        
        <h1 style={{
          fontFamily: 'var(--f-display)',
          fontSize: '2.4rem',
          margin: '0 0 1rem 0',
          lineHeight: 1.1
        }}>404 &mdash; Candidate Not Found</h1>
        
        <p style={{
          color: 'var(--text-dim)',
          lineHeight: 1.6,
          marginBottom: '2rem',
          fontFamily: 'var(--f-body)',
          fontSize: '1.1rem'
        }}>
          The requested coordinate or sector hash could not be located in the telemetry index. The candidate may have been dropped below the noise floor, or the path was malformed.
        </p>
        
        <Link href="/" style={{
          display: 'inline-block',
          padding: '0.6rem 1.2rem',
          border: '1px solid var(--text-dim)',
          color: 'var(--text)',
          textDecoration: 'none',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'all 0.2s ease',
          background: 'rgba(255,255,255,0.02)'
        }}>
          &larr; Return to Root
        </Link>
      </div>
    </div>
  );
}
