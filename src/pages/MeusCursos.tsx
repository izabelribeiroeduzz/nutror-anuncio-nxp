import { Row, Col, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AppLayout from '../components/AppLayout';
import CourseCard from '../components/CourseCard';
import { OfferDynamicRetarget } from '../components/AdSlotV2';
import { SHOW_ADS } from '../config';
import { offerImg } from '../data/offerImages';
import { colors } from '../theme';

function SelectField({ placeholder }: { placeholder: string }) {
  return (
    <Select
      placeholder={placeholder}
      suffixIcon={<DownOutlined style={{ color: colors.textSecondary, fontSize: 10 }} />}
      style={{ width: 220 }}
      dropdownStyle={{ background: colors.bgElevated }}
      variant="outlined"
      options={[
        { value: 'recent', label: 'Mais recentes' },
        { value: 'alpha', label: 'A-Z' },
      ]}
    />
  );
}

export default function MeusCursos() {
  return (
    <AppLayout>
      <div
        className="container"
        style={{
          paddingTop: 'var(--section-y)',
          paddingBottom: 'calc(var(--section-y) * 1.5)',
        }}
      >
        {/* Header único: título + Ver Todos (esq) + Exibir por + Filtrar por (dir) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: colors.textPrimary,
              }}
            >
              Meus Cursos
            </h1>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: colors.textSecondary,
              }}
            >
              Ver Todos
            </h3>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <SelectField placeholder="Exibir por" />
            <SelectField placeholder="Filtrar por" />
          </div>
        </div>

        {/* Grid */}
        <Row gutter={[24, 32]}>
          {/* V3 — Retargeting dinâmico: aula exata que o aluno parou */}
          {SHOW_ADS && (
            <Col xs={24} sm={12} md={8} lg={6}>
              <OfferDynamicRetarget
                lessonTitle="Teste de usabilidade — Aula 3: Roteiro e métricas"
                lessonModule="Pesquisa · UX Designers"
                watchedSeconds={312}
                totalSeconds={864}
                cta="Continuar"
                thumbImage={offerImg.cursoUxAvancado}
              />
            </Col>
          )}
          <Col xs={24} sm={12} md={8} lg={6}>
            <CourseCard
              course={{
                id: 'ux',
                title: 'UX Designers',
                modulos: 2,
                aulas: 7,
                thumb: 'ux',
                progress: 14,
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
        </Row>
      </div>
    </AppLayout>
  );
}
