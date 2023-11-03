import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';
import { ReactNode } from 'react';

export enum AppRoutes {
  Homepage = '/',
  Login = '/login',
  EditPage = '/edit-profile',
  ProjectDetails = '/projects/{project_id}',
}

export interface IAppContextState {
  web3auth: Web3AuthNoModal | null;
  userInfo:
    | (Partial<OpenloginUserInfo> & {
        account?: string;
      })
    | null;
  updateUserInfo: (userInfo: Partial<OpenloginUserInfo> | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
  handleOnboardedUser: (address: string) => void;
  handleLogout: () => Promise<void>;
}

export type AuthOptions = 'google' | 'github' | 'email' | 'wallet';

export type UserType = 'client' | 'auditor';

export interface IClientOnboardingForm {
  fullName: string;
  companyName: string;
  website: string;
  twitter: string;
  github: string;
  inviteCode: string;
}

export interface IAuditorOnboardingForm {
  fullName: string;
  github: string;
  tariff: number;
  twitter: string;
  codearena: string;
  sherlock: string;
  inviteCode: string;
}

export interface INavigationRoute {
  title: string;
  route: string;
  icon: ReactNode;
}

export interface ICreateProjectForm {
  title: string;
  githubLink: string;
  category: string;
  budget: number;
  estimatedStartTime: string;
  totalAuditTime: string;
}

export enum DashboardTabs {
  ClientOngoing = 'client_ongoing',
  ClientDone = 'client_done',
  AuditorRequested = 'auditor_requested',
  AuditorOngoing = 'auditor_ongoing',
  AuditorDone = 'auditor_done',
}
