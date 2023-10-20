import { IServiceStatus } from './service.interface';

export const serviceStatus: IServiceStatus[] = [
  'ongoing',
  'running',
  'upcoming',
];

export const serviceSearchableFields = ['title'];

export const serviceFilterableFields = ['status', 'startDate', 'searchTerm'];
