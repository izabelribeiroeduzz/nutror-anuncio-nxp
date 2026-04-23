import { Progress } from 'antd';
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
  const hasProgress = typeof course.progress === 'number';

  return (
    <div
      className="course-card"
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
      </div>

      {hasProgress && (
        <div style={{ marginTop: 12 }}>
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
