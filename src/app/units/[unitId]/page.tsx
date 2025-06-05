import { curriculum } from '@/data/curriculum';
import UnitPageClient from './UnitPageClient';

// Generate static params for all units
export async function generateStaticParams() {
  return curriculum.units.map((unit) => ({
    unitId: unit.id,
  }));
}

interface UnitPageProps {
  params: Promise<{
    unitId: string;
  }>;
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { unitId } = await params;

  return <UnitPageClient unitId={unitId} />;
}