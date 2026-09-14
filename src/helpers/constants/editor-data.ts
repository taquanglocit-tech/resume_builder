import ActivitiesLayout from '@/modules/builder/editor/modules/activities/ActivitiesLayout';
import AwardsLayout from '@/modules/builder/editor/modules/awards/AwardsLayout';
import BasicLayout from '@/modules/builder/editor/modules/basic/BasicLayout';
import EducationLayout from '@/modules/builder/editor/modules/education/EducationLayout';
import ExperienceLayout from '@/modules/builder/editor/modules/experience/ExperienceLayout';
import { ReactNode } from 'react';
import SkillsLayout from '@/modules/builder/editor/modules/skills/SkillsLayout';
import VolunteeringLayout from '@/modules/builder/editor/modules/volunteering/VolunteeringLayout';

export const headers: {
  [key: string]: { title: string; component: () => ReactNode };
} = {
  'basic-details': { title: 'Thông tin cơ bản', component: BasicLayout },
  'skills-and-expertise': {
    title: 'Kỹ năng',
    component: SkillsLayout,
  },
  education: { title: 'Học vấn', component: EducationLayout },
  experience: { title: 'Kinh nghiệm làm việc', component: ExperienceLayout },
  activities: { title: 'Hoạt động / Dự án', component: ActivitiesLayout },
  volunteering: { title: 'Tình nguyện', component: VolunteeringLayout },
  awards: { title: 'Chứng chỉ / Giải thưởng', component: AwardsLayout },
};
