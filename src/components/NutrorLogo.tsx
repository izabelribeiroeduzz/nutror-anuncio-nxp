type Props = { size?: number; showText?: boolean };

export default function NutrorLogo({ size = 40, showText = true }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#F5B800" />
        <path d="M12 28V12h3.2l9.6 10.4V12H28v16h-3.2L15.2 17.6V28H12z" fill="#0B0B0D" />
      </svg>
      {showText && (
        <span
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.5px',
          }}
        >
          Nutror
        </span>
      )}
    </div>
  );
}
