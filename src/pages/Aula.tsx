import { useState } from 'react';
import { Button, Tabs, Progress } from 'antd';
import {
  ArrowRightOutlined,
  StarFilled,
  CheckOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import DesignBadge from '../components/DesignBadge';
import {
  OfferCompact,
  OfferToast,
  OfferPlayerOverlay,
  OfferFileItem,
} from '../components/AdSlot';
import { OfferIntentSearch } from '../components/AdSlotV2';
import { offerImg } from '../data/offerImages';
import { SHOW_ADS } from '../config';
import { cursoUx } from '../data/curso';
import { colors } from '../theme';

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? colors.primary : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h12v18l-6-4-6 4V3z" />
    </svg>
  );
}

function Stars() {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  return (
    <div
      className="star-row"
      style={{ marginTop: 10, justifyContent: 'center', display: 'flex' }}
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <StarFilled
          key={n}
          className={`star ${n <= (hover || rating) ? 'active' : ''}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => setRating(n)}
          style={{
            cursor: 'pointer',
            color: n <= (hover || rating) ? colors.primary : '#3a3a3e',
            fontSize: 18,
          }}
        />
      ))}
    </div>
  );
}

export default function Aula() {
  const navigate = useNavigate();
  const params = useParams();

  // Encontrar aula atual / próxima
  const flatAulas = cursoUx.modulos.flatMap((m) =>
    m.aulas.map((a) => ({ ...a, moduloTitle: m.title }))
  );
  const currentId = params.id ?? 'a1';
  const currentIdx = flatAulas.findIndex((a) => a.id === currentId);
  const current = flatAulas[currentIdx >= 0 ? currentIdx : 0];
  const next = flatAulas[(currentIdx >= 0 ? currentIdx : 0) + 1];

  const [bookmarked, setBookmarked] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [showPlayerOverlay, setShowPlayerOverlay] = useState(false);

  return (
    <AppLayout noFooter>
      <div className="container aula-layout">
        {/* Coluna principal */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 'var(--reading-max)' }}>
          {/* Header da aula */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 20,
            }}
          >
            <div>
              <div style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 6 }}>
                {current.moduloTitle}
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.5px',
                }}
              >
                {current.title}
              </h1>
            </div>
            <button
              className="icon-btn"
              onClick={() => setBookmarked((b) => !b)}
              aria-label="Salvar aula"
              style={{ color: bookmarked ? colors.primary : colors.textSecondary }}
            >
              <BookmarkIcon filled={bookmarked} />
            </button>
          </div>

          {/* Player — click simula fim do vídeo (trigger do overlay) */}
          <div
            onClick={() => setShowPlayerOverlay(true)}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              background: '#000',
              borderRadius: 10,
              marginBottom: 20,
              position: 'relative',
              cursor: SHOW_ADS ? 'pointer' : 'default',
            }}
          >
            {/* S9 — Overlay pós-vídeo do produtor */}
            <OfferPlayerOverlay
              show={showPlayerOverlay}
              onClose={() => setShowPlayerOverlay(false)}
              tag="Continue aprendendo"
              title="Parabéns! Você está pronto para o próximo passo"
              description="Desbloqueie o projeto prático com a mentoria 1:1 da produtora deste curso."
              cta="Conhecer mentoria"
            />
          </div>

          {/* Marcar como concluída / próxima aula */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Button
                size="large"
                onClick={() => setShowMilestone(true)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colors.border}`,
                  color: '#fff',
                  fontWeight: 600,
                  height: 44,
                  padding: '0 24px',
                }}
              >
                Marcar como Concluída
              </Button>
              <Stars />
            </div>

            {next && (
              <div
                onClick={() => navigate(`/aula/${next.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderRadius: 10,
                  minWidth: 260,
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ textAlign: 'right', flex: 1 }}>
                  <div
                    style={{
                      color: colors.textSecondary,
                      fontSize: 11,
                      letterSpacing: '1px',
                      fontWeight: 600,
                    }}
                  >
                    PRÓXIMA AULA
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: colors.textPrimary,
                      fontWeight: 500,
                      marginTop: 4,
                      maxWidth: 180,
                    }}
                  >
                    {next.title}
                  </div>
                </div>
                <button className="icon-btn">
                  <ArrowRightOutlined />
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs
            defaultActiveKey="descricao"
            items={[
              {
                key: 'descricao',
                label: 'Descrição',
                children: (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        background: colors.bgSurface,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 10,
                        padding: 20,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: colors.textSecondary,
                          fontSize: 13,
                          lineHeight: 1.6,
                        }}
                      >
                        Entenda nesse vídeo as principais razões que levou o time a realizar o
                        teste de usabilidade do novo Nutror Experience
                      </p>
                      <div
                        style={{
                          marginTop: 20,
                          paddingTop: 20,
                          borderTop: `1px solid ${colors.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <DesignBadge size={48} showLabel={false} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>
                            Design
                          </div>
                          <div
                            style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}
                          >
                            Designers da Eduzz
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ),
              },
              {
                key: 'arquivos',
                label: 'Arquivos',
                children: (
                  <div style={{ marginTop: 8 }}>
                    <OfferFileItem
                      name="Roteiro do teste de usabilidade.pdf"
                      size="420 KB · PDF"
                    />
                    <OfferFileItem
                      name="Planilha de resultados.xlsx"
                      size="1.2 MB · XLSX"
                    />
                    {/* S10 — Arquivo PREMIUM do produtor */}
                    <OfferFileItem
                      name="Kit completo de Pesquisa UX"
                      size="18 arquivos · análises, templates e benchmarks"
                      premium
                      price="Desbloquear por R$ 47"
                    />
                  </div>
                ),
              },
              {
                key: 'comentarios',
                label: 'Comentários',
                children: <div style={{ color: colors.textSecondary, padding: 16 }}>—</div>,
              },
              {
                key: 'anotacoes',
                label: 'Anotações',
                children: <div style={{ color: colors.textSecondary, padding: 16 }}>—</div>,
              },
              {
                key: 'produtor',
                label: 'Falar com Produtor',
                children: (
                  <div style={{ marginTop: 8 }}>
                    {/* S11 — CTA de mentoria no topo da tab */}
                    {SHOW_ADS && (
                      <div style={{ marginBottom: 16 }}>
                        <OfferCompact
                          tag="Mentoria"
                          title="Prefere resposta em 24h? Mentoria 1:1"
                          description="4 sessões individuais com a produtora. Revisão de projeto e tira-dúvidas."
                          cta="Ver mentoria"
                          thumbImage={offerImg.mentoria}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        background: colors.bgSurface,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 10,
                        padding: 20,
                        color: colors.textSecondary,
                        fontSize: 13,
                      }}
                    >
                      Envie sua dúvida diretamente à produtora do curso. Resposta em até 7 dias
                      úteis.
                    </div>
                  </div>
                ),
              },
            ]}
          />

        </div>

        {/* Sidebar direita */}
        <aside style={{ flex: '0 0 var(--sidebar-w)', marginTop: 48 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>
            {cursoUx.title}
          </h3>
          <div style={{ marginTop: 12 }}>
            <Progress
              percent={cursoUx.progress}
              showInfo={false}
              strokeColor={colors.primary}
              trailColor={colors.border}
              className="nutror-progress"
            />
            <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>
              {cursoUx.progress}% concluído: {cursoUx.aulasVistas} de {cursoUx.totalAulas} aulas
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <OfferIntentSearch placeholder="Procurar aula (tente: figma, mentoria)" />
          </div>

          {/* Lista de módulos (sempre expandido aqui, com aulas) */}
          <div style={{ marginTop: 20 }}>
            {cursoUx.modulos.map((m) => (
              <div key={m.id} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 0',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      border: `1.5px solid ${colors.primary}`,
                      display: 'inline-block',
                    }}
                  />
                  {m.title}
                </div>
                {m.id === 'm1' && (
                  <div style={{ paddingLeft: 24 }}>
                    {m.aulas.map((a) => (
                      <div
                        key={a.id}
                        className={`aula-item ${a.id === current.id ? 'active' : ''}`}
                        onClick={() => navigate(`/aula/${a.id}`)}
                      >
                        <span
                          className={`aula-dot ${a.status === 'done' ? 'completed' : ''} ${a.id === current.id ? 'active' : ''}`}
                        >
                          {a.status === 'done' && <CheckOutlined style={{ fontSize: 8 }} />}
                        </span>
                        {a.title}
                      </div>
                    ))}
                  </div>
                )}
                {m.id !== 'm1' && (
                  <div style={{ paddingLeft: 24, color: colors.textSecondary, fontSize: 13 }}>
                    {m.aulas.length} aulas
                  </div>
                )}
              </div>
            ))}
          </div>

        </aside>
      </div>

      {/* S8 — Toast celebrando conclusão, dispara no botão "Marcar como Concluída" */}
      <OfferToast
        show={showMilestone}
        onClose={() => setShowMilestone(false)}
        tag="Continue aprendendo"
        title="Aula concluída. Parabéns."
        description="Você está a 4 aulas de completar o módulo. Considere acelerar com a mentoria 1:1."
        cta="Conhecer mentoria"
        autoDismissMs={10000}
        thumbImage={offerImg.mentoria}
      />
    </AppLayout>
  );
}
