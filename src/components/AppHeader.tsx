import { Input, Menu, Avatar, Space, Divider } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NutrorLogo from './NutrorLogo';
import { colors } from '../theme';

const navItems = [
  { key: '/', label: 'Resumo' },
  { key: '/meus-cursos', label: 'Meus Cursos' },
  { key: '/portais', label: 'Portais' },
  { key: '/certificados', label: 'Certificados' },
  { key: '/aulas-salvas', label: 'Aulas Salvas' },
  { key: '/minhas-anotacoes', label: 'Minhas Anotações' },
];

function ThemeSwitchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 000 18" fill="currentColor" />
    </svg>
  );
}

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  // Resolve active key — curso/aula herdam "meus-cursos"
  const path = location.pathname;
  const activeKey =
    path === '/' ? '/'
    : path.startsWith('/curso') || path.startsWith('/aula') || path.startsWith('/meus-cursos')
      ? '/meus-cursos'
      : path;

  return (
    <div
      style={{
        background: colors.bgPage,
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Linha 1: logo + busca + ícones + user */}
      <div className="container">
        <div className="header-row">
          <Link to="/" style={{ flex: '0 0 auto' }}>
            <NutrorLogo />
          </Link>

          <div className="header-search">
            <Input
              prefix={<SearchOutlined style={{ color: colors.textMuted, marginRight: 8 }} />}
              suffix={
                <span
                  style={{
                    color: colors.textMuted,
                    fontSize: 11,
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                  }}
                >
                  CTRL + K
                </span>
              }
              placeholder="Procurar cursos e autores"
              style={{
                background: colors.bgElevated,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                height: 40,
              }}
            />
          </div>

          <div style={{ flex: 1 }} />

          <Space size={20} style={{ color: colors.textSecondary, flex: '0 0 auto' }}>
            <span style={{ cursor: 'pointer', display: 'inline-flex' }}>
              <ThemeSwitchIcon />
            </span>
            <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
            <QuestionCircleOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Space>

          <Divider type="vertical" style={{ height: 32, borderColor: colors.border }} />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              flex: '0 0 auto',
            }}
          >
            <Avatar size={32} icon={<UserOutlined />} style={{ background: colors.bgElevated }} />
            <span
              className="header-greeting"
              style={{ fontWeight: 600, color: colors.textPrimary, fontSize: 14 }}
            >
              Designers da Eduzz
            </span>
            <DownOutlined style={{ fontSize: 10, color: colors.textSecondary }} />
          </div>
        </div>
      </div>

      {/* Linha 2: navegação centralizada */}
      <div className="container">
        <div
          className="nutror-nav"
          style={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: 'none',
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[activeKey]}
            onClick={(e) => navigate(e.key)}
            items={navItems}
            theme="dark"
            style={{
              background: 'transparent',
              borderBottom: 'none',
              justifyContent: 'center',
              flex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}
