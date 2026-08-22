import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, List, LayoutGrid, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Subject } from '../types';

interface CalendarViewProps {
  subjects: Subject[];
}

export function CalendarView({ subjects }: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const allEvents = subjects.flatMap(sub => {
    return sub.exams.map(exam => ({
      id: `exam-${exam.id}`,
      title: exam.title,
      date: exam.date,
      type: exam.type || 'exam',
      subjectName: sub.name,
      color: sub.color,
      bgLight: sub.bgLight
    }));
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}`;
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const selectedEvents = selectedDate ? allEvents.filter(e => e.date === selectedDate) : [];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 px-6 pt-12 pb-6 rounded-b-3xl shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agenda</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Fechas importantes de tus materias</p>
          </div>
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'calendar' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {viewMode === 'list' ? (
          allEvents.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">No hay fechas agendadas.</div>
          ) : (
            <div className="space-y-4">
              {allEvents.map(exam => (
                <div key={`${exam.subjectName}-${exam.id}`} className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl ${exam.bgLight} shrink-0`}>
                    <CalendarIcon size={24} className={exam.color.replace('bg-', 'text-')} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{exam.title}</h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-0.5">{exam.subjectName}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      <span className="capitalize">{formatDate(exam.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex justify-between items-center mb-6">
                <button onClick={handlePrevMonth} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <button onClick={handleNextMonth} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
                  <div key={d} className="font-semibold text-xs text-gray-400 py-1">{d}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const date = i + 1;
                  const currentDateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth()+1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                  
                  const dayEvents = allEvents.filter(e => e.date === currentDateStr);
                  const hasEvents = dayEvents.length > 0;
                  const isSelected = selectedDate === currentDateStr;
                  
                  return (
                    <button 
                      key={date} 
                      onClick={() => setSelectedDate(isSelected ? null : currentDateStr)}
                      className={`relative py-2 px-1 rounded-xl border flex flex-col items-center justify-center min-h-[44px] cursor-pointer transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/50 shadow-sm' :
                        hasEvents ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <span className={`text-sm ${hasEvents ? 'font-bold text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{date}</span>
                      {hasEvents && (
                        <div className="flex justify-center mt-1 space-x-1 absolute bottom-1">
                          {dayEvents.slice(0, 3).map((e, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full ${e.color.replace('bg-', 'bg-')}`} />
                          ))}
                          {dayEvents.length > 3 && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Eventos del {formatDate(selectedDate)}
                  </h3>
                  <button onClick={() => setSelectedDate(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <X size={20} />
                  </button>
                </div>
                {selectedEvents.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No hay eventos para este día.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedEvents.map(exam => (
                      <div key={`${exam.subjectName}-${exam.id}`} className="flex items-start space-x-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700">
                        <div className={`p-2 rounded-xl ${exam.bgLight} shrink-0`}>
                          <CalendarIcon size={18} className={exam.color.replace('bg-', 'text-')} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                            {exam.type === 'tp' ? 'Trabajo Práctico' : exam.type === 'parcial' ? 'Parcial' : exam.type === 'recuperatorio' ? 'Recuperatorio' : exam.type === 'es' ? 'Evaluación de Seguimiento' : 'Evento'}
                          </p>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{exam.title}</h4>
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-0.5">{exam.subjectName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
