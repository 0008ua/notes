import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IIsSignin } from '../auth.interface';

import { AuthService } from '../auth.service';
import { Subject, filter, startWith, switchMap, take, tap } from 'rxjs';
import { SignupDto } from '@workspace/app.workspace';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() isSigninEvent = new EventEmitter<IIsSignin>();
  @ViewChild('signupFormDirective', { static: false })
  signupFormDirective!: FormGroupDirective;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private store = inject(Store);

  signupForm: FormGroup<any>;
  inputType: 'password' | 'text' = 'password';
  formSubmitSubject$ = new Subject<void>();

  constructor() {
    this.signupForm = this.formBuilder.group(
      {
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
        passwordConfirm: [
          '',
          {
            updateOn: 'change',
            validators: [
              Validators.pattern('^[a-zA-Z0-9_\\-]+$'),
              Validators.minLength(2),
              Validators.maxLength(60),
              Validators.required,
            ],
          },
        ],
      },
      { validators: [this.authService.matchPassword] },
    );

    // prevent form submit before async validator completes
    this.formSubmitSubject$
      .pipe(
        tap(() => this.signupForm.markAsDirty()),
        tap((x) => console.log('this.signupForm.status', this.signupForm.status)),

        switchMap(() =>
          this.signupForm.statusChanges.pipe(
            startWith(this.signupForm.status),
            filter((status) => status !== 'PENDING'),
            take(1),
          ),
        ),
        filter((status) => status === 'VALID'),
      )
      .subscribe((validationSuccessful) => this.onSignup());
  }

  ngOnInit() {}

  switchToSignin(): void {
    this.isSigninEvent.emit({ isSignin: true });
  }

  switchInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  resetForm() {
    console.log('this.signupFormDirective', this.signupFormDirective);
    if (this.signupFormDirective) {
      this.signupFormDirective.resetForm();
    }
  }

  onSignup() {
    const user: SignupDto = {
      name: this.signupForm.get('name')?.value,
      password: this.signupForm.get('password')?.value,
    };
    this.store.dispatch(AuthActions.signup({ user }));
    this.resetForm();
  }
}
