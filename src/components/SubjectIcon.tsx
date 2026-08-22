import React from 'react';
import { BookOpen, Calculator, Compass, Atom, TerminalSquare, Briefcase, GraduationCap, Network, ShieldCheck, Binary, FunctionSquare, Sigma, Infinity as InfinityIcon } from 'lucide-react';

export function SubjectIcon({ name, ...props }: { name?: string; [key: string]: any }) {
  switch (name) {
    case 'Calculator': return <Calculator {...props} />;
    case 'FunctionSquare': return <FunctionSquare {...props} />;
    case 'Sigma': return <Sigma {...props} />;
    case 'Infinity': return <InfinityIcon {...props} />;
    case 'Compass': return <Compass {...props} />;
    case 'Atom': return <Atom {...props} />;
    case 'TerminalSquare': return <TerminalSquare {...props} />;
    case 'Briefcase': return <Briefcase {...props} />;
    case 'GraduationCap': return <GraduationCap {...props} />;
    case 'Network': return <Network {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'Binary': return <Binary {...props} />;
    default: return <BookOpen {...props} />;
  }
}
