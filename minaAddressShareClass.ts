import * as fs from 'fs/promises';
import * as path from 'path';

export async function getPublicKeyShareClass(key: string): Promise<ShareClass> {
  const foundationAddressesFile = path.join('Mina_Foundation_Addresses.csv');
  const labsAddressesFile = path.join('O1_Labs_Addresses.csv');
  const investorsAddressesFile = path.join('./', 'Investors_Addresses.csv');

  try {
      const foundationAddresses = await fs.readFile(foundationAddressesFile, 'utf8');
      const o1labsAddresses = await fs.readFile(labsAddressesFile, 'utf8');
      const investorsAddresses = await fs.readFile(investorsAddressesFile, 'utf8');

      if (foundationAddresses.includes(key)) {
          return { shareClass: 'NPS', shareOwner: 'MF' };
      } else if (o1labsAddresses.includes(key)) {
          return { shareClass: 'NPS', shareOwner: 'O1' };
      } else if (investorsAddresses.includes(key)) {
          return { shareClass: 'NPS', shareOwner: 'INVEST' };
      } else {
          return { shareClass: 'Common', shareOwner: '' };
      }
  } catch (error) {
      console.error('Error:', error);
      throw error; 
  }
}

export type ShareClass = { shareClass: 'NPS' | 'Common' | 'BURN'; shareOwner: '' | 'MF' | 'O1' | 'INVEST' | 'BURN' };