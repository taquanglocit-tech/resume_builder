import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import ResumeData from '@/helpers/constants/resume-data.json';
import { useActivity } from './activity';
import { useAwards } from './awards';
import { useBasicDetails } from './basic';
import { useEducations } from './education';
import { useExperiences } from './experience';
import { useVoluteeringStore } from './volunteering';

export const useResumeStore = () => {
  return {
    ...ResumeData,
    basics: useBasicDetails((state) => state.values),
    work: useExperiences((state) => state.experiences),
    education: useEducations((state) => state.academics),
    awards: useAwards((state) => state.awards),
    volunteer: useVoluteeringStore((state) => state.volunteeredExps),
    skills: {
      languages: useLanguages((state) => state.values),
      frameworks: useFrameworks((state) => state.values),
      technologies: useTechnologies((state) => state.values),
      libraries: useLibraries((state) => state.values),
      databases: useDatabases((state) => state.values),
      practices: usePractices((state) => state.values),
      tools: useTools((state) => state.values),
    },
    activities: useActivity((state) => state.get()),
  };
};

export const setResumeState = (data: typeof ResumeData) => {
  useBasicDetails.getState().reset(data.basics);
  useLanguages.getState().reset(data.skills.languages);
  useFrameworks.getState().reset(data.skills.frameworks);
  useLibraries.getState().reset(data.skills.libraries);
  useDatabases.getState().reset(data.skills.databases);
  useTechnologies.getState().reset(data.skills.technologies);
  usePractices.getState().reset(data.skills.practices);
  useTools.getState().reset(data.skills.tools);
  useExperiences.getState().reset(data.work);
  useEducations.getState().reset(data.education);
  useVoluteeringStore.getState().reset(data.volunteer);
  useAwards.getState().reset(data.awards);
  useActivity.getState().reset(data.activities);
};

/**
 * @description Reset all the stores
 */
export const resetResumeStore = () => {
  useBasicDetails.getState().reset(ResumeData.basics);
  useLanguages.getState().reset(ResumeData.skills.languages);
  useFrameworks.getState().reset(ResumeData.skills.frameworks);
  useLibraries.getState().reset(ResumeData.skills.libraries);
  useDatabases.getState().reset(ResumeData.skills.databases);
  useTechnologies.getState().reset(ResumeData.skills.technologies);
  usePractices.getState().reset(ResumeData.skills.practices);
  useTools.getState().reset(ResumeData.skills.tools);
  useExperiences.getState().reset(ResumeData.work);
  useEducations.getState().reset(ResumeData.education);
  useVoluteeringStore.getState().reset(ResumeData.volunteer);
  useAwards.getState().reset(ResumeData.awards);
  useActivity.getState().reset(ResumeData.activities);
};
