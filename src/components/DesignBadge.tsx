import { colors } from '../theme';

type Props = { size?: number; showLabel?: boolean };

export default function DesignBadge({ size = 22, showLabel = true }: Props) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: colors.avatarBlue,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.55,
        }}
      >
        <svg
          width={size * 0.7}
          height={size * 0.7}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
        >
          <path d="M12 2a7 7 0 017 7v3a5 5 0 01-5 5h-4a5 5 0 01-5-5V9a7 7 0 017-7z" />
          <circle cx="9" cy="11" r="1" fill="#fff" />
          <circle cx="15" cy="11" r="1" fill="#fff" />
          <path d="M9 15c1 1 2 1 3 1s2 0 3-1" />
        </svg>
      </div>
      {showLabel && (
        <span style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 500 }}>
          Design
        </span>
      )}
    </div>
  );
}
