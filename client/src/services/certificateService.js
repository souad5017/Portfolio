import createResourceService from './resourceService.js';

export const certificateService = createResourceService('/certificates');
export const getCertificates = certificateService.list;