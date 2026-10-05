import React from 'react';
import { CareerRole } from '../types/career';
import { INDUSTRY_COMPENSATION_CONTEXT } from '../data/careerData';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ExternalLink,
  Layers,
  MapPin,
  Sparkles,
  TrendingUp,
  DollarSign,
  BookOpen,
  Briefcase,
  Award,
  Globe,
  ShieldCheck,
  Building,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface CareerDetailViewProps {
  role: CareerRole;
  isSelectedByStudent: boolean;
  onSelectCareer: (role: CareerRole) => void;
  onStartAssessment?: (role: CareerRole) => void;
  onExploreRoleSkills?: () => void;
  onSelectSkill?: (comp: CareerRole['documentedCompetencies'][0]) => void;
  assessments?: Record<string, number>;
  onBack: () => void;
}

export const CareerDetailView: React.FC<CareerDetailViewProps> = ({
  role,
  isSelectedByStudent,
  onSelectCareer,
  onStartAssessment,
  onExploreRoleSkills,
  onSelectSkill,
  assessments = {},
  onBack,
}) => {
  const roleSpecificSkills = role.documentedCompetencies.filter(
    (c) => c.classification === 'ROLE_SPECIFIC'
  );
  const foundationalSkills = role.documentedCompetencies.filter(
    (c) => c.classification === 'FOUNDATIONAL'
  );
  const supportingSkills = role.documentedCompetencies.filter(
    (c) => c.classification === 'SUPPORTING' || c.classification === 'SPECIALIZED'
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 max-w-5xl mx-auto pb-20"
    >
      {/* 1. Top Navigation & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE8F5]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#687A93] hover:text-[#4D9FFF] transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Careers</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectCareer(role)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isSelectedByStudent
                ? 'bg-[#EAF4FF] text-[#347DD9] border border-[#4D9FFF]/30'
                : 'bg-white hover:bg-[#F2F7FC] text-[#172B4D] border border-[#DCE8F5]'
            }`}
          >
            {isSelectedByStudent ? (
              <>
                <Check className="w-4 h-4 text-[#4D9FFF]" />
                <span>Selected as Active Goal</span>
              </>
            ) : (
              <span>Select as My Goal</span>
            )}
          </button>

          {onStartAssessment && (
            <button
              onClick={() => {
                onSelectCareer(role);
                onStartAssessment(role);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer"
            >
              <span>Start Skill Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Hero Dossier Header */}
      <div className="p-8 sm:p-10 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_4px_24px_rgba(23,43,77,0.04)] relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#4D9FFF] bg-[#EAF4FF] px-3 py-1 rounded-md">
              {role.categoryLabel}
            </span>
            <span className="text-[11px] font-semibold text-[#687A93]">
              Domain: {role.primaryDomain}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#172B4D] mb-3">
            {role.title}
          </h1>

          <p className="text-sm sm:text-base text-[#687A93] max-w-3xl leading-relaxed font-medium">
            {role.shortSummary}
          </p>
        </div>
      </div>

      {/* 3. AT A GLANCE */}
      <div className="p-7 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-5">
        <div className="border-b border-[#DCE8F5] pb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D9FFF] block mb-0.5">
            Overview
          </span>
          <h2 className="text-base font-extrabold text-[#172B4D]">
            AT A GLANCE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#172B4D]">
          <div className="space-y-3">
            <div>
              <span className="font-bold text-[#687A93] block mb-1">What This Role Does:</span>
              <p className="font-medium leading-relaxed">{role.atAGlance.whatItDoes}</p>
            </div>
            <div>
              <span className="font-bold text-[#687A93] block mb-1">Ecosystem Placement:</span>
              <p className="font-medium leading-relaxed">{role.atAGlance.ecosystemPosition}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-bold text-[#687A93] block mb-1.5">What It Works With:</span>
              <div className="flex flex-wrap gap-1.5">
                {role.atAGlance.whatItWorksWith.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#F6FAFF] border border-[#DCE8F5] rounded-lg font-bold text-[#172B4D]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-[#687A93] block mb-1.5">Key Focus Areas:</span>
              <div className="flex flex-wrap gap-1.5">
                {role.atAGlance.keyFocusAreas.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#EAF4FF] text-[#347DD9] rounded-lg font-semibold text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WHAT YOU'LL WORK ON & WHAT EMPLOYERS EXPECT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Responsibilities */}
        <div className="p-7 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
          <div className="border-b border-[#DCE8F5] pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#49C7E8]">
              <Layers className="w-4 h-4" />
              <span>WHAT YOU'LL WORK ON</span>
            </div>
            <p className="text-[11px] text-[#687A93] mt-0.5 font-medium">
              Source-supported responsibilities from research.
            </p>
          </div>

          <div className="space-y-3">
            {role.responsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-[#172B4D] font-medium leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#49C7E8] mt-1.5 shrink-0" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Employers Expect */}
        <div className="p-7 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
          <div className="border-b border-[#DCE8F5] pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B7CFF]">
              <CheckCircle2 className="w-4 h-4" />
              <span>WHAT EMPLOYERS EXPECT</span>
            </div>
            <p className="text-[11px] text-[#687A93] mt-0.5 font-medium">
              Demonstrated competencies documented by industry hiring benchmarks.
            </p>
          </div>

          <div className="space-y-3">
            {role.whatEmployersExpect.map((exp, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-[#172B4D] font-medium leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] mt-1.5 shrink-0" />
                <span>{exp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. WHAT THE RESEARCH SAYS THE WORK LOOKS LIKE */}
      <div className="p-7 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
        <div className="border-b border-[#DCE8F5] pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4D9FFF]">
            <Clock className="w-4 h-4" />
            <span>{role.workCycle.title.toUpperCase()}</span>
          </div>
          <p className="text-xs text-[#687A93] mt-0.5 font-medium">
            {role.workCycle.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {role.workCycle.stepsOrFocus.map((step, idx) => (
            <div key={idx} className="p-3.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-1">
              <span className="text-[10px] font-black text-[#4D9FFF] font-mono">
                {idx + 1}
              </span>
              <p className="text-xs text-[#172B4D] font-semibold leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CORE SKILLS (ROLE-SPECIFIC VS FOUNDATIONAL) */}
      <div className="p-7 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-6">
        <div className="border-b border-[#DCE8F5] pb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D9FFF] block mb-0.5">
            Documented Competency Architecture
          </span>
          <h2 className="text-base font-extrabold text-[#172B4D]">
            DOCUMENTED SKILLS & COMPETENCIES
          </h2>
          <p className="text-xs text-[#687A93] mt-0.5 font-medium">
            Distinguishing what this role specifically involves from broader AI foundations that support it.
          </p>
        </div>

        {/* Role-Specific Competencies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-[#172B4D]">
              Role-Specific Competencies
            </span>
            <span className="text-[10px] font-bold text-[#4D9FFF] bg-[#EAF4FF] px-2 py-0.5 rounded">
              Direct Role Requirement
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roleSpecificSkills.map((comp) => {
              const currentLvl = assessments[comp.id] || 0;
              return (
                <div
                  key={comp.id}
                  onClick={() => {
                    if (onSelectSkill) onSelectSkill(comp);
                    else if (onExploreRoleSkills) onExploreRoleSkills();
                  }}
                  className="p-4 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-2 hover:border-[#4D9FFF] hover:bg-[#EAF4FF]/40 transition-all cursor-pointer shadow-2xs group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#172B4D]">
                      <span className="group-hover:text-[#4D9FFF] transition-colors">{comp.name}</span>
                      <span className="text-[10px] font-extrabold text-[#4D9FFF] uppercase">
                        {comp.importance}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#687A93] font-medium leading-relaxed">
                      {comp.whyItMatters}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DCE8F5]/80 flex items-center justify-between text-[11px]">
                    <span className="text-[#687A93]">
                      Your confidence: <strong className="text-[#172B4D]">{currentLvl > 0 ? `Level ${currentLvl}` : 'Not assessed'}</strong>
                    </span>
                    <span className="text-[#4D9FFF] font-bold group-hover:underline inline-flex items-center gap-1">
                      Click to explore →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Foundational Skills */}
        {foundationalSkills.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-[#DCE8F5]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#172B4D]">
                Foundational Skills
              </span>
              <span className="text-[10px] font-bold text-[#687A93] bg-[#F2F7FC] px-2 py-0.5 rounded">
                Foundational Skill
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {foundationalSkills.map((comp) => {
                const currentLvl = assessments[comp.id] || 0;
                return (
                  <div
                    key={comp.id}
                    onClick={() => {
                      if (onSelectSkill) onSelectSkill(comp);
                      else if (onExploreRoleSkills) onExploreRoleSkills();
                    }}
                    className="p-4 bg-white border border-[#DCE8F5] rounded-2xl space-y-2 hover:border-[#4D9FFF] hover:bg-[#F6FAFF] transition-all cursor-pointer shadow-2xs group flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#172B4D]">
                        <span className="group-hover:text-[#4D9FFF] transition-colors">{comp.name}</span>
                        <span className="text-[10px] font-extrabold text-[#687A93] uppercase">
                          Foundational
                        </span>
                      </div>
                      <p className="text-[11px] text-[#687A93] font-medium leading-relaxed">
                        {comp.whyItMatters}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DCE8F5]/80 flex items-center justify-between text-[11px]">
                      <span className="text-[#687A93]">
                        Your confidence: <strong className="text-[#172B4D]">{currentLvl > 0 ? `Level ${currentLvl}` : 'Not assessed'}</strong>
                      </span>
                      <span className="text-[#4D9FFF] font-bold group-hover:underline inline-flex items-center gap-1">
                        Click to explore →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 7. CAREER ENVIRONMENT & SOFT SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Working Environment */}
        <div className="p-7 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
          <div className="border-b border-[#DCE8F5] pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF8A72]">
              <Building className="w-4 h-4" />
              <span>CAREER ENVIRONMENT</span>
            </div>
            <p className="text-[11px] text-[#687A93] mt-0.5 font-medium">
              Where and how this work typically happens.
            </p>
          </div>

          <p className="text-xs text-[#172B4D] font-medium leading-relaxed">
            {role.careerEnvironment.summary}
          </p>

          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-bold uppercase text-[#687A93]">Common Workplaces:</span>
            <div className="flex flex-wrap gap-1.5">
              {role.careerEnvironment.workplaces.map((wp, i) => (
                <span key={i} className="px-2.5 py-1 bg-[#F6FAFF] border border-[#DCE8F5] text-xs font-bold rounded-lg text-[#172B4D]">
                  {wp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills & Working Style */}
        <div className="p-7 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
          <div className="border-b border-[#DCE8F5] pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#42C98A]">
              <ShieldCheck className="w-4 h-4" />
              <span>SOFT SKILLS & WORKING STYLE</span>
            </div>
            <p className="text-[11px] text-[#687A93] mt-0.5 font-medium">
              Non-programming competencies documented by the research.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-[#172B4D]">
            {role.softSkills.stakeholderManagement && (
              <div className="space-y-0.5">
                <strong className="text-[#347DD9] block">Stakeholder Management:</strong>
                <p className="text-[#687A93] font-medium leading-relaxed">{role.softSkills.stakeholderManagement}</p>
              </div>
            )}
            {role.softSkills.explainingProbabilisticAI && (
              <div className="space-y-0.5">
                <strong className="text-[#347DD9] block">Explaining Probabilistic AI:</strong>
                <p className="text-[#687A93] font-medium leading-relaxed">{role.softSkills.explainingProbabilisticAI}</p>
              </div>
            )}
            {role.softSkills.securityAwareness && (
              <div className="space-y-0.5">
                <strong className="text-[#347DD9] block">Security & Privacy Awareness:</strong>
                <p className="text-[#687A93] font-medium leading-relaxed">{role.softSkills.securityAwareness}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 8. INDIA VS JAPAN (VISUAL COMPARISON) */}
      <div className="p-7 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-6">
        <div className="border-b border-[#DCE8F5] pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4D9FFF]">
            <Globe className="w-4 h-4" />
            <span>REGIONAL WORK CONTEXT: INDIA VS JAPAN</span>
          </div>
          <p className="text-xs text-[#687A93] mt-0.5 font-medium">
            Comparing ecosystem dynamics and organizational cultures documented by research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* India Card */}
          <div className="p-6 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-4">
            <div className="border-b border-[#DCE8F5] pb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4D9FFF] block">
                {role.indiaContext.tagline}
              </span>
              <h3 className="text-base font-black text-[#172B4D]">INDIA ECOSYSTEM</h3>
            </div>

            <p className="text-xs text-[#172B4D] font-medium leading-relaxed">
              {role.indiaContext.marketEcosystem}
            </p>

            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold text-[#687A93] uppercase">Industry Demand:</span>
              <p className="text-xs text-[#687A93] font-medium">{role.indiaContext.industryAdoption}</p>
            </div>

            {/* India Salary Range Bars */}
            {role.indiaCompensation && (
              <div className="pt-2 border-t border-[#DCE8F5] space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#4D9FFF] block">
                  Annual CTC Benchmarks (INR)
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-[#172B4D]">
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Fresher</span>
                    <strong className="font-mono">{role.indiaCompensation.fresher}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Mid-Level</span>
                    <strong className="font-mono text-[#347DD9]">{role.indiaCompensation.midLevel}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Senior</span>
                    <strong className="font-mono text-[#8B7CFF]">{role.indiaCompensation.senior}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Premium Ceiling</span>
                    <strong className="font-mono text-[#42C98A]">{role.indiaCompensation.premiumCeiling}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Japan Card */}
          <div className="p-6 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-4">
            <div className="border-b border-[#DCE8F5] pb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8B7CFF] block">
                {role.japanContext.tagline}
              </span>
              <h3 className="text-base font-black text-[#172B4D]">JAPAN ECOSYSTEM</h3>
            </div>

            <p className="text-xs text-[#172B4D] font-medium leading-relaxed">
              {role.japanContext.marketEcosystem}
            </p>

            {/* Cultural Concepts */}
            <div className="space-y-2 pt-1 text-xs">
              <div>
                <strong className="text-[#8B7CFF]">Nemawashi: </strong>
                <span className="text-[#687A93] font-medium">{role.japanContext.culturalConcepts.nemawashi}</span>
              </div>
              <div>
                <strong className="text-[#8B7CFF]">Ringi: </strong>
                <span className="text-[#687A93] font-medium">{role.japanContext.culturalConcepts.ringi}</span>
              </div>
              <div>
                <strong className="text-[#8B7CFF]">Language & Talent: </strong>
                <span className="text-[#687A93] font-medium">{role.japanContext.culturalConcepts.languageAndForeignTalent}</span>
              </div>
            </div>

            {/* Japan Salary */}
            <div className="pt-2 border-t border-[#DCE8F5]">
              <span className="text-[10px] font-bold uppercase text-[#8B7CFF] block mb-1">
                Base Salary Benchmarks (JPY)
              </span>
              {role.japanCompensation ? (
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-[#172B4D]">
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Entry</span>
                    <strong className="font-mono">{role.japanCompensation.entry}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Mid</span>
                    <strong className="font-mono text-[#347DD9]">{role.japanCompensation.mid}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Senior</span>
                    <strong className="font-mono text-[#8B7CFF]">{role.japanCompensation.senior}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#DCE8F5]">
                    <span className="text-[10px] text-[#687A93] block">Top Tech</span>
                    <strong className="font-mono text-[#42C98A]">{role.japanCompensation.topTech}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-white border border-dashed border-[#DCE8F5] rounded-xl text-xs text-[#687A93] text-center font-medium">
                  Role-specific compensation data is not provided in the current research.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 9. IS THIS CAREER FOR YOU? (REFLECTIVE PROMPTS) */}
      <div className="p-7 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
        <div className="border-b border-[#DCE8F5] pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF8A72]">
            <HelpCircle className="w-4 h-4" />
            <span>IS THIS CAREER FOR YOU?</span>
          </div>
          <p className="text-xs text-[#687A93] mt-0.5 font-medium">
            Reflective prompts based on the documented characteristics of this work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {role.isThisCareerForYou.map((q, idx) => (
            <div key={idx} className="p-4 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF8A72] mt-1.5 shrink-0" />
              <p className="text-xs font-bold text-[#172B4D] leading-relaxed">
                "{q}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 10. BOTTOM ACTION BANNER: READY TO SEE WHAT YOU NEED TO LEARN? */}
      <div
        onClick={() => {
          onSelectCareer(role);
          if (onExploreRoleSkills) onExploreRoleSkills();
          else if (onStartAssessment) onStartAssessment(role);
        }}
        className="p-8 sm:p-10 bg-gradient-to-r from-[#EAF4FF] via-white to-[#F2EFFF] border border-[#4D9FFF]/40 hover:border-[#4D9FFF] rounded-3xl text-center space-y-4 shadow-[0_8px_32px_rgba(77,159,255,0.12)] cursor-pointer group transition-all"
      >
        <span className="text-xs font-black uppercase tracking-widest text-[#4D9FFF] bg-white px-3 py-1 rounded-md border border-[#DCE8F5] inline-block shadow-2xs">
          READY TO SEE WHAT YOU NEED TO LEARN?
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] group-hover:text-[#347DD9] transition-colors">
          Explore the skills behind this career and compare them with your current experience.
        </h2>

        <p className="text-xs sm:text-sm text-[#687A93] max-w-xl mx-auto font-medium leading-relaxed">
          See which competencies you already have, identify your immediate gaps, and generate your personalized project-first learning roadmap for {role.title}.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#4D9FFF] group-hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)]">
            <span>EXPLORE ROLE SKILLS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
