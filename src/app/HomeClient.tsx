'use client';

import { curriculum } from '@/data/curriculum';

export default function HomeClient() {
  const units = curriculum.units;
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">LEGO Vibe</h1>
      <p className="text-lg mb-6">Learn Python programming with LEGO SPIKE Prime!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((unit) => (
          <div key={unit.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{unit.title}</h3>
            <p className="text-sm text-gray-600">{unit.description}</p>
            <span className="text-xs text-gray-500">{unit.lessons.length} lessons</span>
          </div>
        ))}
      </div>
    </div>
  );
}
