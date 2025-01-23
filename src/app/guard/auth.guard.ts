import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Check if the user is logged in
  if (authService.isLoggedIn()) {
    // Get the required roles for this route
    const requiredRoles = route.data?.['roles'] as string[]; // Ensure roles are defined in the route
    const userRole = authService.getRole();

    // Check if the user has a valid role and permission
    if (userRole && (!requiredRoles || requiredRoles.includes(userRole))) {
      return true; // Allow access if no roles are defined or the role matches
    } else {
      router.navigateByUrl('/unauthorized'); // Redirect to an unauthorized page
      return false;
    }
  } else {
    router.navigateByUrl('/login'); // Redirect to login page if not logged in
    return false;
  }
};
