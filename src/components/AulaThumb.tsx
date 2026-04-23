import { colors } from '../theme';

type Props = {
  label?: string;
  moduloLabel?: string;
  width?: number | string;
  height?: number | string;
  showPortrait?: boolean;
};

/**
 * Thumb estilo "Nutror Experience" — faixa escura à esquerda com badge + título,
 * e retrato do produtor (mock) à direita com overlay amarelo de neon.
 */
export default function AulaThumb({
  label = 'Resultados do Teste - Parte 2',
  moduloLabel = 'Nutror Experience',
  width = '100%',
  height = 160,
  showPortrait = true,
}: Props) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        background: '#0E0E10',
        position: 'relative',
      }}
    >
      <div
        style={{
          flex: '0 0 55%',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0E0E10 0%, #1A1A1D 100%)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: '#1F1F22',
            color: '#A0A0A6',
            fontSize: 9,
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: 3,
            width: 'fit-content',
            letterSpacing: '0.3px',
          }}
        >
          {moduloLabel}
        </span>
        <div
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {label}
        </div>
      </div>
      {showPortrait && (
        <div
          style={{
            flex: 1,
            background: `
              radial-gradient(ellipse at 50% 80%, rgba(245, 184, 0, 0.25) 0%, transparent 60%),
              linear-gradient(135deg, #1a2a1a 0%, #0f1f0f 100%)
            `,
            position: 'relative',
          }}
        >
          {/* Silhueta mock (verde neon atrás) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60') center/cover`,
              opacity: 0.8,
              mixBlendMode: 'luminosity',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(26,26,29,0.6) 0%, transparent 40%)',
            }}
          />
        </div>
      )}
    </div>
  );
}

export function AulaThumbMini({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 120,
        height: 68,
        borderRadius: 6,
        overflow: 'hidden',
        display: 'flex',
        background: '#0E0E10',
        position: 'relative',
        flex: '0 0 120px',
      }}
    >
      <div
        style={{
          flex: '0 0 55%',
          padding: '6px 8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0E0E10 0%, #1A1A1D 100%)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: '#1F1F22',
            color: colors.textSecondary,
            fontSize: 6,
            fontWeight: 600,
            padding: '1px 4px',
            borderRadius: 2,
            width: 'fit-content',
            letterSpacing: '0.2px',
          }}
        >
          Nutror Experience
        </span>
        <div style={{ color: '#fff', fontSize: 8, fontWeight: 700, lineHeight: 1.1 }}>
          {label}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=50') center/cover`,
        }}
      />
    </div>
  );
}
