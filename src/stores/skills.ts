import { create } from 'zustand';
import { GetState, SetState } from './store.interface';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { ISkillItem, ISkillState } from './skill.interface';
import resumeData from '@/helpers/constants/resume-data.json';

const addSkill =
  (set: SetState<ISkillState>) =>
  ({ name, level }: ISkillItem) =>
    set(
      produce((state: ISkillState) => {
        state.values.push({ name, level });
      })
    );

const removeSkill = (set: SetState<ISkillState>) => (index: number) =>
  set(
    produce((state: ISkillState) => {
      state.values.splice(index, 1);
    })
  );

const editSkill =
  (set: SetState<ISkillState>) =>
  ({ name, level, index }: { name: string; level: number; index: number }) =>
    set(
      produce((state: ISkillState) => {
        state.values[index] = { name, level: level };
      })
    );

const setSkills = (set: SetState<ISkillState>) => (values: ISkillItem[]) => set(() => ({ values }));

const getSkills = (get: GetState<ISkillState>) => () => (get().isEnabled ? get().values : []);

const setIsEnabled = (set: SetState<ISkillState>) => (isEnabled: boolean) =>
  set(() => ({ isEnabled }));

const getMethods = (set: SetState<ISkillState>, get: GetState<ISkillState>) => ({
  get: getSkills(get),
  add: addSkill(set),
  remove: removeSkill(set),
  edit: editSkill(set),
  reset: setSkills(set),
  setIsEnabled: setIsEnabled(set),
});

export const useLanguages = create<ISkillState>()(
  persist(
    (set, get) => ({
      title: 'Ngoại ngữ / Chứng chỉ',
      hasLevel: true,
      values: resumeData.skills.languages,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: 'languages' }
  )
);

export const useFrameworks = create<ISkillState>()(
  persist(
    (set, get) => ({
      title: 'Kỹ năng chuyên môn',
      hasLevel: true,
      values: resumeData.skills.frameworks,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: 'frameworks' }
  )
);

export const useTechnologies = create<ISkillState>()(
  persist(
    (set, get) => ({
      title: 'Kỹ năng mềm',
      hasLevel: false,
      values: resumeData.skills.technologies,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: 'technologies' }
  )
);

export const useLibraries = create<ISkillState>()(
  persist(
    (set, get) => ({
      title: 'Kiến thức bổ trợ',
      hasLevel: false,
      values: resumeData.skills.libraries,
      isEnabled: false,

      ...getMethods(set, get),
    }),
    { name: 'libraries' }
  )
);

export const useDatabases = create<ISkillState>()(
  persist(
    (set, get) => ({
      title: 'Hệ thống & Dữ liệu',
      hasLevel: false,
      values: resumeData.skills.databases,
      isEnabled: false,

      ...getMethods(set, get),
    }),
    { name: 'databases' }
  )
);

export const usePractices = create<ISkillState>()(
  persist(
    (set, get) => ({
      title: 'Quy trình & Phương pháp',
      hasLevel: false,
      values: resumeData.skills.practices,
      isEnabled: false,

      ...getMethods(set, get),
    }),
    { name: 'practices' }
  )
);

export const useTools = create<ISkillState>()(
  persist(
    (set, get) => ({
      title: 'Phần mềm & Công cụ',
      hasLevel: false,
      values: resumeData.skills.tools,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: 'tools' }
  )
);
