import { Hospital } from '../types';
// CRITICAL FIX: Use strict relative path (./) to avoid alias resolution issues in Vite/Browser.
import hospitalData from './hospitals.json';

// Export the data as a typed array
export const hospitals: Hospital[] = hospitalData as Hospital[];
