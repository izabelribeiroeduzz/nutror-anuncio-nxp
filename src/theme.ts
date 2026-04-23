import { theme, type ThemeConfig } from 'antd';

export const colors = {
  bgPage: '#0B0B0D',
  bgSurface: '#151518',
  bgElevated: '#1C1C20',
  bgHover: '#242428',
  border: '#2A2A2E',
  borderStrong: '#333338',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A6',
  textMuted: '#70707A',
  primary: '#F5B800',
  primaryHover: '#FFC933',
  link: '#7FA8FF',
  avatarBlue: '#1E40FF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colors.primary,
    colorInfo: colors.primary,
    colorBgBase: colors.bgPage,
    colorBgContainer: colors.bgSurface,
    colorBgElevated: colors.bgElevated,
    colorBorder: colors.border,
    colorBorderSecondary: colors.border,
    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorTextTertiary: colors.textMuted,
    colorLink: colors.link,
    colorLinkHover: '#A9C3FF',
    borderRadius: 8,
    borderRadiusLG: 12,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
  },
  components: {
    Layout: {
      headerBg: colors.bgPage,
      bodyBg: colors.bgPage,
      footerBg: colors.bgPage,
      headerHeight: 72,
      headerPadding: '0 48px',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemColor: colors.textPrimary,
      darkItemHoverColor: colors.primary,
      darkItemSelectedColor: colors.primary,
      darkItemSelectedBg: 'transparent',
      horizontalItemSelectedColor: colors.primary,
      horizontalItemHoverColor: colors.primary,
      horizontalItemBorderRadius: 0,
      itemBg: 'transparent',
    },
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      borderColorDisabled: colors.border,
    },
    Card: {
      colorBgContainer: colors.bgSurface,
      headerBg: 'transparent',
    },
    Input: {
      colorBgContainer: colors.bgElevated,
      activeBorderColor: colors.primary,
      hoverBorderColor: colors.borderStrong,
    },
    Tabs: {
      itemColor: colors.textSecondary,
      itemHoverColor: colors.textPrimary,
      itemSelectedColor: colors.primary,
      itemActiveColor: colors.primary,
      inkBarColor: colors.primary,
      titleFontSize: 14,
    },
    Progress: {
      defaultColor: colors.primary,
    },
    Dropdown: {
      colorBgElevated: colors.bgElevated,
    },
    Collapse: {
      headerBg: 'transparent',
      contentBg: 'transparent',
      contentPadding: 0,
      headerPadding: '16px 0',
    },
    Checkbox: {
      colorPrimary: colors.primary,
      colorPrimaryHover: colors.primaryHover,
    },
  },
};
