import createResourceService from './resourceService.js';

export const technologyService = createResourceService('/technologies');
export const getTechnologies = technologyService.list;