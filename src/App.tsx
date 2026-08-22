import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { SubjectView } from './views/SubjectView';
import { CalendarView } from './views/CalendarView';
import { PassedView } from './views/PassedView';
import { initialSubjects } from './data';
import type { ViewState, Subject } from './types';

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem('estudios-data-v22');
      if (saved) {
        const parsed = JSON.parse(saved);
        const migrated = parsed.map((s: Subject) => {
          const initial = initialSubjects.find(i => i.id === s.id);
          return initial ? { ...s, icon: initial.icon, bgLight: initial.bgLight } : s;
        });
        const existingIds = new Set(migrated.map((s: Subject) => s.id));
        const newSubjects = initialSubjects.filter(s => !existingIds.has(s.id));
        return [...migrated, ...newSubjects];
      }
      return initialSubjects;
    } catch (e) {
      return initialSubjects;
    }
  });

  useEffect(() => {
    localStorage.setItem('estudios-data-v22', JSON.stringify(subjects));
  }, [subjects]);

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('estudios-username') || 'Valen';
  });

  useEffect(() => {
    localStorage.setItem('estudios-username', userName);
  }, [userName]);

  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('estudios-theme') === 'dark';
  });
  
  useEffect(() => {
    localStorage.setItem('estudios-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // Sync view state with URL hash for hardware back button support
  useEffect(() => {
    // Forzar que SIEMPRE inicie en el menú principal al abrir la app
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#subject-')) {
        const id = hash.replace('#subject-', '');
        setSelectedSubjectId(id);
        setCurrentView('subject');
      } else {
        setCurrentView('home');
        setSelectedSubjectId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectSubject = (id: string) => {
    window.location.hash = `subject-${id}`;
  };

  const handleReorderSubjects = (reorderedActive: Subject[]) => {
    setSubjects(prev => {
      const passed = prev.filter(s => s.status === 'passed');
      return [...reorderedActive, ...passed];
    });
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const handleMarkAsPassed = (subjectId: string) => {
    setSubjects(prev => prev.map(sub => {
      if (sub.id !== subjectId) return sub;
      return { ...sub, status: 'passed' };
    }));
    handleBackToHome();
  };

  const handleToggleTopic = (subjectId: string, unitId: string, topicId: string) => {
    setSubjects(prev => prev.map(sub => {
      if (sub.id !== subjectId) return sub;
      return {
        ...sub,
        units: sub.units.map(u => {
          if (u.id !== unitId) return u;
          return {
            ...u,
            topics: u.topics.map(t => {
              if (t.id !== topicId) return t;
              return { ...t, completed: !t.completed };
            })
          };
        })
      };
    }));
  };

  const renderView = () => {
    if (currentView === 'subject' && selectedSubjectId) {
      const subject = subjects.find(s => s.id === selectedSubjectId);
      if (subject) {
        return (
          <SubjectView 
            subject={subject} 
            onBack={handleBackToHome} 
            onToggleTopic={(uId, tId) => handleToggleTopic(subject.id, uId, tId)} 
            onMarkAsPassed={() => handleMarkAsPassed(subject.id)}
          />
        );
      }
    }
    
    switch (currentView) {
      case 'home':
        return <HomeView subjects={subjects} onSelectSubject={handleSelectSubject} onReorderSubjects={handleReorderSubjects} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} userName={userName} onChangeName={setUserName} />;
      case 'calendar':
        return <CalendarView subjects={subjects} />;
      case 'passed':
        return <PassedView subjects={subjects} />;
      default:
        return <HomeView subjects={subjects} onSelectSubject={handleSelectSubject} onReorderSubjects={handleReorderSubjects} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} userName={userName} onChangeName={setUserName} />;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-0 sm:p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gray-200 text-gray-900'}`}>
      {/* Mobile Device Frame Simulator for Desktop */}
      <div className={`w-full h-[100dvh] sm:h-[850px] sm:max-w-[390px] sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-[8px] transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-900'}`}>
        
        {/* Dynamic View Area */}
        {renderView()}

        {/* Bottom Navigation */}
        {(currentView === 'home' || currentView === 'calendar' || currentView === 'passed') && (
          <BottomNav 
            currentView={currentView} 
            onChangeView={(v) => {
              window.location.hash = ''; // Clear hash when using bottom nav
              setCurrentView(v);
              if (v !== 'subject') setSelectedSubjectId(null);
            }} 
          />
        )}
      </div>
    </div>
  );
}

