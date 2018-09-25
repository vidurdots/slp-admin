import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';


@Injectable()
export class JwtService {
  constructor(private _cookieService: CookieService) {

  }

  getToken(): String {
         return window.localStorage['jwtToken'];
  }

  saveToken(token: string) {
     window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
