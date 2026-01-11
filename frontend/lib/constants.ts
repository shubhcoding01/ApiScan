export const APP_NAME = 'ApiScan';

export const TEST_RUN_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PASSED: 'PASSED',
} as const;

export const BLUEPRINT_STATUS = {
  PENDING: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
};