import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {

  }

  onLogin(form: any): void {
    this.authService.onIniciarSesion(form.value).subscribe((res) => {
      this.router.navigateByUrl("/auth");
    });
  }
}
