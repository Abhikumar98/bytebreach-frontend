import axios from 'axios';

import { getRequest, postRequest } from '@/services/config';

import {
  GenericResponse,
  IAuditorProjectStateRequest,
  IAuditorQuoteRequest,
  IAuditorRecommendationProfile,
  IBug,
  IBugListItem,
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
const projectListURL = '/list';

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
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(loginURL, { idToken })
  );

  return response.data.data;
};

export const logout = async () => {
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(logoutURL, {})
  );

  return response.data.data;
};

export const getClientProfile = async () => {
  const response = await axios<GenericResponse<IUserProfile>>(
    getRequest(clientProfileURL)
  );

  return response.data.data;
};

export const postClientProfile = async (
  clientProfile: Partial<IUserProfile>
) => {
  const response = await axios<GenericResponse<IUserProfile>>(
    postRequest(clientProfileURL, clientProfile)
  );

  return response.data.data;
};

export const getAuditorProfile = async () => {
  const response = await axios<GenericResponse<IUserProfile>>(
    getRequest(auditorProfileURL)
  );

  return response.data.data;
};

export const postAuditorProfile = async (
  auditorProfile: Partial<IUserProfile>
) => {
  const response = await axios<GenericResponse<IUserProfile>>(
    postRequest(auditorProfileURL, auditorProfile)
  );

  return response.data.data;
};

export const getProjectList = async (
  projectState: IAuditorProjectStateRequest
) => {
  const response = await axios<GenericResponse<IProject[]>>(
    getRequest(`${projectListURL}?project_type=${projectState}`)
  );

  return response.data.data;
};

export const getClientProjectSummary = async (projectId: number) => {
  const response = await axios<GenericResponse<IProjectSummaryResponse>>(
    getRequest(`${clientProjectDetailsURL}?project_id=${projectId}`)
  );

  return response.data.data;
};

export const postAuditorQuoteURL = async (
  auditorQuoteRequest: IAuditorQuoteRequest
) => {
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(auditorQuoteURL, auditorQuoteRequest)
  );

  return response.data.data;
};

export const getAuditorRecommendation = async (projectId: number) => {
  const response = await axios<
    GenericResponse<IAuditorRecommendationProfile[]>
  >(getRequest(`${auditorRecommendationURL}?project_id=${projectId}`));

  return response.data.data;
};

export const getAuditorStatus = async (projectId: number) => {
  const response = await axios<GenericResponse<IAuditorProjectStateRequest>>(
    getRequest(`${auditorStatusURL}?project_id=${projectId}`)
  );

  return response.data.data;
};

export const postAuditorConfirmation = async (projectId: number) => {
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(auditorConfirmationURL, { project_id: projectId })
  );

  return response.data.data;
};

export const postBug = async (bug: ICreateBugRequest) => {
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(createBugURL, bug)
  );

  return response.data.data;
};

export const getBugList = async (projectId: number) => {
  const response = await axios<GenericResponse<IBugListItem[]>>(
    getRequest(`${listBugURL}?project_id=${projectId}`)
  );

  return response.data.data;
};

export const getBugDetails = async (bugId: number) => {
  const response = await axios<GenericResponse<IBug>>(
    getRequest(`${bugDetailsURL}?bug_id=${bugId}`)
  );

  return response.data.data;
};

export const postBugComment = async (bugId: number, comment: string) => {
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(bugCommentURL, { bug_id: bugId, comment })
  );

  return response.data.data;
};
