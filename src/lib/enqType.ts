import { EnqType } from './types';

// Mock data for development - replace with actual API calls
let enqTypes: EnqType[] = [
  { id: '1', name: 'General Inquiry', description: 'General questions about services' },
  { id: '2', name: 'Technical Support', description: 'Technical issues and support' },
  { id: '3', name: 'Billing', description: 'Billing and payment questions' },
];

export const getEnqTypes = async (): Promise<EnqType[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return enqTypes;
};

export const addEnqType = async (enqType: Omit<EnqType, 'id'>): Promise<EnqType> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newEnqType: EnqType = {
    ...enqType,
    id: Date.now().toString(),
  };
  enqTypes.push(newEnqType);
  return newEnqType;
};

export const updateEnqType = async (id: string, enqType: Partial<EnqType>): Promise<EnqType> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = enqTypes.findIndex(et => et.id === id);
  if (index === -1) {
    throw new Error('Enquiry type not found');
  }
  enqTypes[index] = { ...enqTypes[index], ...enqType };
  return enqTypes[index];
};

export const deleteEnqType = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  enqTypes = enqTypes.filter(et => et.id !== id);
};
