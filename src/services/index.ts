import axios from 'axios';

import { getRequest, postRequest } from '@/services/config';
import {
  mockAuditorProfile,
  mockAuditorRecommendation,
  mockAuditorStatusResponse,
  mockBug,
  mockBugList,
  mockProjectData,
  mockProjectList,
  mockUserProfile,
} from '@/services/mockData';

import {
  GenericResponse,
  IAuditorProfile,
  IAuditorQuoteRequest,
  IAuditorRecommendationProfile,
  IAuditorStatusResponse,
  IBug,
  IBugListItem,
  ICreateBugRequest,
  IGenericResponse,
  ILoginResponse,
  IProject,
  IProjectCreateRequest,
  IProjectTabStateRequest,
  IUserProfile,
} from '@/types';

const resourceMap = {
  AUTH: '/auth',
  PROJECT: '/project',
  BUG: '/project/bug',
};

export const mockResponse = false;

// auth
const loginURL = `${resourceMap.AUTH}/login-social/`;
const logoutURL = `${resourceMap.AUTH}/logout/`;

// profile
const clientProfileURL = `${resourceMap.AUTH}/client-profile/`;
const auditorProfileURL = `${resourceMap.AUTH}/auditor-profile/`;

// project
const createProjectURL = `${resourceMap.PROJECT}/create/`;
const projectListURL = `${resourceMap.PROJECT}/list/`;

// project details

// auditors quote
const auditorQuoteURL = `${resourceMap.PROJECT}/quote/`;

// bug
const createBugURL = `${resourceMap.BUG}/create/`;
const listBugURL = `${resourceMap.BUG}/list/`;
const bugDetailsURL = `${resourceMap.BUG}/detail/`;
const bugCommentURL = `/comment/`;

const auditorRecommendationURL = `${resourceMap.PROJECT}/auditor-recommendation/`;
const selectedAuditorRecommendationURL = `${resourceMap.PROJECT}/select-recommendation/`;
const auditorStatusURL = `${resourceMap.PROJECT}/auditor-status/`;
const auditorConfirmationURL = `${resourceMap.PROJECT}/auditor-confirmation/`;

export const login = async (
  idToken: string,
  publicKey: string,
  loginType: 'client' | 'auditor'
): Promise<ILoginResponse> => {
  if (mockResponse) {
    return {
      sessionid: 'Token',
      csrftoken: 'csrfToken',
      is_onboarding_done: false,
    };
  }
  const response = await axios<GenericResponse<ILoginResponse>>(
    postRequest(
      loginURL,
      { public_key: publicKey, login_type: loginType },
      idToken
    )
  );

  const { headers } = response;

  console.log({ response });

  console.log({ headers }, headers['Set-Cookie']);

  return response.data.data;
};

export const logout = async (): Promise<IGenericResponse> => {
  if (mockResponse) {
    return {
      success: true,
    };
  }
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(logoutURL, {})
  );

  return response.data.data;
};

export const getClientProfile = async (): Promise<IUserProfile> => {
  if (mockResponse) {
    return mockUserProfile;
  }
  const response = await axios<GenericResponse<IUserProfile>>(
    getRequest(clientProfileURL)
  );

  return response.data.data;
};

export const postClientProfile = async (
  clientProfile: Partial<IUserProfile>
): Promise<IUserProfile> => {
  if (mockResponse) {
    return mockUserProfile;
  }
  const response = await axios<GenericResponse<IUserProfile>>(
    postRequest(clientProfileURL, clientProfile)
  );

  return response.data.data;
};

export const getAuditorProfile = async (): Promise<IAuditorProfile> => {
  if (mockResponse) {
    return mockAuditorProfile;
  }
  const response = await axios<GenericResponse<IAuditorProfile>>(
    getRequest(auditorProfileURL)
  );

  return response.data.data;
};

export const postAuditorProfile = async (
  auditorProfile: Partial<IAuditorProfile>
): Promise<IAuditorProfile> => {
  if (mockResponse) {
    return mockAuditorProfile;
  }
  const response = await axios<GenericResponse<IAuditorProfile>>(
    postRequest(auditorProfileURL, auditorProfile)
  );

  return response.data.data;
};

export const getProjectList = async (
  projectState: IProjectTabStateRequest
): Promise<IProject[]> => {
  if (mockResponse) {
    return mockProjectList;
  }

  const response = await axios<GenericResponse<IProject[]>>(
    getRequest(`${projectListURL}?project_type=${projectState}`)
  );

  return response.data.data;
};

export const postProject = async (
  project: IProjectCreateRequest
): Promise<IProject> => {
  if (mockResponse) {
    return mockProjectData;
  }

  const response = await axios<GenericResponse<IProject>>(
    postRequest(createProjectURL, project)
  );

  return response.data.data;
};

// export const getClientProjectSummary = async (
//   projectId: number
// ): Promise<IProjectSummaryResponse> => {
//   if (mockResponse) {
//     return mockClientProjectSummary;
//   }
//   const response = await axios<GenericResponse<IProjectSummaryResponse>>(
//     getRequest(`${clientProjectDetailsURL}?project_id=${projectId}`)
//   );

//   return response.data.data;
// };

export const postAuditorQuote = async (
  auditorQuoteRequest: IAuditorQuoteRequest
): Promise<IGenericResponse> => {
  if (mockResponse) {
    return {
      success: true,
    };
  }
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(auditorQuoteURL, auditorQuoteRequest)
  );

  return response.data.data;
};

export const getAuditorRecommendation = async (
  projectId: number
): Promise<IAuditorRecommendationProfile[]> => {
  if (mockResponse) {
    return mockAuditorRecommendation;
  }

  const response = await axios<
    GenericResponse<IAuditorRecommendationProfile[]>
  >(getRequest(`${auditorRecommendationURL}?project_id=${projectId}`));

  return response.data.data;
};

export const postSelectRecommendation = async (
  auditorIds: number[],
  projectId: number
): Promise<IGenericResponse> => {
  if (mockResponse) {
    return {
      success: true,
    };
  }
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(selectedAuditorRecommendationURL, {
      auditor_ids: auditorIds,
      project_id: projectId,
    })
  );

  return response.data.data;
};

export const getAuditorStatus = async (
  projectId: number
): Promise<IAuditorStatusResponse[]> => {
  if (mockResponse) {
    return mockAuditorStatusResponse;
  }
  const response = await axios<GenericResponse<IAuditorStatusResponse[]>>(
    getRequest(`${auditorStatusURL}?project_id=${projectId}`)
  );

  return response.data.data;
};

export const postAuditorConfirmation = async (
  projectId: number,
  auditorIds: number[]
): Promise<IGenericResponse> => {
  if (mockResponse) {
    return {
      success: true,
    };
  }
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(auditorConfirmationURL, {
      project_id: projectId,
      auditor_ids: auditorIds,
    })
  );

  return response.data.data;
};

export const postBug = async (bug: ICreateBugRequest): Promise<IBug> => {
  if (mockResponse) {
    return mockBug;
  }
  const response = await axios<GenericResponse<IBug>>(
    postRequest(createBugURL, bug)
  );

  return response.data.data;
};

export const getBugList = async (
  projectId: number
): Promise<IBugListItem[]> => {
  if (mockResponse) {
    return mockBugList;
  }
  const response = await axios<GenericResponse<IBugListItem[]>>(
    getRequest(`${listBugURL}?project_id=${projectId}`)
  );

  return response.data.data;
};

export const getBugDetails = async (bugId: number): Promise<IBug> => {
  if (mockResponse) {
    return mockBug;
  }
  const response = await axios<GenericResponse<IBug>>(
    getRequest(`${bugDetailsURL}?bug_id=${bugId}`)
  );

  return response.data.data;
};

export const postBugComment = async (
  bugId: number,
  comment: string
): Promise<IGenericResponse> => {
  if (mockResponse) {
    return { success: true };
  }
  const response = await axios<GenericResponse<IGenericResponse>>(
    postRequest(bugCommentURL, { bug_id: bugId, comment })
  );

  return response.data.data;
};

export const getProjectDetails = async (
  projectId: string
): Promise<IProject> => {
  if (mockResponse) {
    return mockProjectData;
  }
  const response = await axios<GenericResponse<IProject>>(
    getRequest(`${projectListURL}?project_id=${projectId}`)
  );

  return response.data.data;
};
