import { Space } from 'antd';
import NutrorLogo from './NutrorLogo';
import { colors } from '../theme';

export default function AppFooter() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${colors.border}`,
        background: colors.bgPage,
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <Space size={24} align="center">
          <NutrorLogo />
          <span
            style={{
              color: colors.textMuted,
              fontSize: 12,
              letterSpacing: '1.2px',
              fontWeight: 500,
            }}
          >
            A ÁREA DE MEMBROS DA EDUZZ
          </span>
        </Space>

        <Space size={28} wrap>
          {['Privacidade', 'Termos e Condições', 'Cookies', 'Ajuda'].map((item) => (
            <a
              key={item}
              style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 500 }}
            >
              {item}
            </a>
          ))}
        </Space>
      </div>
    </footer>
  );
}
