export default function Card({ children }) {
  return (
    <div
      style={{
        border: '1px solid #eaeaea',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        margin: '20px 0'
      }}
    >
      {children}
    </div>
  );
}