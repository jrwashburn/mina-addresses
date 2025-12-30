import * as fs from 'fs/promises';
import * as path from 'path';

export class MinaAddresses {
  foundationAddresses: Set<string>;
  o1labsAddresses: Set<string>;
  investorsAddresses: Set<string>;

  private constructor(foundationAddresses: Set<string>, o1labsAddresses: Set<string>, investorsAddresses: Set<string>) {
    this.foundationAddresses = foundationAddresses;
    this.o1labsAddresses = o1labsAddresses;
    this.investorsAddresses = investorsAddresses;
  }

  public static async create(pathToMinaAddresses: string): Promise<MinaAddresses> {
    const foundationContent = await fs.readFile(path.join(pathToMinaAddresses, 'Mina_Foundation_Addresses.csv'), 'utf8');
    const o1labsContent = await fs.readFile(path.join(pathToMinaAddresses, 'O1_Labs_Addresses.csv'), 'utf8');
    const investorsContent = await fs.readFile(path.join(pathToMinaAddresses, 'Investors_Addresses.csv'), 'utf8');

    const foundationAddresses = new Set(foundationContent.split('\n').map(addr => addr.trim()).filter(addr => addr.length > 0));
    const o1labsAddresses = new Set(o1labsContent.split('\n').map(addr => addr.trim()).filter(addr => addr.length > 0));
    const investorsAddresses = new Set(investorsContent.split('\n').map(addr => addr.trim()).filter(addr => addr.length > 0));

    return new MinaAddresses(foundationAddresses, o1labsAddresses, investorsAddresses);
  }

  public async getPublicKeyShareClass(key: string): Promise<ShareClass> {
    try {
      if (this.foundationAddresses.has(key)) {
        return { shareClass: 'NPS', shareOwner: 'MF' };
      } else if (this.o1labsAddresses.has(key)) {
        return { shareClass: 'NPS', shareOwner: 'O1' };
      } else if (this.investorsAddresses.has(key)) {
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