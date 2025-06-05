import { curriculum } from '@/data/curriculum';
import LessonPageClient from './LessonPageClient';

// Generate static params for all unit-lesson combinations
export async function generateStaticParams() {
  const params: { unitId: string; lessonId: string }[] = [];
  
  curriculum.units.forEach((unit) => {
    unit.lessons.forEach((lesson) => {
      params.push({
        unitId: unit.id,
        lessonId: lesson.id,
      });
    });
  });
  
  return params;
}

interface LessonPageProps {
  params: Promise<{
    unitId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { unitId, lessonId } = await params;

  return <LessonPageClient unitId={unitId} lessonId={lessonId} />;
}
