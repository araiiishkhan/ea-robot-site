export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        background: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
}