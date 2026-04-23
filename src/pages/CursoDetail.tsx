import { Fragment, useState } from 'react';
import { Button, Tabs, Checkbox, Progress } from 'antd';
import { CaretRightFilled, CheckOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import AulaThumb, { AulaThumbMini } from '../components/AulaThumb';
import DesignBadge from '../components/DesignBadge';
import { OfferCompact, OfferModuleBonus } from '../components/AdSlot';
import {
  OfferCarouselRow,
  OfferUGCTestimonial,
  OfferIntentSearch,
} from '../components/AdSlotV2';
import { offerImg, offerVideo } from '../data/offerImages';
import { SHOW_ADS } from '../config';
import { cursoUx } from '../data/curso';
import { colors } from '../theme';

function ModuloItem({
  index,
  title,
  subtitle,
  children,
  open,
  onToggle,
  anchor,
}: {
  index: number;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  anchor: 'first' | 'middle' | 'last';
}) {
  return (
    <div style={{ position: 'relative', paddingLeft: 32 }}>
      {/* Rail + dot */}
      <div
        style={{
          position: 'absolute',
          left: 11,
          top: anchor === 'first' ? 22 : 0,
          bottom: anchor === 'last' ? 'auto' : 0,
          height: anchor === 'last' ? 22 : 'auto',
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
          border: `1.5px solid ${open ? colors.primary : colors.borderStrong}`,
          background: colors.bgSurface,
          zIndex: 1,
        }}
      />

      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
          cursor: 'pointer',
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary }}>{title}</div>
          <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>{subtitle}</div>
        </div>
        <span
          style={{
            color: colors.textSecondary,
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        >
          ▾
        </span>
      </div>

      {open && <div style={{ paddingBottom: 16 }}>{children}</div>}

      {/* index param (mantém referência — usado no pai p/ anchor) */}
      <span style={{ display: 'none' }}>{index}</span>
    </div>
  );
}

function AulaRow({
  title,
  status,
  onOpen,
}: {
  title: string;
  status: 'pending' | 'active' | 'done';
  onOpen: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 0',
        paddingLeft: 0,
        position: 'relative',
      }}
    >
      {/* Dot pegando o rail */}
      <div
        style={{
          position: 'absolute',
          left: -28,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: `1.5px solid ${status === 'done' ? colors.primary : colors.borderStrong}`,
          background: status === 'done' ? colors.primary : colors.bgSurface,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {status === 'done' && (
          <CheckOutlined style={{ color: '#0B0B0D', fontSize: 9, fontWeight: 900 }} />
        )}
      </div>

      <AulaThumbMini label={title} />
      <div
        style={{
          flex: 1,
          fontSize: 13,
          color: colors.textPrimary,
          fontWeight: 500,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {title}
      </div>
      <Button
        onClick={onOpen}
        icon={<CaretRightFilled />}
        iconPosition="end"
        style={{
          background: status === 'active' ? colors.bgElevated : 'transparent',
          border: `1px solid ${colors.border}`,
          color: '#fff',
          fontSize: 13,
        }}
      >
        Ver aula
      </Button>
    </div>
  );
}

export default function CursoDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const curso = cursoUx;
  const [openModulos, setOpenModulos] = useState<Record<string, boolean>>({ m1: true });

  const toggle = (id: string) =>
    setOpenModulos((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <AppLayout noFooter>
      {/* Banner */}
      <section className="curso-banner" style={{ paddingBottom: 64 }}>
        <div className="big-title-bg">Designers</div>

        <div className="container curso-banner-grid">
          <div style={{ flex: 1, minWidth: 0, maxWidth: 720 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#fff',
              }}
            >
              {curso.title}
            </h1>

            <div style={{ maxWidth: 300, marginTop: 20 }}>
              <Progress
                percent={curso.progress}
                showInfo={false}
                strokeColor={colors.primary}
                trailColor={colors.border}
                className="nutror-progress"
              />
              <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 6 }}>
                {curso.progress}% concluído: {curso.aulasVistas} de {curso.totalAulas} aulas
              </div>
            </div>

            {/* Card destaque: thumb + título + botão */}
            <div
              style={{
                marginTop: 40,
                display: 'flex',
                alignItems: 'center',
                gap: 32,
              }}
            >
              <div style={{ flex: '0 0 260px' }}>
                <AulaThumb label={curso.destaque.titulo} height={148} />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.3px',
                  }}
                >
                  {curso.destaque.titulo}
                </h3>
                <Button
                  type="primary"
                  icon={<CaretRightFilled />}
                  iconPosition="end"
                  style={{ marginTop: 16, fontWeight: 600, color: '#0B0B0D' }}
                  onClick={() => navigate(`/aula/a3`)}
                >
                  Continuar estudando
                </Button>
              </div>
            </div>
          </div>

          {/* Side: Design card */}
          <div
            className="curso-side"
            style={{
              flex: '0 0 var(--sidebar-w)',
              background: colors.bgSurface,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 32,
              textAlign: 'center',
              marginTop: 40,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DesignBadge size={72} showLabel={false} />
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 18,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              Design
            </div>
            <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
              {curso.author}
            </div>

            {/* S3 — Oferta compacta do produtor na sidebar */}
            {SHOW_ADS && (
              <div style={{ marginTop: 16 }}>
                <OfferCompact
                  tag="Mentoria"
                  title="Mentoria 1:1 com Designers da Eduzz"
                  description="4 sessões para discutir seu projeto em profundidade."
                  cta="Ver detalhes"
                  thumbImage={offerImg.mentoria}
                />
              </div>
            )}
            {/* V2 — UGC: vídeo vertical de ex-aluno */}
            {SHOW_ADS && (
              <div style={{ marginTop: 12, textAlign: 'left' }}>
                <OfferUGCTestimonial
                  tag="Aluno"
                  studentName="Rafael A."
                  studentRole="Design Lead @ iFood"
                  result="Virou Lead em 1 ano"
                  quote="Achei que pesquisa era só para júnior. Os frameworks daqui mudaram como eu priorizo."
                  cta="Ver a trilha"
                  videoSrc={offerVideo.ugcDepoimento1}
                  posterImage={offerImg.ugc2}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* V5 — Carrossel interativo entre banner e lista de módulos */}
      {SHOW_ADS && (
        <section className="container">
          <div style={{ maxWidth: 'var(--reading-max)' }}>
            <OfferCarouselRow
              tag="Pílulas da trilha"
              title="Assista antes de seguir no curso"
              subtitle="Aulas gratuitas relacionadas, com a mesma produtora"
              items={[
                {
                  id: 'c1',
                  title: 'Entrevista em profundidade',
                  subtitle: 'Pesquisa UX · liberada',
                  duration: '14 min',
                  thumbImage: offerImg.lessonEntrevista,
                },
                {
                  id: 'c2',
                  title: 'Análise temática de respostas',
                  subtitle: 'Pesquisa UX',
                  duration: '22 min',
                  thumbImage: offerImg.lessonAnalise,
                },
                {
                  id: 'c3',
                  title: 'Figma para prototipagem',
                  subtitle: 'Bônus',
                  duration: '18 min',
                  thumbImage: offerImg.lessonFigma,
                },
                {
                  id: 'c4',
                  title: 'Montando seu portfólio de UX',
                  subtitle: 'Bônus',
                  duration: '26 min',
                  thumbImage: offerImg.lessonPortfolio,
                },
                {
                  id: 'c5',
                  title: 'Workshop quantitativa',
                  subtitle: 'Bônus',
                  duration: '38 min',
                  thumbImage: offerImg.workshopPesquisa,
                },
              ]}
            />
          </div>
        </section>
      )}

      {/* Tabs + lista módulos */}
      <section className="container" style={{ paddingBottom: 'calc(var(--section-y) * 1.5)' }}>
        <div style={{ maxWidth: 'var(--reading-max)' }}>
        <Tabs
          defaultActiveKey="modulos"
          items={[
            { key: 'descricao', label: 'Descrição', children: <div style={{ color: colors.textSecondary }}>—</div> },
            {
              key: 'modulos',
              label: 'Módulos',
              children: (
                <div style={{ marginTop: 16 }}>
                  {/* Busca + checkboxes */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 24,
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <OfferIntentSearch
                      placeholder="Procurar aula (tente: Figma, mentoria, pesquisa)"
                      style={{ maxWidth: 320, flex: 1 }}
                    />
                    <Checkbox>Com anexo</Checkbox>
                    <Checkbox>Aulas Salvas</Checkbox>
                  </div>

                  {/* Módulos */}
                  <div>
                    {curso.modulos.map((m, idx) => (
                      <Fragment key={m.id}>
                        <ModuloItem
                          index={idx}
                          title={m.title}
                          subtitle={`${m.aulas.length} aulas`}
                          open={!!openModulos[m.id]}
                          onToggle={() => toggle(m.id)}
                          anchor={
                            idx === 0
                              ? 'first'
                              : idx === curso.modulos.length - 1
                                ? 'last'
                                : 'middle'
                          }
                        >
                          <div style={{ paddingLeft: 0 }}>
                            {m.aulas.map((a) => (
                              <AulaRow
                                key={a.id}
                                title={a.title}
                                status={a.status}
                                onOpen={() => navigate(`/aula/${a.id}`)}
                              />
                            ))}
                          </div>
                        </ModuloItem>
                        {/* S6 — Aula bônus do produtor entre módulos */}
                        {idx === 0 && (
                          <OfferModuleBonus
                            title="Aula bônus: Figma para Product Designers"
                            description="Preview grátis do próximo curso. 12 min."
                            cta="Assistir agora"
                            thumbImage={offerImg.figmaBonus}
                          />
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              ),
            },
            { key: 'comentarios', label: 'Meus comentários', children: <div style={{ color: colors.textSecondary }}>—</div> },
            { key: 'produtor', label: 'Falar com o produtor', children: <div style={{ color: colors.textSecondary }}>—</div> },
          ]}
        />

        {/* S4 — Oferta compacta após os módulos */}
        {SHOW_ADS && (
          <div style={{ marginTop: 32, maxWidth: 540 }}>
            <OfferCompact
              tag="Continue aprendendo"
              title="Quando terminar: Pesquisa Avançada em UX"
              description="Próximo curso na trilha, com a mesma produtora."
              cta="Ativar lembrete"
              thumbImage={offerImg.cursoUxAvancado}
            />
          </div>
        )}
        </div>
      </section>
      {/* mantém params referenciado p/ evitar warning TS */}
      <span style={{ display: 'none' }}>{params.id}</span>
    </AppLayout>
  );
}
