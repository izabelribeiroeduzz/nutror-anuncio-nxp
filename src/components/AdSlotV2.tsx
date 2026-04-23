/**
 * AdSlot V2 — formatos orientados por pesquisa de CTR para plataformas de curso.
 *
 * Fontes mapeadas (research → componente):
 *  V1 OfferVideoTrailer   — vídeo in-stream / trailer estilo MasterClass (CTR 4,5x)
 *  V2 OfferUGCTestimonial — UGC e depoimentos em vídeo 9:16
 *  V3 OfferDynamicRetarget— retargeting comportamental (aula exata que o aluno parou)
 *  V4 OfferIntentSearch   — sugestão baseada em palavra-chave digitada (alta intenção)
 *  V5 OfferCarouselRow    — carrossel interativo de aulas/pílulas, estilo Netflix
 *
 * Todos opt-in via SHOW_ADS. Copy, thumbs e CTAs vêm do produtor.
 */
import { useEffect, useRef, useState } from 'react';
import { CaretRightOutlined, CaretRightFilled, LeftOutlined, RightOutlined, CloseOutlined, SearchOutlined, StarFilled } from '@ant-design/icons';
import { SHOW_ADS } from '../config';
import { colors } from '../theme';
import type { OfferTag } from './AdSlot';

function Chip({ tag, solid = false }: { tag: string; solid?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        color: solid ? '#0B0B0D' : colors.primary,
        background: solid ? colors.primary : 'rgba(245, 184, 0, 0.12)',
        padding: '3px 8px',
        borderRadius: 3,
      }}
    >
      {tag}
    </span>
  );
}

/**
 * Identidade "Recomendados para você" — curadoria editorial do produtor.
 * Distinta das ofertas promocionais: azul (confiança) + pill + estrela.
 * NÃO reutilizar em slots de oferta paga — esse chip é só p/ recomendação.
 */
const RECOMENDADO_BLUE = '#7FA8FF';

function RecomendadoChip({ label = 'Recomendados para você' }: { label?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        color: RECOMENDADO_BLUE,
        background: 'rgba(127, 168, 255, 0.12)',
        padding: '4px 10px',
        borderRadius: 999,
        border: `1px solid rgba(127, 168, 255, 0.22)`,
      }}
    >
      <StarFilled style={{ fontSize: 9 }} />
      {label}
    </span>
  );
}

// =====================================================================
// V1 — OfferVideoTrailer
// Trailer em autoplay mudo (estilo MasterClass) ocupando hero/player.
// Mostra o produtor em ação. CTA sobreposto no canto inferior.
// =====================================================================
export function OfferVideoTrailer({
  tag = 'Trailer',
  title,
  description,
  cta = 'Ver curso completo',
  href = '#',
  videoSrc,
  posterImage,
  height = 260,
}: {
  tag?: string;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
  videoSrc: string;
  posterImage?: string;
  height?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dismissed, setDismissed] = useState(false);

  if (!SHOW_ADS || dismissed) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 12,
        overflow: 'hidden',
        background: colors.bgSurface,
        border: `1px solid ${colors.border}`,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterImage}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {/* Gradient for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.9) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Close */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Fechar"
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(11,11,13,0.65)',
          backdropFilter: 'blur(6px)',
          border: `1px solid rgba(255,255,255,0.2)`,
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <CloseOutlined style={{ fontSize: 14 }} />
      </button>
      {/* Bottom content */}
      <div
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: 20,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <Chip tag={tag} solid />
          <div
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '-0.4px',
              marginTop: 8,
              lineHeight: 1.25,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 13,
                marginTop: 4,
                maxWidth: 520,
              }}
            >
              {description}
            </div>
          )}
        </div>
        <a
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: colors.primary,
            color: '#0B0B0D',
            padding: '10px 18px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {cta} <CaretRightOutlined style={{ fontSize: 10 }} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// V2 — OfferUGCTestimonial
// Card com vídeo vertical 9:16 e texto do ex-aluno ao lado.
// Exibe nome, resultado numérico e depoimento curto.
// =====================================================================
export function OfferUGCTestimonial({
  tag = 'Alunos',
  studentName,
  studentRole,
  result,
  quote,
  cta = 'Ver curso',
  href = '#',
  videoSrc,
  posterImage,
}: {
  tag?: string;
  studentName: string;
  studentRole?: string;
  result: string;
  quote: string;
  cta?: string;
  href?: string;
  videoSrc?: string;
  posterImage?: string;
}) {
  if (!SHOW_ADS) return null;
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        background: colors.bgSurface,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        textDecoration: 'none',
        alignItems: 'stretch',
      }}
    >
      {/* Vertical 9:16 video */}
      <div
        style={{
          flex: '0 0 112px',
          aspectRatio: '9 / 16',
          borderRadius: 8,
          overflow: 'hidden',
          background: colors.bgElevated,
          position: 'relative',
        }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={posterImage}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: posterImage ? `url(${posterImage}) center/cover` : colors.bgElevated,
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.9) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: 8,
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          {studentName}
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Chip tag={tag} />
        <div
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '-0.2px',
            marginTop: 8,
            lineHeight: 1.3,
          }}
        >
          {result}
        </div>
        <div
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 1.5,
            marginTop: 8,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontStyle: 'italic',
          }}
        >
          "{quote}"
        </div>
        <div
          style={{
            color: colors.textMuted,
            fontSize: 11,
            marginTop: 6,
          }}
        >
          — {studentName}{studentRole ? `, ${studentRole}` : ''}
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            color: colors.primary,
            fontSize: 12,
            fontWeight: 700,
            marginTop: 12,
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

// =====================================================================
// V3 — OfferDynamicRetarget
// Retargeting baseado em comportamento: referencia a aula exata que o aluno
// visualizou mas não concluiu. Mostra progresso da aula e continua de onde parou.
// =====================================================================
export function OfferDynamicRetarget({
  lessonTitle,
  lessonModule,
  watchedSeconds,
  totalSeconds,
  cta = 'Continuar de onde parou',
  href = '#',
  thumbImage,
}: {
  lessonTitle: string;
  lessonModule: string;
  watchedSeconds: number;
  totalSeconds: number;
  cta?: string;
  href?: string;
  thumbImage?: string;
}) {
  if (!SHOW_ADS) return null;
  const pct = Math.min(100, Math.round((watchedSeconds / totalSeconds) * 100));
  const mmss = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <a
      href={href}
      style={{
        display: 'block',
        width: '100%',
        textDecoration: 'none',
        background: colors.bgSurface,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {/* Thumb 16:9 com progress bar abaixo (Netflix-like) */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: thumbImage
              ? `url(${thumbImage}) center/cover`
              : 'linear-gradient(135deg, #1a1a1d 0%, #2a1e0a 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.8) 100%)',
          }}
        />
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <Chip tag="Retomar" solid />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            bottom: 18,
            color: '#fff',
          }}
        >
          <div style={{ fontSize: 10, letterSpacing: '0.6px', opacity: 0.7, textTransform: 'uppercase', fontWeight: 600 }}>
            Você parou em
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '-0.2px',
              lineHeight: 1.3,
              marginTop: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {lessonTitle}
          </div>
        </div>
        {/* Progress bar igual Netflix */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background: 'rgba(255,255,255,0.15)',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: colors.primary,
            }}
          />
        </div>
      </div>
      <div
        style={{
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ color: colors.textSecondary, fontSize: 11 }}>
            {lessonModule} · {mmss(watchedSeconds)} / {mmss(totalSeconds)}
          </div>
        </div>
        <span
          style={{
            color: colors.primary,
            fontSize: 12,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            whiteSpace: 'nowrap',
          }}
        >
          <CaretRightFilled style={{ fontSize: 10 }} /> {cta}
        </span>
      </div>
    </a>
  );
}

// =====================================================================
// V4 — OfferIntentSearch
// Input de busca com sugestões de alta intenção. Quando o usuário digita
// uma palavra-chave que não está no curso atual, sugere outro produto do
// produtor que cobre o tema.
// =====================================================================
const intentMap: Record<string, { title: string; subtitle: string; tag: OfferTag; href: string }> = {
  figma: {
    title: 'Figma para Product Designers',
    subtitle: 'Curso completo · 12h · Mesma produtora',
    tag: 'Próximo passo',
    href: '#',
  },
  pesquisa: {
    title: 'Pesquisa Avançada em UX',
    subtitle: 'Próximo na trilha · Mesma produtora',
    tag: 'Continue aprendendo',
    href: '#',
  },
  mentoria: {
    title: 'Mentoria 1:1 com Designers da Eduzz',
    subtitle: '4 sessões · Revisão de projeto',
    tag: 'Mentoria',
    href: '#',
  },
  design: {
    title: 'Design Systems do zero',
    subtitle: 'Próximo curso · Lista de espera',
    tag: 'Próximo passo',
    href: '#',
  },
  portfolio: {
    title: 'Mentoria 1:1 com Designers da Eduzz',
    subtitle: 'Revise seu portfólio com a produtora',
    tag: 'Mentoria',
    href: '#',
  },
};

export function OfferIntentSearch({
  placeholder = 'Procurar aula',
  style,
}: {
  placeholder?: string;
  style?: React.CSSProperties;
}) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const match = (() => {
    if (!value.trim()) return null;
    const q = value.toLowerCase();
    for (const key of Object.keys(intentMap)) {
      if (q.includes(key)) return intentMap[key];
    }
    return null;
  })();

  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: colors.bgElevated,
          border: `1px solid ${open ? colors.primary : colors.border}`,
          borderRadius: 8,
          padding: '6px 12px',
          transition: 'border-color 0.15s',
        }}
      >
        <SearchOutlined style={{ color: colors.textMuted, fontSize: 13 }} />
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: colors.textPrimary,
            fontSize: 13,
            padding: '4px 0',
          }}
        />
      </div>

      {SHOW_ADS && open && match && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 20,
            background: colors.bgElevated,
            border: `1px solid ${colors.border}`,
            borderLeft: `3px solid ${colors.primary}`,
            borderRadius: 8,
            padding: 14,
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              color: colors.textMuted,
              marginBottom: 8,
            }}
          >
            Sugestão da produtora
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ marginBottom: 6 }}>
                <Chip tag={match.tag} />
              </div>
              <div
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: '-0.2px',
                }}
              >
                {match.title}
              </div>
              <div style={{ color: colors.textSecondary, fontSize: 12, marginTop: 4 }}>
                {match.subtitle}
              </div>
            </div>
            <a
              href={match.href}
              style={{
                background: colors.primary,
                color: '#0B0B0D',
                padding: '8px 14px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Ver <CaretRightOutlined style={{ fontSize: 9 }} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// V5 — OfferCarouselRow
// Carrossel horizontal estilo Netflix. Scroll por arraste + setas.
// Cada item é uma "pílula" com thumb 16:9 + título curto.
// =====================================================================
export type CarouselItem = {
  id: string;
  title: string;
  subtitle?: string;
  thumbImage?: string;
  duration?: string;
  href?: string;
  /** true = item leva ao marketplace Nutror (abre em nova aba) */
  external?: boolean;
  /** foto do dono/produtor do curso (circular, ~20px). Mostra ao lado do subtitle. */
  ownerAvatar?: string;
};

export function OfferCarouselRow({
  tag = 'Recomendados para você',
  title,
  subtitle,
  items,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  items: CarouselItem[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 10);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };
    update();
    el.addEventListener('scroll', update);
    return () => el.removeEventListener('scroll', update);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  if (!SHOW_ADS) return null;

  return (
    <section
      style={{
        padding: '24px 0 8px',
        margin: '24px 0',
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 16,
          gap: 16,
        }}
      >
        <div>
          <RecomendadoChip label={tag} />
          <div
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: '-0.3px',
              marginTop: 10,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            aria-label="Anterior"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: colors.bgElevated,
              border: `1px solid ${colors.border}`,
              color: canLeft ? '#fff' : colors.textMuted,
              cursor: canLeft ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              opacity: canLeft ? 1 : 0.4,
            }}
          >
            <LeftOutlined style={{ fontSize: 11 }} />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canRight}
            aria-label="Próximo"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: colors.bgElevated,
              border: `1px solid ${colors.border}`,
              color: canRight ? '#fff' : colors.textMuted,
              cursor: canRight ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              opacity: canRight ? 1 : 0.4,
            }}
          >
            <RightOutlined style={{ fontSize: 11 }} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: 14,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          paddingBottom: 16,
          scrollbarWidth: 'none',
        }}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href ?? '#'}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            style={{
              flex: '0 0 240px',
              textDecoration: 'none',
              borderRadius: 10,
              overflow: 'hidden',
              background: colors.bgSurface,
              border: `1px solid ${colors.border}`,
              transition: 'transform 0.2s, border-color 0.2s',
              display: 'block',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = colors.borderStrong;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = colors.border;
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                background: item.thumbImage
                  ? `url(${item.thumbImage}) center/cover`
                  : 'linear-gradient(135deg, #1a1a1d 0%, #2a1e0a 100%)',
                position: 'relative',
              }}
            >
              {item.duration && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#fff',
                    background: 'rgba(11,11,13,0.75)',
                    padding: '2px 6px',
                    borderRadius: 3,
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.duration}
                </span>
              )}
            </div>
            <div style={{ padding: '10px 12px 12px' }}>
              <div
                style={{
                  color: colors.textPrimary,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '-0.2px',
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.title}
              </div>
              {item.subtitle && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  {item.ownerAvatar && (
                    <img
                      src={item.ownerAvatar}
                      alt=""
                      loading="lazy"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flex: '0 0 20px',
                      }}
                    />
                  )}
                  <span
                    style={{
                      color: colors.textSecondary,
                      fontSize: 12,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.subtitle}
                  </span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

