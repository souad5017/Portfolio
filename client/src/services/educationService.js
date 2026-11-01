import createResourceService from './resourceService.js';

export const educationService = createResourceService('/education');
export const getEducation = educationService.list;