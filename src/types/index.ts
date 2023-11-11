import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';
import { ReactNode } from 'react';

import { IOption } from '@/atoms/Select';

export enum AppRoutes {
  Homepage = '/',
  Login = '/login',
  EditPage = '/edit-profile',
  ProjectDetails = '/projects/{projectId}',
  NewBug = '/projects/{projectId}/bugs/new',
  BugDetails = '/projects/{projectId}/bugs/{bugId}',
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
  isClientUser: boolean;
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
  estimatedStartTime: string;
}

export enum DashboardTabs {
  ClientOngoing = 'client_ongoing',
  ClientDone = 'client_done',
  AuditorRequested = 'auditor_requested',
  AuditorOngoing = 'auditor_ongoing',
  AuditorDone = 'auditor_done',
}

export interface ICreateBugForm {
  title: string;
  codeLink: string;
  description: string;
  risk: string;
}

export interface IUserProfile {
  first_name: string;
  last_name: string;
  company_name: string;
  website_url: string;
  twitter_url: string;
  github_url: string;
}

export interface IAuditorProfile {
  first_name: string;
  last_name: string;
  github_url: string;
  sherlock_url: string;
  codeareana_url: string;
  min_weekly_cost: number;
  max_weekly_cost: number;
}

export enum IProjectCategory {
  LIQUID_STAKING = 1,
  DEXES = 2,
  BRIDGE = 3,
  YIELD = 4,
  CDP = 5,
  SERVICES = 6,
  YIELD_AGGREGATOR = 7,
  CROSS_CHAIN = 8,
  RWA = 9,
}

export const projectCategoryMap: IOption[] = [
  {
    value: IProjectCategory.LIQUID_STAKING,
    label: 'Liquid Staking',
  },
  {
    value: IProjectCategory.DEXES,
    label: 'Dexes',
  },
  {
    value: IProjectCategory.BRIDGE,
    label: 'Bridge',
  },
  {
    value: IProjectCategory.YIELD,
    label: 'Yield',
  },
  {
    value: IProjectCategory.CDP,
    label: 'CDP',
  },
  {
    value: IProjectCategory.SERVICES,
    label: 'Services',
  },
  {
    value: IProjectCategory.YIELD_AGGREGATOR,
    label: 'Yield Aggregator',
  },
  {
    value: IProjectCategory.CROSS_CHAIN,
    label: 'Cross Chain',
  },
  {
    value: IProjectCategory.RWA,
    label: 'RWA',
  },
];

export interface IProjectCreateRequest {
  title: string;
  code_link: string;
  category: IProjectCategory;
  min_budget: number;
  max_budget: number;
  start_date: string;
}

export enum IProjectStatus {
  AUDITOR_SELECTION = 1,
  AUDITOR_CONFIRMATION = 2,
  PARITAL_PAYMENT = 3,
  AUDIT_IN_PROGRESS = 4,
  MITIGATION_REVIEW = 5,
  FINAL_PAYMENT = 6,
}

export const projectStatusText = {
  [IProjectStatus.AUDITOR_SELECTION]: 'Auditor Selection',
  [IProjectStatus.AUDITOR_CONFIRMATION]: 'Auditor Confirmation',
  [IProjectStatus.PARITAL_PAYMENT]: 'Partial Payment',
  [IProjectStatus.AUDIT_IN_PROGRESS]: 'Audit in Progress',
  [IProjectStatus.MITIGATION_REVIEW]: 'Mitigation Review',
  [IProjectStatus.FINAL_PAYMENT]: 'Final Payment',
};

export interface IProject {
  project_id: number;
  project_title: string;
  code_link: string;
  status: IProjectStatus;
}

export type IProjectTabStateRequest = 'requested' | 'ongoing' | 'done';

export type IClientProjectStateRequest = 'ongoing' | 'done';

export interface IAuditorQuoteRequest {
  project_id: number;
  quotation_time: number;
  quotation_cost: number;
  quote_action: 'accept' | 'reject';
}

export interface IAuditorRecommendationProfile {
  first_name: string;
  last_name: string;
  auditor_id: number;
  min_weekly_cost: number;
  max_weekly_cost: number;
}

export interface IGenericResponse {
  success: boolean;
}

export interface IProjectSummaryResponse {
  project_title: string;
  code_link: string;
}

export interface IAuditorStatusResponse {
  auditor_id: number;
  first_name: string;
  last_name: string;
  state: string;
  quotation_time: number;
  quotation_cost: number;
}

export type IBugRiskRating = 'low' | 'medium' | 'high';

export interface IBug {
  first_name: string;
  last_name: string;
  bug_id?: number;
  project_id: number;
  title: string;
  description: string;
  risk_rating: IBugRiskRating;
  code_section_link: string;
  comments: Comment[];
  user_id: number;
}

export interface IBugComment {
  comment_id: number;
  comment: string;
  user_id: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export type ICreateBugRequest = Omit<IBug, 'comments' | 'bug_id'>;

export type IBugListItem = Omit<
  IBug,
  'code_section_link' | 'comments' | 'project_id'
>;

export interface GenericResponse<T> {
  data: T;
}
