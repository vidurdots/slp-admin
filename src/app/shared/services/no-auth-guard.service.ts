import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
		let isAuth= localStorage.getItem('frontEndUser');
		if (isAuth) {
		  //console.log("YES");
		  this.router.navigate(['/my-account']);
		  return false;
		}
		//console.log("No");
		return true;
    /*return this.userService.isAuthenticated.pipe(take(1), map(isAuth => {
      if(isAuth) this.router.navigateByUrl('/my-account');
      return !isAuth;
    }));*/

  }
}
