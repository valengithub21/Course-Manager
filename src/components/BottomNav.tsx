import React from 'react';
import { Home, Calendar, Award } from 'lucide-react';
import type { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export function BottomNav({ currentView, onChangeView }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'calendar', icon: Calendar, label: 'Agenda' },
    { id: 'passed', icon: Award, label: 'Aprobadas' },
  ] as const;

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-3 flex justify-between items-center pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id || (currentView === 'subject' && item.id === 'home');
        
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id as ViewState)}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-transparent'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
