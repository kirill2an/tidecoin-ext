export interface IAccount {
  id: number;
  privateKey?: string;
  publicKey?: string;
  balance?: number;
  name?: string;
  address?: string;
}