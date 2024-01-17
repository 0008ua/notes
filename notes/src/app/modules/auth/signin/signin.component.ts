import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { IIsSignin } from '../auth.interface';
import { SigninDto } from '@workspace/app.workspace';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @Output() isSigninEvent = new EventEmitter<IIsSignin>();
  @ViewChild('signinFormDirective', { static: false })
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);

  signinFormDirective!: FormGroupDirective;
  signinForm: FormGroup<any>;
  inputType: 'password' | 'text' = 'password';

  constructor() {
    this.signinForm = this.formBuilder.group({
      name: [
        '',
        {
          updateOn: 'change',
          validators: [
            Validators.pattern('^[a-zA-Z0-9_-]+$'),
            Validators.minLength(2),
            Validators.maxLength(60),
            Validators.required,
          ],
        },
      ],
      password: [
        '',
        {
          updateOn: 'change',
          validators: [
            Validators.pattern('^[a-zA-Z0-9_-]+$'),
            Validators.minLength(2),
            Validators.maxLength(60),
            Validators.required,
          ],
        },
      ],
    });
  }

  ngOnInit() {}

  switchToSignup(): void {
    this.isSigninEvent.emit({ isSignin: false });
  }

  switchInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  onSignin() {
    console.log('this.signinForm', this.signinForm.value);
    const user: SigninDto = this.signinForm.value;
    // const user: IUser = {
    //   name: this.signinForm.get('name').value,
    //   password: this.signinForm.get('password').value,
    // };
    this.store.dispatch(AuthActions.signin({ user }));
    this.resetForm();
  }

  resetForm() {
    if (this.signinFormDirective) {
      this.signinFormDirective.resetForm();
    }
  }
}
