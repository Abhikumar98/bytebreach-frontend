import {
  IAuditorConfirmationStatus,
  IAuditorProfile,
  IAuditorRecommendationProfile,
  IAuditorStatusResponse,
  IBug,
  IBugComment,
  IBugListItem,
  IProject,
  IProjectStatus,
  IProjectSummaryResponse,
  IUserProfile,
} from '@/types';

export const mockAuditorRecommendation: IAuditorRecommendationProfile[] = [
  {
    first_name: 'John asdf',
    last_name: 'Doe',
    auditor_id: 1,
    min_weekly_cost: 1100,
    max_weekly_cost: 2100,
  },
  {
    first_name: 'Johas dfasdfn',
    last_name: 'Doe',
    auditor_id: 1,
    min_weekly_cost: 100,
    max_weekly_cost: 2300,
  },
  {
    first_name: 'Johas dfasd fas dfn',
    last_name: 'Doe',
    auditor_id: 1,
    min_weekly_cost: 100,
    max_weekly_cost: 2020,
  },
  {
    first_name: 'Johasd fasdasn',
    last_name: 'Doe',
    auditor_id: 1,
    min_weekly_cost: 100,
    max_weekly_cost: 2500,
  },
  {
    first_name: 'asdf  ahn',
    last_name: 'Doe',
    auditor_id: 1,
    min_weekly_cost: 100,
    max_weekly_cost: 3200,
  },
];

export const mockUserProfile: IUserProfile = {
  first_name: 'test first_name',
  last_name: 'test last_name',
  company_name: 'test company_name',
  website_url: 'test website_url',
  twitter_url: 'test twitter_url',
  github_url: 'test github_url',
};

export const mockAuditorProfile: IAuditorProfile = {
  first_name: 'test auditor first_name',
  last_name: 'test auditor last_name',
  github_url: 'test auditor github_url',
  sherlock_url: 'test auditor sherlock_url',
  codeareana_url: 'test auditor codeareana_url',
  min_weekly_cost: 10,
  max_weekly_cost: 100,
};

export const mockProjectList: IProject[] = [
  {
    project_id: 123,
    project_title: 'Test 1 project_title',
    code_link: 'Test 1 code_link',
    status: IProjectStatus.AUDITOR_SELECTION,
  },
  {
    project_id: 1234,
    project_title: 'Test 1 project_title audit in progress',
    code_link: 'Test 1 code_link',
    status: IProjectStatus.AUDIT_IN_PROGRESS,
  },
  {
    project_id: 123,
    project_title: 'Test 1 project_title',
    code_link: 'Test 1 code_link',
    status: IProjectStatus.AUDIT_IN_PROGRESS,
  },
  {
    project_id: 123,
    project_title: 'Test 1 project_title',
    code_link: 'Test 1 code_link',
    status: IProjectStatus.PARITAL_PAYMENT,
  },
];

export const mockProjectData: IProject = {
  project_id: 123,
  project_title: 'Test 1 project_title',
  code_link: 'Test 1 code_link',
  status: IProjectStatus.AUDIT_IN_PROGRESS,
};

export const mockClientProjectSummary: IProjectSummaryResponse = {
  project_title: 'test project_title',
  code_link: 'test code_link',
};

export const mockAuditorStatusResponse: IAuditorStatusResponse[] = [
  {
    auditor_id: 1234,
    first_name: 'test first_name',
    last_name: 'test last_name',
    state: IAuditorConfirmationStatus.PENDING,
    quotation_time: 123,
    quotation_cost: 123,
  },
  {
    auditor_id: 1234,
    first_name: 'test first_name',
    last_name: 'test last_name',
    state: IAuditorConfirmationStatus.QUOTATION_SUBMITTED,
    quotation_time: 123,
    quotation_cost: 123,
  },
  {
    auditor_id: 1234,
    first_name: 'test first_name',
    last_name: 'test last_name',
    state: IAuditorConfirmationStatus.QUOTATION_REJECTED,
    quotation_time: 123,
    quotation_cost: 123,
  },
];

export const mockComment: IBugComment = {
  comment_id: 123,
  user_id: 123,
  first_name: 'Gooey',
  last_name: 'Pooey',
  comment: 'test comment is wtf',
  created_at: new Date().toISOString(),
};

export const mockBug: IBug = {
  first_name: 'John',
  last_name: 'Doee',
  bug_id: 12345,
  project_id: 1234,
  title: 'This is weird bug title',
  description: 'test bug description',
  risk_rating: 'low',
  code_section_link: 'test bug code_section_link',
  comments: [mockComment, mockComment, mockComment],
  user_id: 12356,
};

export const mockBugList: IBugListItem[] = [mockBug, mockBug, mockBug, mockBug];
