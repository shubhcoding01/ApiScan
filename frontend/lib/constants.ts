// export const APP_NAME = 'ApiScan';

// export const TEST_RUN_STATUS = {
//   PENDING: 'PENDING',
//   RUNNING: 'RUNNING',
//   COMPLETED: 'COMPLETED',
//   FAILED: 'FAILED',
//   PASSED: 'PASSED',
// } as const;

// export const BLUEPRINT_STATUS = {
//   PENDING: 'PENDING_APPROVAL',
//   APPROVED: 'APPROVED',
//   REJECTED: 'REJECTED',
// } as const;

// export const ROUTES = {
//   LOGIN: '/login',
//   DASHBOARD: '/dashboard',
//   PROJECTS: '/projects',
// };

export const APP_NAME = 'ApiScan';

export const TEST_RUN_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PASSED: 'PASSED',
} as const;

export const BLUEPRINT_STATUS = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/auth/dashboard',

  PROJECTS: '/auth/projects',
  PROJECT_DETAILS: (projectId: string) =>
    `/auth/projects/${projectId}`,

  PROJECT_SPECS: (projectId: string) =>
    `/auth/projects/${projectId}/specs`,

  PROJECT_BLUEPRINTS: (projectId: string) =>
    `/auth/projects/${projectId}/blueprints`,

  PROJECT_TEST_RUNS: (projectId: string) =>
    `/auth/projects/${projectId}/test-runs`,
};
