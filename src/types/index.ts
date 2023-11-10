import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';
import { ReactNode } from 'react';

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
  category: string;
  budget: number;
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

enum IProjectStatus {
  AUDITOR_SELECTION = 1,
  AUDITOR_CONFIRMATION = 2,
  PARITAL_PAYMENT = 3,
  AUDIT_IN_PROGRESS = 4,
  MITIGATION_REVIEW = 5,
  FINAL_PAYMENT = 6,
}

export interface IProject {
  project_id: number;
  project_title: string;
  code_link: string;
  state: IProjectStatus;
}

export type IAuditorProjectStateRequest = 'requested' | 'ongoing' | 'done';

export type IClientProjectStateRequest = 'ongoing' | 'done';

export interface IAuditorQuoteRequest {
  project_id: number;
  quotation_time: number;
  quotation_cost: number;
}

export interface IAuditorRecommendationProfile {
  first_name: string;
  last_name: string;
  auditor_id: number;
}

export interface IGenericResponse {
  success: boolean;
}

export interface IProjectSummaryResponse {
  project_title: string;
  code_link: string;
}

export interface IAuditorStatusResponse {
  name: string;
  auditor_id: number;
  first_name: string;
  last_name: string;
  state: string;
  quotation_time: number;
  quotation_cost: number;
}

export type IBugRiskRating = 'low' | 'medium' | 'high';

export interface IBug {
  bug_id: number;
  project_id: number;
  title: string;
  description: string;
  risk_rating: IBugRiskRating;
  code_section_link: string;
  comments: Comment[];
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
