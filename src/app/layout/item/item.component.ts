import { Component, Input, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import {MatDialog} from '@angular/material';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserService, Errors } from '../../shared/index'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
	  loginForm: FormGroup;
	  @Input()
	  item: any;
    signIIn = false;
	constructor(public dialog: MatDialog,
		private userService: UserService,
		 private toastr: ToastrService
	){
		if(localStorage.getItem('frontEndUser')=='true'){ this.signIIn=true;}
	}
	ngOnInit() {
	
	}
	openDialog() {
		const dialogRef = this.dialog.open(DialogContentExampleDialog);

		dialogRef.afterClosed().subscribe(result => {
		  console.log(`Dialog result: ${result}`);
		});
    }
	usersignout(){
		this.userService.purgeAuth();
		localStorage.clear();
		this.signIIn=false;
		this.toastr.success('Logout Successfully', 'Success!');
		window.location.reload();
	}
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./dialog-content-example-dialog.scss']
})
export class DialogContentExampleDialog {
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
        private userService: UserService,
		 private toastr: ToastrService,
        private _formBuilder: FormBuilder
    )
    {
        
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
	usersignin(){
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
