import { type ReactNode } from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { colors } from '../theme';

type Props = { children: ReactNode; noFooter?: boolean };

export default function AppLayout({ children, noFooter }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bgPage,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppHeader />
      <main style={{ flex: 1 }}>{children}</main>
      {!noFooter && <AppFooter />}
    </div>
  );
}
