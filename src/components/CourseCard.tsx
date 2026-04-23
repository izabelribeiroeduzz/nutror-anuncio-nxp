import { useState } from 'react';
import { Button, Progress } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DesignBadge from './DesignBadge';
import { colors } from '../theme';

export type Course = {
  id: string;
  title: string;
  modulos: number;
  aulas: number;
  thumb?: 'ux' | 'empty' | 'space';
  progress?: number;
};

type Props = { course: Course; compact?: boolean };

export default function CourseCard({ course, compact }: Props) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const hasProgress = typeof course.progress === 'number';
  const showProgress = hasProgress && hover;

  return (
    <div
      className="course-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/curso/${course.id}`)}
      style={{ width: '100%' }}
    >
      <div
        className={course.thumb === 'ux' ? 'thumb-texture' : 'thumb-placeholder-icon'}
        style={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 10,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {course.thumb === 'ux' && (
          <span
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '-0.2px',
              zIndex: 1,
            }}
          >
            UX Designers
          </span>
        )}
        {course.thumb !== 'ux' && (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5a5a60" strokeWidth="1.4">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="10" r="1.5" />
            <path d="M3 17l5-5 4 4 3-3 6 6" />
          </svg>
        )}

        {/* Overlay Continuar — só no hover, só se tem progresso */}
        {hasProgress && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(11,11,13,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: hover ? 1 : 0,
              transition: 'opacity 0.18s ease',
              pointerEvents: hover ? 'auto' : 'none',
              zIndex: 2,
            }}
          >
            <Button
              type="primary"
              icon={<CaretRightFilled />}
              iconPosition="end"
              style={{ fontWeight: 600, color: '#0B0B0D' }}
            >
              Continuar
            </Button>
          </div>
        )}
      </div>

      {/* Barra de progresso — só no hover */}
      {hasProgress && (
        <div
          style={{
            maxHeight: showProgress ? 48 : 0,
            opacity: showProgress ? 1 : 0,
            overflow: 'hidden',
            transition:
              'max-height 0.22s ease, opacity 0.22s ease, margin-top 0.22s ease',
            marginTop: showProgress ? 12 : 0,
          }}
        >
          <Progress
            percent={course.progress}
            showInfo={false}
            strokeColor={colors.primary}
            trailColor={colors.border}
            className="nutror-progress"
          />
          <div style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>
            {course.progress}% concluído
          </div>
        </div>
      )}

      {!compact && (
        <>
          <div
            style={{
              marginTop: 12,
              color: colors.textPrimary,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '-0.2px',
            }}
          >
            {course.title}
          </div>
          <div style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>
            {course.modulos} Módulos | {course.aulas} Aulas
          </div>
          <div style={{ marginTop: 12 }}>
            <DesignBadge />
          </div>
        </>
      )}

      {compact && (
        <div
          style={{
            marginTop: 12,
            color: colors.textPrimary,
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {course.title}
        </div>
      )}
    </div>
  );
}
