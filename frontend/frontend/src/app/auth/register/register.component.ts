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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onRegister(form: any): void {
    this.authService.onRegistrar(form.value).subscribe((res) => {
      this.router.navigateByUrl("/auth");
    });
  }
}
