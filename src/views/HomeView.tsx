import React from 'react';
import { SubjectIcon } from '../components/SubjectIcon';
import { BookOpen, Bell, Sparkles, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Subject } from '../types';

interface SortableSubjectProps {
  key?: React.Key;
  subject: Subject;
  onSelect: (id: string) => void;
  progress: number;
}

function SortableSubjectItem({ subject, onSelect, progress }: SortableSubjectProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: subject.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-full bg-white dark:bg-gray-800 p-4 rounded-2xl border ${
        isDragging ? 'border-blue-400 shadow-lg ring-2 ring-blue-100 dark:ring-blue-900 scale-[1.02]' : 'border-gray-100 dark:border-gray-700 shadow-sm'
      } flex items-center justify-between hover:shadow-md transition-shadow group`}
    >
      <div 
        className="flex items-center space-x-4 flex-1 cursor-pointer"
        onClick={() => onSelect(subject.id)}
        role="button"
      >
        <div className={`w-12 h-12 rounded-xl ${subject.bgLight} flex items-center justify-center shrink-0`}>
          <SubjectIcon name={subject.icon} className={subject.color.replace('bg-', 'text-')} size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white leading-tight text-left">{subject.name}</h3>
          {subject.professor && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-left">{subject.professor}</p>
          )}
          {subject.schedule && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-left">{subject.schedule}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 shrink-0">
        <div className="relative flex items-center justify-center w-12 h-12">
          <svg className="transform -rotate-90 w-12 h-12">
            <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${subject.color.replace('bg-', 'text-')} transition-all duration-1000 ease-out`}
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-gray-700 dark:text-gray-300">{progress}%</span>
        </div>
        
        <div 
          {...attributes} 
          {...listeners} 
          className="p-2 text-gray-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical size={20} />
        </div>
      </div>
    </div>
  );
}

interface HomeViewProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  subjects: Subject[];
  onSelectSubject: (id: string) => void;
  onReorderSubjects: (reorderedActive: Subject[]) => void;
  userName?: string;
  onChangeName?: (name: string) => void;
}

import { Moon, Sun, Edit2 } from 'lucide-react';

export function HomeView({ subjects, onSelectSubject, onReorderSubjects, isDarkMode, onToggleDarkMode, userName = 'Valen', onChangeName }: HomeViewProps) {
  const activeSubjects = subjects.filter(s => s.status === 'active');

  const nextClass = React.useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday
    const dayMap: Record<string, number> = {
      'domingo': 0, 'lunes': 1, 'martes': 2, 'miércoles': 3, 'miercoles': 3, 'jueves': 4, 'viernes': 5, 'sábado': 6, 'sabado': 6
    };
    
    let closestSub: Subject | null = null;
    let minDiff = 8;
    
    activeSubjects.forEach(sub => {
      if (sub.schedule) {
        const words = sub.schedule.toLowerCase().split(' ');
        const dayWord = words.find(w => dayMap[w] !== undefined);
        if (dayWord) {
          const targetDay = dayMap[dayWord];
          let diff = targetDay - currentDay;
          if (diff <= 0) diff += 7;
          
          if (diff < minDiff) {
            minDiff = diff;
            closestSub = sub;
          }
        }
      }
    });
    
    return closestSub;
  }, [activeSubjects]);

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission === 'granted' : false
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const requestNotifications = async () => {
    if (!('Notification' in window)) {
      alert('Tu navegador no soporta notificaciones.');
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification('¡Notificaciones activadas!', {
          body: 'Te avisaremos de tus próximos parciales y fechas límite.',
          icon: 'https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/bell.svg'
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const calculateProgress = (subject: Subject) => {
    const totalTopics = subject.units.reduce((acc, u) => acc + u.topics.length, 0);
    if (totalTopics === 0) return 0;
    const completedTopics = subject.units.reduce((acc, u) => acc + u.topics.filter(t => t.completed).length, 0);
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = activeSubjects.findIndex(s => s.id === active.id);
      const newIndex = activeSubjects.findIndex(s => s.id === over.id);
      const newOrder = arrayMove(activeSubjects, oldIndex, newIndex);
      onReorderSubjects(newOrder);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-6 pt-12 pb-6 rounded-b-3xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 
                className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:opacity-80 transition-opacity flex items-center group"
                onClick={() => {
                  if (onChangeName) {
                    const newName = prompt('¿Cómo te llamás?', userName);
                    if (newName && newName.trim()) {
                      onChangeName(newName.trim());
                    }
                  }
                }}
                title="Click para cambiar tu nombre"
              >
                Hola, {userName} 👋
                <Edit2 size={16} className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Aquí está tu resumen del cuatrimestre</p>
          </div>
          <button 
            onClick={onToggleDarkMode}
            className="p-2 mr-2 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 relative transition-colors active:scale-95"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={requestNotifications}
            className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 relative transition-colors active:scale-95"
          >
            <Bell size={20} />
            {!notificationsEnabled && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
        </div>

        {/* Quick Stats / AI Insight placeholder */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles size={18} className="text-blue-200" />
            <h3 className="font-semibold text-sm text-blue-50">Siguiente clase</h3>
          </div>
          {nextClass ? (
            <>
              <p className="font-bold text-lg">{nextClass.name}</p>
              <p className="text-blue-100 text-sm">{nextClass.schedule}</p>
            </>
          ) : (
            <p className="font-bold text-lg">Sin clases próximas</p>
          )}
        </div>
      </div>

      {/* Subjects List */}
      <div className="px-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Tus Materias ({activeSubjects.length})</h2>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={activeSubjects.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {activeSubjects.map((subject) => (
                <SortableSubjectItem 
                  key={subject.id} 
                  subject={subject} 
                  onSelect={onSelectSubject} 
                  progress={calculateProgress(subject)} 
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
