import createResourceService from './resourceService.js';

export const skillService = createResourceService('/skills');
export const getSkills = skillService.list;