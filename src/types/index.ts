import { Web3AuthNoModal } from '@web3auth/no-modal';

export interface IAppContextState {
  web3auth: Web3AuthNoModal | null;
}

export type AuthOptions = 'google' | 'github' | 'email' | 'wallet';
