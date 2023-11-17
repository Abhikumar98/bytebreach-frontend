import { Web3AuthNoModal } from '@web3auth/no-modal';
import { ReactNode } from 'react';

import { IOption } from '@/atoms/Select';
import { TimelineStep } from '@/atoms/Timeline';

export enum AppRoutes {
  Homepage = '/',
  Login = '/login',
  EditPage = '/edit-profile',
  ProjectDetails = '/projects/{projectId}',
  NewBug = '/projects/{projectId}/bugs/new',
  BugDetails = '/projects/{projectId}/bugs/{bugId}',
  AuditorPage = '/auditor/{auditorId}',
}

export interface IAppContextState {
  web3auth: Web3AuthNoModal | null;
  userInfo: IAuditorProfile | IUserProfile | null;
  handleLogout: () => Promise<void>;
  isClientUser: boolean;
  handleFetchUser: (type?: UserType) => Promise<void>;
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
  project_title: string;
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

export const clientProjectStatusText = {
  [IProjectStatus.AUDITOR_SELECTION]: 'Auditor Selection',
  [IProjectStatus.AUDITOR_CONFIRMATION]: 'Auditor Quotation and Confirmation',
  [IProjectStatus.PARITAL_PAYMENT]: 'Partial Payment',
  [IProjectStatus.AUDIT_IN_PROGRESS]: 'Audit in Progress',
  [IProjectStatus.MITIGATION_REVIEW]: 'Mitigation Review',
  [IProjectStatus.FINAL_PAYMENT]: 'Final Payment',
};

export const auditorProjectStatusText = {
  [IProjectStatus.AUDITOR_SELECTION]: 'Client Request',
  [IProjectStatus.AUDITOR_CONFIRMATION]: 'Client Confirmation',
  [IProjectStatus.PARITAL_PAYMENT]: 'Partial Payment',
  [IProjectStatus.AUDIT_IN_PROGRESS]: 'Audit in Progress',
  [IProjectStatus.MITIGATION_REVIEW]: 'Final Report',
  [IProjectStatus.FINAL_PAYMENT]: 'Final Payment',
};

export const clientProjectTimelineSteps: TimelineStep<IProjectStatus>[] = [
  {
    label: 'Auditor Selection',
    value: IProjectStatus.AUDITOR_SELECTION,
  },
  {
    label: 'Auditor Quotation and Confirmation',
    value: IProjectStatus.AUDITOR_CONFIRMATION,
  },
  {
    label: 'Client Confirmation and partial payment',
    value: IProjectStatus.PARITAL_PAYMENT,
  },
  {
    label: 'Audit in Progress',
    value: IProjectStatus.AUDIT_IN_PROGRESS,
  },
  {
    label: 'Audit Ends Mitigation review',
    value: IProjectStatus.MITIGATION_REVIEW,
  },
  {
    label: 'Final Payment',
    value: IProjectStatus.FINAL_PAYMENT,
  },
];

export const auditorProjectTimelineSteps: TimelineStep<IProjectStatus>[] = [
  {
    label: 'Client Request',
    value: IProjectStatus.AUDITOR_SELECTION,
  },
  {
    label: 'Client Confirmation',
    value: IProjectStatus.AUDITOR_CONFIRMATION,
  },
  {
    label: 'Partial Payment',
    value: IProjectStatus.PARITAL_PAYMENT,
  },
  {
    label: 'Audit in Progress',
    value: IProjectStatus.AUDIT_IN_PROGRESS,
  },
  {
    label: 'Mitigation review',
    value: IProjectStatus.MITIGATION_REVIEW,
  },
  {
    label: 'Final Payment',
    value: IProjectStatus.FINAL_PAYMENT,
  },
];

export interface IProject {
  project_id: number;
  project_title: string;
  code_link: string;
  status: IProjectStatus;
}

export type IProjectTabStateRequest = 'requests' | 'ongoing' | 'done';

export type IClientProjectStateRequest = 'ongoing' | 'done';

export interface IAuditorQuoteRequest {
  project_id: number;
  quotation_time: number;
  quotation_amount: number;
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

export enum IAuditorConfirmationStatus {
  PENDING = 1,
  QUOTATION_SUBMITTED = 2,
  QUOTATION_REJECTED = 3,
  CLIENT_ACCEPTED = 4,
  CLIENT_REJECTED = 5,
}

export interface IAuditorStatusResponse {
  auditor_id: number;
  first_name: string;
  last_name: string;
  status: IAuditorConfirmationStatus;
  quotation_time: number;
  quotation_amount: number;
}

export const auditorStatusLabel = {
  [IAuditorConfirmationStatus.PENDING]: 'Pending',
  [IAuditorConfirmationStatus.QUOTATION_SUBMITTED]: 'Quotation Submitted',
  [IAuditorConfirmationStatus.QUOTATION_REJECTED]: 'Quotation Rejected',
  [IAuditorConfirmationStatus.CLIENT_ACCEPTED]: 'Client Accepted',
  [IAuditorConfirmationStatus.CLIENT_REJECTED]: 'Client Rejected',
};

export type IBugRiskRating = 1 | 2 | 3;

export interface IBug {
  first_name: string;
  last_name: string;
  bug_id?: number;
  project_id: number;
  title: string;
  description: string;
  risk_rating: IBugRiskRating;
  code_section_link: string;
  comments: IBugComment[];
  user_id: number;
}

export interface IBugComment {
  comment_id: number;
  comment: string;
  user_id: number;
  first_name: string;
  last_name: string;
  created_at: string;
}

export type ICreateBugRequest = Pick<
  IBug,
  'title' | 'project_id' | 'description' | 'code_section_link' | 'risk_rating'
>;

export type IBugListItem = Omit<
  IBug,
  'code_section_link' | 'comments' | 'project_id'
>;

export interface GenericResponse<T> {
  data: T;
}

export interface ILoginResponse {
  is_onboarding_done: boolean;
  // csrftoken: string;
  // sessionid: string;
}
