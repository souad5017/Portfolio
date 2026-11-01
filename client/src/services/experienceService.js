import createResourceService from './resourceService.js';

export const experienceService = createResourceService('/experiences');
export const getExperiences = experienceService.list;