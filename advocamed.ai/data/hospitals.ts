import { Hospital } from '../types';
import hospitalData from './hospitals.json';

// Export the data as a typed array, allowing components to use it seamlessly.
export const hospitals: Hospital[] = hospitalData as Hospital[];
