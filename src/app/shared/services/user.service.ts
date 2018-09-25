import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService, SocialUser } from 'ng4-social-login';


@Injectable()
export class UserService {
  public currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  //localStorage.setItem('checkAdminAuth',false);	
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private socialAuthService: AuthService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) this.socialAuthService.signOut();
    });
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials })
      .pipe(map(
        data => {
		  this.setAuth(data.user);
		  localStorage.setItem('frontEndUser','true');	
          return data;
        }
      ));
  }

  postUser(user) {
    return this.apiService.post('/users', { user: user })
      .pipe(map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user', { user })
      .pipe(map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

  submitSocialUser(socialUser: SocialUser) {
    let user = new User();

    user.firstname = socialUser.name.split(' ')[0];
    user.secondname = socialUser.name.split(' ')[1];
    user.photoUrl = socialUser.photoUrl;
    user.credentialProvider = socialUser.provider;
    user.username = socialUser.id;
    user.email = socialUser.email;
    console.log(socialUser)

    return this.apiService
      .post('/users/social-auth', { user: user })
      .pipe(map(data => {
        // Update the currentUser observable
        if (data.user) {
          this.setAuth(data.user);
          return data;
        } else {
          throw { errors: { 'email': 'is already used' } }
        }
      }));
  }

  checkEmailForRegistration(email: string) {
    return this.apiService
      .get(`/users/check-email?email=${email}`)
      .map(data => data.users)
  }

  sendRecoveryEmail(email) {
    return this.apiService.get(`/users/send-recovery-email/${email}`);
  }

  resetPassword(token, password) {
    return this.apiService.post(`/users/reset-password/${token}`, {
      password: password
    });
  }

  sendEmailVerification(email) {
    return this.apiService.post(`/users/send-email-verification`, {
      email: email
    });
  }

  setEmailVerified(email, token) {
    return this.apiService.post(`/users/email-verified`, {
      email: email,
      token: token
    })
  }
}
