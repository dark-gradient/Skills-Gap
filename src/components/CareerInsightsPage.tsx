import React from 'react';
import { CareerRole } from '../types/career';
import { CareerDetailView } from './CareerDetailView';
import { Compass, ArrowRight } from 'lucide-react';

interface CareerInsightsPageProps {
  selectedRole: CareerRole | null;
  onSelectRole: (role: CareerRole) => void;
  onNavigateToCareers: () => void;
  onNavigateToLearning?: () => void;
  assessments?: Record<string, number>;
}

export const CareerInsightsPage: React.FC<CareerInsightsPageProps> = ({
  selectedRole,
  onSelectRole,
  onNavigateToCareers,
  onNavigateToLearning,
  assessments = {},
}) => {
  // If no career has been selected yet by the student
  if (!selectedRole) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Title */}
        <div className="border-b border-[#DCE8F5] pb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#172B4D]">
            CAREER INSIGHTS
          </h2>
          <p className="text-sm text-[#687A93] mt-1 font-medium">
            Explore career paths and understand where each one can take you.
          </p>
        </div>

        {/* Empty State Card */}
        <div className="p-8 sm:p-14 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl text-center shadow-[0_4px_24px_rgba(23,43,77,0.04)] max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] text-white flex items-center justify-center mx-auto mb-5 shadow-[0_4px_16px_rgba(77,159,255,0.25)]">
            <Compass className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#172B4D] mb-3">
            Explore career paths and understand where each one can take you.
          </h3>

          <p className="text-xs sm:text-sm text-[#687A93] max-w-md mx-auto mb-8 leading-relaxed font-medium">
            Select a target career to view the comprehensive Career Dossier: day-to-day responsibilities, documented competencies, hiring expectations, and regional compensation benchmarks across India and Japan.
          </p>

          <button
            onClick={onNavigateToCareers}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer"
          >
            <span>EXPLORE CAREERS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // When a student has explicitly selected a career, display the full Career Dossier
  return (
    <div className="space-y-6">
      <CareerDetailView
        role={selectedRole}
        isSelectedByStudent={true}
        onSelectCareer={onSelectRole}
        onBack={onNavigateToCareers}
        onExploreRoleSkills={onNavigateToLearning}
        assessments={assessments}
      />
    </div>
  );
};
