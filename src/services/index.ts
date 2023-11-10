import axios from 'axios';

import { getRequest, postRequest } from '@/services/config';

import {
  IAuditorProjectStateRequest,
  IAuditorQuoteRequest,
  IAuditorRecommendationProfile,
  IBug,
  IBugListItem,
  IClientProjectStateRequest,
  ICreateBugRequest,
  IGenericResponse,
  IProject,
  IProjectSummaryResponse,
  IUserProfile,
} from '@/types';

// auth
const loginURL = '/login-social';
const logoutURL = '/logout';

// profile
const clientProfileURL = '/client-profile';
const auditorProfileURL = '/auditor-profile';

// project
const clientProjectListURL = '/client/list';
const auditorProjectListURL = '/auditor/list';

// project details
const clientProjectDetailsURL = '/client/summary';

// auditors quote
const auditorQuoteURL = '/quote';

// bug
const createBugURL = '/bug';
const listBugURL = '/list';
const bugDetailsURL = '/detail';
const bugCommentURL = '/comment';

const auditorRecommendationURL = '/auditor-recommendation';
const auditorStatusURL = '/auditor-status';
const auditorConfirmationURL = '/auditor-confirmation';

export const login = async (idToken: string) => {
  const response = await axios(postRequest(loginURL, { idToken }));

  return response.data;
};

export const logout = async () => {
  const response = await axios(postRequest(logoutURL, {}));

  return response.data;
};

export const getClientProfile = async () => {
  const response = await axios<IUserProfile>(getRequest(clientProfileURL));

  return response.data;
};

export const postClientProfile = async (
  clientProfile: Partial<IUserProfile>
) => {
  const response = await axios<IUserProfile>(
    postRequest(clientProfileURL, clientProfile)
  );

  return response.data;
};

export const getAuditorProfile = async () => {
  const response = await axios<IUserProfile>(getRequest(auditorProfileURL));

  return response.data;
};

export const postAuditorProfile = async (
  auditorProfile: Partial<IUserProfile>
) => {
  const response = await axios<IUserProfile>(
    postRequest(auditorProfileURL, auditorProfile)
  );

  return response.data;
};

export const getClientProjectList = async (
  projectState: IClientProjectStateRequest
) => {
  const response = await axios<IProject[]>(
    getRequest(`${clientProjectListURL}?project_type=${projectState}`)
  );

  return response.data;
};

export const getAuditorProjectList = async (
  projectState: IAuditorProjectStateRequest
) => {
  const response = await axios<IProject[]>(
    getRequest(`${auditorProjectListURL}?project_type=${projectState}`)
  );

  return response.data;
};

export const getClientProjectSummary = async (projectId: number) => {
  const response = await axios<IProjectSummaryResponse>(
    getRequest(`${clientProjectDetailsURL}?project_id=${projectId}`)
  );

  return response.data;
};

export const postAuditorQuoteURL = async (
  auditorQuoteRequest: IAuditorQuoteRequest
) => {
  const response = await axios<IGenericResponse>(
    postRequest(auditorQuoteURL, auditorQuoteRequest)
  );

  return response.data;
};

export const getAuditorRecommendation = async (projectId: number) => {
  const response = await axios<IAuditorRecommendationProfile[]>(
    getRequest(`${auditorRecommendationURL}?project_id=${projectId}`)
  );

  return response.data;
};

export const getAuditorStatus = async (projectId: number) => {
  const response = await axios<IAuditorProjectStateRequest>(
    getRequest(`${auditorStatusURL}?project_id=${projectId}`)
  );

  return response.data;
};

export const postAuditorConfirmation = async (projectId: number) => {
  const response = await axios<IGenericResponse>(
    postRequest(auditorConfirmationURL, { project_id: projectId })
  );

  return response.data;
};

export const postBug = async (bug: ICreateBugRequest) => {
  const response = await axios<IGenericResponse>(
    postRequest(createBugURL, bug)
  );

  return response.data;
};

export const getBugList = async (projectId: number) => {
  const response = await axios<IBugListItem[]>(
    getRequest(`${listBugURL}?project_id=${projectId}`)
  );

  return response.data;
};

export const getBugDetails = async (bugId: number) => {
  const response = await axios<IBug>(
    getRequest(`${bugDetailsURL}?bug_id=${bugId}`)
  );

  return response.data;
};

export const postBugComment = async (bugId: number, comment: string) => {
  const response = await axios<IGenericResponse>(
    postRequest(bugCommentURL, { bug_id: bugId, comment })
  );

  return response.data;
};
