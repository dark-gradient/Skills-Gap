import React from 'react';
import { CareerRole } from '../types/career';
import { CareerExplorer } from './CareerExplorer';

interface CareerPageProps {
  selectedRoleId: string | null;
  onSelectRole: (role: CareerRole) => void;
  onNavigateToAssessment?: () => void;
}

export const CareerPage: React.FC<CareerPageProps> = ({
  selectedRoleId,
  onSelectRole,
  onNavigateToAssessment,
}) => {
  return (
    <CareerExplorer
      selectedRoleId={selectedRoleId}
      onSelectCareer={onSelectRole}
      onStartAssessment={(role) => {
        onSelectRole(role);
        if (onNavigateToAssessment) onNavigateToAssessment();
      }}
    />
  );
};
