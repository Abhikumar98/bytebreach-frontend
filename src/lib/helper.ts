import { toast } from 'react-hot-toast';

import { AppRoutes } from '@/types';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function setInLocalStorage(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const defaultErrorMessage = (error: any) => {
  toast.error(error.message);
  console.error(error);
};

export const isAuthenticatedRoute = (route: string) => {
  const authenticatedRoutes = [
    AppRoutes.EditPage,
    AppRoutes.ProjectDetails,
    AppRoutes.Homepage,
  ];

  const isCurrentAuthenticatedRoutes = authenticatedRoutes.some(
    (authenticatedRoute) => {
      return route.includes(authenticatedRoute);
    }
  );

  return isCurrentAuthenticatedRoutes;
};
