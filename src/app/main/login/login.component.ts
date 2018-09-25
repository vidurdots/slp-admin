import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, Errors } from '../../shared/index'
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
	email: string;
	password: string;
	errors: Errors = { errors: {} };
    isSubmitting = false;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
		private userService: UserService,
		 private toastr: ToastrService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
	signIn(){
		this.email = this.loginForm.value.email;
		this.password = this.loginForm.value.password;
		this.userService
		  .attemptAuth('login', { email: this.email, password: this.password })
		  .subscribe(
			data => { 
				if (data.hasOwnProperty('errors')==true) {
					this.toastr.error('Email or password is invalid', 'Oops!');
					this.isSubmitting = false;
				}else{
					window.location.href = "/dashboard";
				}

			},
			err => {
			  if (err.errors && err.errors['email or password']) {
				this.toastr.error('Email or password is invalid', 'Oops!');
			  }
			  this.errors = err;
			  this.isSubmitting = false;
			}
		  );
	}
}