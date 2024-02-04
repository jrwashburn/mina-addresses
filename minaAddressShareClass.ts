import * as fs from 'fs/promises';
import * as path from 'path';

export class MinaAddresses{
  foundationAddresses: string;
  o1labsAddresses: string;
  investorsAddresses: string;

  private constructor(foundationAddresses: string, o1labsAddresses: string, investorsAddresses: string) {
    this.foundationAddresses = foundationAddresses;
    this.o1labsAddresses = o1labsAddresses;
    this.investorsAddresses = investorsAddresses;
  }

  public static async create(pathToMinaAddresses: string): Promise<MinaAddresses> {
    const foundationAddresses = await fs.readFile(path.join(pathToMinaAddresses, 'Mina_Foundation_Addresses.csv'), 'utf8');
    const o1labsAddresses = await fs.readFile(path.join(pathToMinaAddresses, 'O1_Labs_Addresses.csv'), 'utf8');
    const investorsAddresses = await fs.readFile(path.join(pathToMinaAddresses, 'Investors_Addresses.csv'), 'utf8');
    return new MinaAddresses(foundationAddresses, o1labsAddresses, investorsAddresses);
  }

  public async getPublicKeyShareClass(key: string): Promise<ShareClass> {    
    try {
      if (this.foundationAddresses.includes(key)) {
        return { shareClass: 'NPS', shareOwner: 'MF' };
      } else if (this.o1labsAddresses.includes(key)) {
        return { shareClass: 'NPS', shareOwner: 'O1' };
      } else if (this.investorsAddresses.includes(key)) {
        return { shareClass: 'NPS', shareOwner: 'INVEST' };
      } else {
        return { shareClass: 'Common', shareOwner: '' };
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export type ShareClass = { shareClass: 'NPS' | 'Common' | 'BURN'; shareOwner: '' | 'MF' | 'O1' | 'INVEST' | 'BURN' };