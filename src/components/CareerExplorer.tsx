import React, { useState } from 'react';
import { CAREER_ROLES } from '../data/careerData';
import { CareerRole } from '../types/career';
import { CareerDetailView } from './CareerDetailView';
import {
  Sparkles,
  Server,
  Workflow,
  Cpu,
  Microscope,
  Eye,
  MessageSquare,
  Terminal,
  Database,
  Briefcase,
  ShieldCheck,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CareerExplorerProps {
  selectedRoleId: string | null;
  onSelectCareer: (role: CareerRole) => void;
  onStartAssessment?: (role: CareerRole) => void;
  initialRoleToView?: CareerRole | null;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({
  selectedRoleId,
  onSelectCareer,
  onStartAssessment,
  initialRoleToView = null,
}) => {
  const [activeRole, setActiveRole] = useState<CareerRole | null>(initialRoleToView);
  const [isZoomingId, setIsZoomingId] = useState<string | null>(null);

  const getRoleIcon = (roleId: string) => {
    switch (roleId) {
      case 'genai_llm_engineer':
        return Sparkles;
      case 'mlops_engineer':
        return Server;
      case 'agentic_ai_engineer':
        return Workflow;
      case 'ml_engineer':
        return Cpu;
      case 'ai_research_scientist':
        return Microscope;
      case 'computer_vision_engineer':
        return Eye;
      case 'nlp_engineer':
        return MessageSquare;
      case 'prompt_engineer':
        return Terminal;
      case 'data_scientist':
        return Database;
      case 'ai_product_manager':
        return Briefcase;
      case 'ai_qa_engineer':
        return ShieldCheck;
      case 'data_analyst_ai':
        return BarChart3;
      default:
        return Sparkles;
    }
  };

  const getAccentColors = (colorAccent: string) => {
    switch (colorAccent) {
      case 'blue':
        return {
          iconBg: 'bg-[#EAF4FF] text-[#4D9FFF] group-hover:bg-[#4D9FFF] group-hover:text-white',
          tag: 'bg-[#EAF4FF] text-[#4D9FFF]',
          borderHover: 'hover:border-[#4D9FFF]/60 hover:shadow-[0_8px_30px_rgba(77,159,255,0.12)]',
          line: 'bg-[#4D9FFF]',
        };
      case 'purple':
        return {
          iconBg: 'bg-[#F2EFFF] text-[#8B7CFF] group-hover:bg-[#8B7CFF] group-hover:text-white',
          tag: 'bg-[#F2EFFF] text-[#8B7CFF]',
          borderHover: 'hover:border-[#8B7CFF]/60 hover:shadow-[0_8px_30px_rgba(139,124,255,0.12)]',
          line: 'bg-[#8B7CFF]',
        };
      case 'cyan':
        return {
          iconBg: 'bg-[#E8F9FD] text-[#49C7E8] group-hover:bg-[#49C7E8] group-hover:text-white',
          tag: 'bg-[#E8F9FD] text-[#009CBF]',
          borderHover: 'hover:border-[#49C7E8]/60 hover:shadow-[0_8px_30px_rgba(73,199,232,0.12)]',
          line: 'bg-[#49C7E8]',
        };
      case 'coral':
        return {
          iconBg: 'bg-[#FFF0ED] text-[#FF8A72] group-hover:bg-[#FF8A72] group-hover:text-white',
          tag: 'bg-[#FFF0ED] text-[#FF8A72]',
          borderHover: 'hover:border-[#FF8A72]/60 hover:shadow-[0_8px_30px_rgba(255,138,114,0.12)]',
          line: 'bg-[#FF8A72]',
        };
      case 'yellow':
        return {
          iconBg: 'bg-[#FFF9E6] text-[#D9A514] group-hover:bg-[#FFD166] group-hover:text-[#172B4D]',
          tag: 'bg-[#FFF9E6] text-[#D9A514]',
          borderHover: 'hover:border-[#FFD166]/70 hover:shadow-[0_8px_30px_rgba(255,209,102,0.15)]',
          line: 'bg-[#FFD166]',
        };
      case 'indigo':
        return {
          iconBg: 'bg-[#ECEEFE] text-[#5C67DE] group-hover:bg-[#5C67DE] group-hover:text-white',
          tag: 'bg-[#ECEEFE] text-[#5C67DE]',
          borderHover: 'hover:border-[#5C67DE]/60 hover:shadow-[0_8px_30px_rgba(92,103,222,0.12)]',
          line: 'bg-[#5C67DE]',
        };
      case 'teal':
        return {
          iconBg: 'bg-[#E6F9F7] text-[#20B2AA] group-hover:bg-[#20B2AA] group-hover:text-white',
          tag: 'bg-[#E6F9F7] text-[#20B2AA]',
          borderHover: 'hover:border-[#20B2AA]/60 hover:shadow-[0_8px_30px_rgba(32,178,170,0.12)]',
          line: 'bg-[#20B2AA]',
        };
      default:
        return {
          iconBg: 'bg-[#EAF4FF] text-[#4D9FFF] group-hover:bg-[#4D9FFF] group-hover:text-white',
          tag: 'bg-[#EAF4FF] text-[#4D9FFF]',
          borderHover: 'hover:border-[#4D9FFF]/60 hover:shadow-[0_8px_30px_rgba(77,159,255,0.12)]',
          line: 'bg-[#4D9FFF]',
        };
    }
  };

  const handleCardClick = (role: CareerRole) => {
    setIsZoomingId(role.id);
    setTimeout(() => {
      setActiveRole(role);
      setIsZoomingId(null);
    }, 450);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {activeRole ? (
          <CareerDetailView
            key="detail"
            role={activeRole}
            isSelectedByStudent={selectedRoleId === activeRole.id}
            onSelectCareer={onSelectCareer}
            onStartAssessment={onStartAssessment}
            onBack={() => setActiveRole(null)}
          />
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header Stage */}
            <div className="border-b border-[#DCE8F5] pb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172B4D]">
                Find the career you want to build toward.
              </h2>
              <p className="text-sm text-[#687A93] mt-1.5 font-medium max-w-3xl leading-relaxed">
                Explore today's AI career paths, understand what each role expects, and see where your skills could take you. Click any role to inspect detailed responsibilities, expectations, and verified compensation data.
              </p>
            </div>

            {/* 3-Column Career Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAREER_ROLES.map((role) => {
                const IconComponent = getRoleIcon(role.id);
                const accent = getAccentColors(role.colorAccent);
                const isSelected = selectedRoleId === role.id;
                const isZoomingThis = isZoomingId === role.id;
                const isOtherZooming = isZoomingId !== null && !isZoomingThis;

                return (
                  <motion.div
                    key={role.id}
                    onClick={() => handleCardClick(role)}
                    animate={
                      isZoomingThis
                        ? { scale: 1.05, opacity: 1, zIndex: 30 }
                        : isOtherZooming
                        ? { scale: 0.95, opacity: 0.25 }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative p-6 bg-[#FFFFFF] border rounded-3xl cursor-pointer transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-[0_2px_12px_rgba(23,43,77,0.03)] hover:-translate-y-1 ${
                      isSelected
                        ? 'border-[#4D9FFF] ring-2 ring-[#4D9FFF]/30 shadow-[0_8px_24px_rgba(77,159,255,0.15)]'
                        : `border-[#DCE8F5] ${accent.borderHover}`
                    }`}
                  >
                    {/* Top Identity Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${accent.line}`} />

                    <div>
                      {/* Top Symbol & Category */}
                      <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-xs ${accent.iconBg}`}
                        >
                          <IconComponent className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${accent.tag}`}
                        >
                          {role.categoryLabel}
                        </span>
                      </div>

                      {/* Role Name */}
                      <h3 className="text-lg font-extrabold text-[#172B4D] group-hover:text-[#4D9FFF] transition-colors leading-snug mb-2">
                        {role.title}
                      </h3>

                      <p className="text-xs text-[#687A93] font-medium leading-relaxed line-clamp-2 mb-4">
                        {role.shortSummary}
                      </p>
                    </div>

                    {/* Bottom Action Affordance */}
                    <div className="pt-3 border-t border-[#DCE8F5] flex items-center justify-between text-xs">
                      <span className="font-bold text-[#687A93] group-hover:text-[#4D9FFF] transition-colors">
                        Explore Role Profile
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#F6FAFF] group-hover:bg-[#4D9FFF] group-hover:text-white text-[#687A93] flex items-center justify-center transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
