import { Button, Row, Col, Carousel } from 'antd';
import AppLayout from '../components/AppLayout';
import CourseCard from '../components/CourseCard';
import { OfferCard } from '../components/AdSlot';
import { OfferCarouselRow } from '../components/AdSlotV2';
import { SHOW_ADS } from '../config';
import { offerImg } from '../data/offerImages';
import { colors } from '../theme';

type HeroSlide = {
  id: string;
  image: string;
  title: string;
  description: string;
  cta: string;
};

// O produtor cadastra 1-3 slides. Fora do modo ads, mostra só o 1º (sem carrossel).
const heroSlides: HeroSlide[] = [
  {
    id: 'curso',
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=70',
    title: 'Oferta teste para curso nutror',
    description:
      'Oferta teste para curso nutrorOferta teste para curso nutrorOferta teste para curso nutrorOferta teste para curso nutrorOferta teste para',
    cta: 'Adquira já',
  },
  {
    id: 'mentoria',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=70',
    title: 'Mentoria 1:1 com Designers da Eduzz',
    description:
      '4 sessões individuais para revisar seu portfólio, projetos e ajudar no próximo passo de carreira.',
    cta: 'Reservar vaga',
  },
  {
    id: 'workshop',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=70',
    title: 'Workshop ao vivo: Pesquisa com usuários reais',
    description:
      'Dia 28 de abril, 19h. Vagas limitadas para alunos da Nutror. Conduza seu primeiro teste com confiança.',
    cta: 'Inscrever-se',
  },
];

function HeroSlideView({ slide }: { slide: HeroSlide }) {
  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `url(${slide.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-banner-inner container">
        <div className="hero-banner-content">
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              lineHeight: 1.15,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-1px',
            }}
          >
            {slide.title}
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: 14,
              lineHeight: 1.6,
              color: colors.textSecondary,
              maxWidth: 520,
            }}
          >
            {slide.description}
          </p>
          <Button
            ghost
            size="large"
            style={{
              marginTop: 28,
              borderColor: '#fff',
              color: '#fff',
              fontWeight: 600,
              height: 44,
              padding: '0 28px',
            }}
          >
            {slide.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 16,
        marginBottom: 24,
      }}
    >
      <h2
        style={{
          margin: 0,
          color: colors.textPrimary,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.3px',
        }}
      >
        {title}
      </h2>
      {action}
    </div>
  );
}

export default function Resumo() {
  return (
    <AppLayout noFooter>
      {/* HERO — carrossel (SHOW_ADS) / slide único (limpo) */}
      {SHOW_ADS ? (
        <Carousel autoplay autoplaySpeed={6000} className="hero-carousel" dots>
          {heroSlides.map((slide) => (
            <div key={slide.id}>
              <HeroSlideView slide={slide} />
            </div>
          ))}
        </Carousel>
      ) : (
        <HeroSlideView slide={heroSlides[0]} />
      )}

      {/* Continue Aprendendo */}
      <section className="container section-y-lg">
        <SectionHeader title="Continue Aprendendo" />
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CourseCard
              compact
              course={{ id: 'ux', title: 'UX Designers', modulos: 2, aulas: 7, thumb: 'ux' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CourseCard
              compact
              course={{ id: 'ws', title: 'Workshops', modulos: 2, aulas: 2, thumb: 'empty' }}
            />
          </Col>
        </Row>
      </section>

      {/* Meus Cursos */}
      <section className="container section-y-lg">
        <SectionHeader
          title="Meus Cursos"
          action={<a className="link-underline">Ver todos</a>}
        />
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CourseCard
              course={{
                id: 'ux',
                title: 'UX Designers',
                modulos: 2,
                aulas: 7,
                thumb: 'ux',
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CourseCard
              course={{
                id: 'ws',
                title: 'Workshops',
                modulos: 2,
                aulas: 2,
                thumb: 'empty',
              }}
            />
          </Col>
          {/* S13 — Oferta do produtor como último card do grid Meus Cursos (home) */}
          {SHOW_ADS && (
            <Col xs={24} sm={12} md={8} lg={6}>
              <OfferCard
                tag="Próximo passo"
                title="Pesquisa Avançada em UX"
                description="Recomendado para quem já fez UX Designers"
                cta="Ver curso"
                thumbImage={offerImg.cursoUxAvancado}
              />
            </Col>
          )}
        </Row>
      </section>

      {/* V5 — Carrossel de pílulas do próximo curso (substitui a antiga OfferInline) */}
      {SHOW_ADS && (
        <section className="container section-y-lg">
          <OfferCarouselRow
            tag="Recomendados para você"
            title="Pílulas do próximo curso — Pesquisa Avançada em UX"
            subtitle="Arraste para ver todos os módulos · cada pílula é uma aula completa gratuita"
            items={[
              {
                id: 'p1',
                title: 'Entrevista em profundidade',
                subtitle: 'Aula bônus · liberada',
                duration: '14 min',
                thumbImage: offerImg.lessonEntrevista,
              },
              {
                id: 'p2',
                title: 'Análise temática de respostas',
                subtitle: 'Módulo 2',
                duration: '22 min',
                thumbImage: offerImg.lessonAnalise,
              },
              {
                id: 'p3',
                title: 'Figma para prototipagem',
                subtitle: 'Módulo 3',
                duration: '18 min',
                thumbImage: offerImg.lessonFigma,
              },
              {
                id: 'p4',
                title: 'Montando seu portfólio de UX',
                subtitle: 'Módulo 4',
                duration: '26 min',
                thumbImage: offerImg.lessonPortfolio,
              },
              {
                id: 'p5',
                title: 'Workshop: pesquisa quantitativa',
                subtitle: 'Bônus',
                duration: '38 min',
                thumbImage: offerImg.workshopPesquisa,
              },
              {
                id: 'p6',
                title: 'Mentoria 1:1 com a produtora',
                subtitle: 'Upgrade',
                duration: '4 sessões',
                thumbImage: offerImg.mentoria,
              },
            ]}
          />
        </section>
      )}

      {/* Workshops */}
      <section className="container section-y-lg">
        <SectionHeader
          title="Workshops"
          action={<a className="link-underline">Ver curso</a>}
        />
        <Row gutter={[16, 16]}>
          {[1, 2].map((i) => (
            <Col xs={12} sm={8} md={6} lg={4} key={i}>
              <div
                className="thumb-space"
                style={{
                  width: '100%',
                  aspectRatio: '9/16',
                  borderRadius: 10,
                }}
              />
            </Col>
          ))}
        </Row>
      </section>

      {/* UX Designers */}
      <section className="container section-y-lg">
        <SectionHeader
          title="UX Designers"
          action={<a className="link-underline">Ver curso</a>}
        />
        <Row gutter={[16, 16]}>
          {[1, 2, 3].map((i) => (
            <Col xs={12} sm={8} md={6} lg={4} key={i}>
              <div
                className="thumb-texture"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: 10,
                }}
              />
            </Col>
          ))}
        </Row>
      </section>

      <div style={{ paddingBottom: 64 }} />
    </AppLayout>
  );
}
