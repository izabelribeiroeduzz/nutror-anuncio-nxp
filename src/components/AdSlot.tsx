/**
 * Ofertas do produtor — 3 formatos minimalistas para o produtor
 * cadastrar via dashboard. Cada slot é opt-in por página e respeita
 * o conteúdo (sem competir em tamanho ou atenção).
 *
 * Formatos (o produtor preenche apenas os campos listados):
 * - OfferInline    → faixa de 1 linha, transições de seção
 * - OfferCard      → card formato course-card, usado em grid/pós-conteúdo
 * - OfferCompact   → card pequeno, sidebar
 *
 * Label padrão: "Oferta" (do próprio produtor). Pode ser "Material extra",
 * "Mentoria", "Comunidade", conforme tipo do produto.
 */
import { useEffect } from 'react';
import { CaretRightOutlined, CloseOutlined } from '@ant-design/icons';
import { SHOW_ADS } from '../config';
import { colors } from '../theme';

export type OfferTag =
  | 'Oferta'
  | 'Material extra'
  | 'Mentoria'
  | 'Comunidade'
  | 'Continue aprendendo'
  | 'Bônus'
  | 'Próximo passo'
  | 'Premium';

function TagBadge({ tag }: { tag: OfferTag }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        color: colors.primary,
        padding: '3px 8px',
        background: 'rgba(245, 184, 0, 0.12)',
        borderRadius: 3,
      }}
    >
      {tag}
    </span>
  );
}

// -------- OfferInline — faixa horizontal, 1-2 linhas -------- //
// Campos preenchidos pelo produtor: tag, título, cta, href, thumbImage (opcional, 1:1).
export function OfferInline({
  tag = 'Oferta',
  title,
  cta = 'Saber mais',
  href = '#',
  thumbImage,
}: {
  tag?: OfferTag;
  title: string;
  cta?: string;
  href?: string;
  thumbImage?: string;
}) {
  if (!SHOW_ADS) return null;
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: thumbImage ? '12px 20px 12px 12px' : '14px 20px',
        background: 'rgba(245, 184, 0, 0.05)',
        border: `1px solid rgba(245, 184, 0, 0.18)`,
        borderRadius: 10,
        textDecoration: 'none',
      }}
    >
      {thumbImage && (
        <div
          aria-hidden
          style={{
            width: 48,
            aspectRatio: '1 / 1',
            flex: '0 0 48px',
            borderRadius: 6,
            backgroundImage: `url(${thumbImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: colors.bgElevated,
          }}
        />
      )}
      <TagBadge tag={tag} />
      <span
        style={{
          flex: 1,
          minWidth: 0,
          color: colors.textPrimary,
          fontSize: 14,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </span>
      <span
        style={{
          color: colors.primary,
          fontSize: 13,
          fontWeight: 700,
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {cta} <CaretRightOutlined style={{ fontSize: 10 }} />
      </span>
    </a>
  );
}

// -------- OfferCard — mimetiza course card (cover 16:9 + meta abaixo) -------- //
// Cover só com chip da oferta. Título e descrição abaixo, sem duplicar.
// Campos: tag, thumbImage, título, descrição, cta, accent (fallback).
export function OfferCard({
  tag = 'Oferta',
  title,
  description,
  cta = 'Ver oferta',
  href = '#',
  accent = 'primary',
  thumbImage,
}: {
  tag?: OfferTag;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
  accent?: 'primary' | 'blue' | 'neutral';
  thumbImage?: string;
}) {
  if (!SHOW_ADS) return null;
  const grads: Record<string, string> = {
    primary:
      'radial-gradient(ellipse at 70% 30%, rgba(245,184,0,0.35) 0%, transparent 60%), linear-gradient(135deg, #1a1a1d 0%, #2a1e0a 100%)',
    blue:
      'radial-gradient(ellipse at 30% 30%, rgba(30,64,255,0.3) 0%, transparent 60%), linear-gradient(135deg, #151525 0%, #0f0f1a 100%)',
    neutral: 'linear-gradient(135deg, #1a1a1c 0%, #28282c 100%)',
  };
  return (
    <a
      href={href}
      style={{
        width: '100%',
        display: 'block',
        textDecoration: 'none',
      }}
    >
      {/* Cover 16:9 como course card, com chip no canto */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 10,
          background: thumbImage ? `url(${thumbImage}) center/cover` : grads[accent],
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <TagBadge tag={tag} />
        </div>
      </div>
      {/* Meta abaixo, mesmo ritmo do course card */}
      <div style={{ marginTop: 12 }}>
        <div
          style={{
            color: colors.textPrimary,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '-0.2px',
            lineHeight: 1.25,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        )}
        <div
          style={{
            color: colors.primary,
            fontSize: 12,
            fontWeight: 700,
            marginTop: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {cta} <CaretRightOutlined style={{ fontSize: 9 }} />
        </div>
      </div>
    </a>
  );
}

// -------- OfferCompact — card pequeno, sidebar -------- //
// Campos: tag, título, descrição curta, cta, thumbImage (opcional, 1:1).
export function OfferCompact({
  tag = 'Oferta',
  title,
  description,
  cta = 'Ver oferta',
  href = '#',
  thumbImage,
}: {
  tag?: OfferTag;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
  thumbImage?: string;
}) {
  if (!SHOW_ADS) return null;
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        gap: 14,
        padding: 16,
        background: colors.bgSurface,
        border: `1px solid ${colors.border}`,
        borderLeft: `3px solid ${colors.primary}`,
        borderRadius: 8,
        textDecoration: 'none',
        alignItems: 'flex-start',
      }}
    >
      {thumbImage && (
        <div
          aria-hidden
          style={{
            width: 56,
            aspectRatio: '1 / 1',
            flex: '0 0 56px',
            borderRadius: 6,
            backgroundImage: `url(${thumbImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: colors.bgElevated,
          }}
        />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <TagBadge tag={tag} />
        <div
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            marginTop: 8,
            letterSpacing: '-0.2px',
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              lineHeight: 1.5,
              marginTop: 6,
            }}
          >
            {description}
          </div>
        )}
        <div
          style={{
            color: colors.primary,
            fontSize: 12,
            fontWeight: 700,
            marginTop: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {cta} <CaretRightOutlined style={{ fontSize: 9 }} />
        </div>
      </div>
    </a>
  );
}

// -------- OfferModuleBonus — mimetiza item de módulo na lista -------- //
// Usa o mesmo rail visual dos módulos reais, com badge BÔNUS e CTA.
// O produtor preenche: título, descrição curta, CTA, href (curso alvo).
export function OfferModuleBonus({
  title,
  description,
  cta = 'Desbloquear',
  href = '#',
  thumbImage,
}: {
  title: string;
  description?: string;
  cta?: string;
  href?: string;
  thumbImage?: string;
}) {
  if (!SHOW_ADS) return null;
  return (
    <div style={{ position: 'relative', paddingLeft: 32 }}>
      <div
        style={{
          position: 'absolute',
          left: 11,
          top: 0,
          bottom: 0,
          width: 1.5,
          background: colors.border,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 4,
          top: 16,
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: `1.5px solid ${colors.primary}`,
          background: colors.primary,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0B0B0D',
          fontSize: 10,
          fontWeight: 900,
        }}
      >
        ★
      </div>

      <a
        href={href}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px',
          margin: '8px 0',
          background: 'rgba(245, 184, 0, 0.05)',
          border: `1px solid rgba(245, 184, 0, 0.25)`,
          borderRadius: 8,
          textDecoration: 'none',
          gap: 16,
        }}
      >
        {thumbImage && (
          <div
            aria-hidden
            style={{
              width: 56,
              aspectRatio: '1 / 1',
              flex: '0 0 56px',
              borderRadius: 6,
              backgroundImage: `url(${thumbImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: colors.bgElevated,
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.8px',
                color: '#0B0B0D',
                background: colors.primary,
                padding: '2px 8px',
                borderRadius: 3,
              }}
            >
              BÔNUS
            </span>
          </div>
          <div
            style={{
              color: colors.textPrimary,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '-0.2px',
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                marginTop: 4,
              }}
            >
              {description}
            </div>
          )}
        </div>
        <span
          style={{
            flex: '0 0 auto',
            color: colors.primary,
            fontSize: 13,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            whiteSpace: 'nowrap',
          }}
        >
          {cta} <CaretRightOutlined style={{ fontSize: 10 }} />
        </span>
      </a>
    </div>
  );
}

// -------- OfferToast — notificação fixa após ação do aluno -------- //
// Canto inferior direito, auto-dismiss opcional (timeout em ms), com botão fechar.
// Trigger ideal: após Marcar como Concluída / completar módulo.
export function OfferToast({
  show,
  onClose,
  tag = 'Continue aprendendo',
  title,
  description,
  cta = 'Ver agora',
  href = '#',
  autoDismissMs,
  thumbImage,
}: {
  show: boolean;
  onClose: () => void;
  tag?: OfferTag;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
  autoDismissMs?: number;
  thumbImage?: string;
}) {
  useEffect(() => {
    if (!show || !autoDismissMs) return;
    const t = setTimeout(onClose, autoDismissMs);
    return () => clearTimeout(t);
  }, [show, autoDismissMs, onClose]);

  if (!SHOW_ADS || !show) return null;
  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 340,
        maxWidth: 'calc(100vw - 48px)',
        background: colors.bgElevated,
        border: `1px solid ${colors.border}`,
        borderLeft: `3px solid ${colors.primary}`,
        borderRadius: 10,
        padding: 16,
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        animation: 'offer-toast-in 260ms ease-out',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Fechar"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'transparent',
          border: 'none',
          color: colors.textMuted,
          cursor: 'pointer',
          padding: 4,
          lineHeight: 1,
        }}
      >
        <CloseOutlined style={{ fontSize: 12 }} />
      </button>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {thumbImage && (
          <div
            aria-hidden
            style={{
              width: 48,
              aspectRatio: '1 / 1',
              flex: '0 0 48px',
              borderRadius: 6,
              backgroundImage: `url(${thumbImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: colors.bgElevated,
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              color: colors.primary,
              padding: '3px 8px',
              background: 'rgba(245, 184, 0, 0.12)',
              borderRadius: 3,
              marginBottom: 8,
            }}
          >
            {tag}
          </span>
          <div
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.3,
              paddingRight: 18,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                lineHeight: 1.5,
                marginTop: 6,
              }}
            >
              {description}
            </div>
          )}
          <a
            href={href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              color: colors.primary,
              fontSize: 13,
              fontWeight: 700,
              marginTop: 12,
              textDecoration: 'none',
            }}
          >
            {cta} <CaretRightOutlined style={{ fontSize: 10 }} />
          </a>
        </div>
      </div>
    </div>
  );
}

// -------- OfferPlayerOverlay — aparece sobre o player no fim do vídeo -------- //
// Não-modal: cobre só o player, gradient bottom para legibilidade.
// O produtor preenche: tag, título, descrição, CTA, href.
export function OfferPlayerOverlay({
  show,
  onClose,
  tag = 'Continue aprendendo',
  title,
  description,
  cta = 'Saber mais',
  href = '#',
}: {
  show: boolean;
  onClose: () => void;
  tag?: OfferTag;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
}) {
  if (!SHOW_ADS || !show) return null;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 10,
        background:
          'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.95) 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'clamp(16px, 3vw, 28px)',
        zIndex: 5,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fechar"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'rgba(11,11,13,0.6)',
          backdropFilter: 'blur(8px)',
          border: `1px solid rgba(255,255,255,0.15)`,
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <CloseOutlined style={{ fontSize: 12 }} />
      </button>
      <div style={{ maxWidth: 520, position: 'relative', zIndex: 1 }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: '#0B0B0D',
            background: colors.primary,
            padding: '3px 8px',
            borderRadius: 3,
            marginBottom: 10,
          }}
        >
          {tag}
        </span>
        <div
          style={{
            color: '#fff',
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            fontWeight: 800,
            letterSpacing: '-0.4px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 13,
              lineHeight: 1.5,
              marginTop: 8,
            }}
          >
            {description}
          </div>
        )}
        <a
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 14,
            background: colors.primary,
            color: '#0B0B0D',
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          {cta} <CaretRightOutlined style={{ fontSize: 10 }} />
        </a>
      </div>
    </div>
  );
}

// -------- OfferFileItem — linha de arquivo na tab Arquivos -------- //
// Visual de item de download; se premium=true, troca CTA e ganha badge.
export function OfferFileItem({
  name,
  size,
  premium,
  price,
  href = '#',
}: {
  name: string;
  size: string;
  premium?: boolean;
  price?: string;
  href?: string;
}) {
  const showPremium = premium && SHOW_ADS;
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 16px',
        background: showPremium ? 'rgba(245, 184, 0, 0.05)' : colors.bgSurface,
        border: `1px solid ${showPremium ? 'rgba(245, 184, 0, 0.25)' : colors.border}`,
        borderRadius: 8,
        textDecoration: 'none',
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 6,
          background: colors.bgElevated,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '0 0 36px',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: showPremium ? colors.primary : colors.textSecondary }}>
          <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
          <path d="M14 3v6h6" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {name}
          {showPremium && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.6px',
                color: '#0B0B0D',
                background: colors.primary,
                padding: '2px 6px',
                borderRadius: 3,
              }}
            >
              PREMIUM
            </span>
          )}
        </div>
        <div style={{ color: colors.textSecondary, fontSize: 12, marginTop: 2 }}>{size}</div>
      </div>
      <span
        style={{
          color: showPremium ? colors.primary : colors.textSecondary,
          fontSize: 13,
          fontWeight: 700,
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {showPremium ? (price ?? 'Desbloquear') : 'Baixar'}
        <CaretRightOutlined style={{ fontSize: 10 }} />
      </span>
    </a>
  );
}
