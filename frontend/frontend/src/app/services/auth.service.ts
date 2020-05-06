import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import {
  User
} from '../models/user';
import {
  JwtResponse
} from '../models/jwt-response';
import {
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVICE: string = 'http://localhost:3007';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(public http: HttpClient) {}

  onRegistrar(user: User): Observable < JwtResponse > {
    return this.http.post < JwtResponse > (`${this.AUTH_SERVICE}/register`, user).
    pipe(
      tap(
        (res: JwtResponse) => {
          this.onEstablecerDatosDeUsuario(res);
        }
      )
    );
  }

  onIniciarSesion(user: User): Observable < JwtResponse > {
    return this.http.post < JwtResponse > (`${this.AUTH_SERVICE}/login`, user).
    pipe(
      tap(
        (res: JwtResponse) => {
          this.onEstablecerDatosDeUsuario(res);
        }
      )
    );
  }

  onEstablecerDatosDeUsuario(res: JwtResponse): void {
    if (res) {
      this.onGuardarToken(res.dataUser.accessToken, res.dataUser.expireIn);
    }
  }

  onCerrarSesion(): void {
    this.token = "";
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private onGuardarToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private onGetToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
}
