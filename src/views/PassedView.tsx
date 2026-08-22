import React from 'react';
import { Award, CheckCircle } from 'lucide-react';
import type { Subject } from '../types';

interface PassedViewProps {
  subjects: Subject[];
}

export function PassedView({ subjects }: PassedViewProps) {
  const passedSubjects = subjects.filter(s => s.status === 'passed');

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 px-6 pt-12 pb-6 rounded-b-3xl shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Materias Aprobadas</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Tu progreso en la carrera</p>
      </div>

      <div className="px-6">
        {passedSubjects.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">Aún no tienes materias aprobadas.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {passedSubjects.map(subject => (
              <div key={subject.id} className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-full ${subject.bgLight} flex items-center justify-center mb-3 relative`}>
                  <Award size={28} className={subject.color.replace('bg-', 'text-')} />
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">{subject.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
