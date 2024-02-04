import * as fs from 'fs/promises';
import * as path from 'path';

export class MinaAddresses{
    foundationAddresses: string;
    o1labsAddresses: string;
    investorsAddresses: string;

    public constructor(pathToMina-Addresses: string){
        this.foundationAddresses = fs.readFile(path.join(pathToMina-Addresses, 'foundationAddresses.txt'), 'utf8');
        this.investorsAddresses = fs.readFile(path.join(pathToMina-Addresses, 'investorsAddresses.txt'), 'utf8');
        this.o1labsAddresses = fs.readFile(path.join(pathToMina-Addresses, 'labsAddresses.txt'), 'utf8');
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

export type ShareClass = { shareClass: 'NPS' | 'Common' | 'BURN'; shareOwner: '' | 'MF' | 'O1' | 'INVEST' | 'BURN' };