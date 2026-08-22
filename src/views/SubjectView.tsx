import React, { useState } from 'react';
import { SubjectIcon } from '../components/SubjectIcon';
import { ArrowLeft, Calendar, CheckCircle2, Circle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import type { Subject } from '../types';

interface SubjectViewProps {
  subject: Subject;
  onBack: () => void;
  onToggleTopic: (unitId: string, topicId: string) => void;
  onMarkAsPassed: () => void;
}

export function SubjectView({ subject, onBack, onToggleTopic, onMarkAsPassed }: SubjectViewProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  };

  const totalTopics = subject.units.reduce((acc, u) => acc + u.topics.length, 0);
  const completedTopics = subject.units.reduce((acc, u) => acc + u.topics.filter(t => t.completed).length, 0);
  const progress = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}`;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 flex flex-col pb-6">
      {/* Hero Header */}
      <div className={`${subject.color} text-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-lg relative shrink-0`}>
        <button 
          onClick={onBack}
          className="absolute top-5 left-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors z-10"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="mt-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
            <SubjectIcon name={subject.icon} size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">Materia Activa</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-2">{subject.name}</h1>
          {subject.schedule && (
            <p className="text-sm font-medium opacity-90 mb-2">{subject.schedule}</p>
          )}
          <div className="flex items-center space-x-3 mt-4">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-8 flex-1">
        {subject.units.length === 0 ? (
           <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl p-6 border border-dashed border-gray-300 dark:border-gray-700 text-center">
             <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
               <SubjectIcon name={subject.icon} className="text-gray-400 dark:text-gray-500" size={24} />
             </div>
             <h4 className="font-semibold text-gray-800 dark:text-gray-200">Programa vacío</h4>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
               Aquí aparecerán las unidades y temas cuando los subas.
             </p>
           </div>
        ) : (
          <div className="space-y-6">
            {subject.units.map(unit => {
              const isExpanded = expandedUnits.has(unit.id);
              const unitCompletedTopics = unit.topics.filter(t => t.completed).length;
              const unitProgress = unit.topics.length === 0 ? 0 : Math.round((unitCompletedTopics / unit.topics.length) * 100);

              return (
                <div key={unit.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all">
                  <button 
                    onClick={() => toggleUnit(unit.id)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{unit.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{unitCompletedTopics} de {unit.topics.length} temas completados ({unitProgress}%)</p>
                    </div>
                    <div className="shrink-0 ml-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-full">
                      {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-4 border-t border-gray-50 dark:border-gray-700 pt-4">
                      {unit.topics.map(topic => (
                        <button
                          key={topic.id}
                          onClick={() => onToggleTopic(unit.id, topic.id)}
                          className="w-full flex items-start space-x-3 text-left group"
                        >
                          <div className="mt-0.5 shrink-0">
                            {topic.completed ? (
                              <CheckCircle2 size={22} className="text-green-500" />
                            ) : (
                              <Circle size={22} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm leading-snug transition-colors ${topic.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200 font-medium'}`}>
                              {topic.title}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
                              <Calendar size={12} className="mr-1" />
                              <span>Para el {formatDate(topic.deadline)}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {subject.units.length > 0 && progress === 100 && subject.status === 'active' && (
          <div className="mt-8 mb-4">
            <button
              onClick={onMarkAsPassed}
              className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-sm transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle2 size={24} />
              <span>Marcar materia como completada</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
