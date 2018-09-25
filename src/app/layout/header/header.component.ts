import {  Component, Input, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import {MatDialog} from '@angular/material';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { UserService, Errors } from '../../shared/index'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   @Input()
    layout = 'vertical';
	topmenu:any=false;
	mainmenu:any=true;
    @Input()
    navigation: any;
	signIIn = false;
    // Private
    private _unsubscribeAll: Subject<any>;
	externalclass:any='';
    /**
     * Constructor
     */
    constructor(
        private _fuseNavigationService: FuseNavigationService,
		public dialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
		if(localStorage.getItem('frontEndUser')=='true'){ this.signIIn=true; this.externalclass='header_login';}
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });
    }
	openGetstarted() {
		const dialogRef = this.dialog.open(SignDialogContentExampleDialog);

		dialogRef.afterClosed().subscribe(result => {
		  console.log(`Dialog result: ${result}`);
		});
    }

}

@Component({
  selector: 'sign-dialog-content-example-dialog',
  templateUrl: 'sign-dialog-content-example-dialog.html',
  styleUrls: ['./sign-dialog-content-example-dialog.scss']
})
export class SignDialogContentExampleDialog {
	loginForm: FormGroup;
	joinForm: FormGroup;
	validator = {
		emailTaken: false
	  };
	checkingEmailValidation: boolean;
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
		this.validate_data();
    }
	checkEmail(){
		this.userService.checkEmailForRegistration(this.joinForm.value.email).subscribe(users => {
			this.validator.emailTaken = (users.length > 0);
			//console.log()
			if(this.validator.emailTaken==true){this.toastr.error('Email already taken', 'Oops!');}
			this.checkingEmailValidation = false;
		  });
	}
	checkEmailOrganisation(){
		this.userService.checkEmailForRegistration(this.loginForm.value.email).subscribe(users => {
			this.validator.emailTaken = (users.length > 0);
			//console.log()
			if(this.validator.emailTaken==true){this.toastr.error('Email already taken', 'Oops!');}
			this.checkingEmailValidation = false;
		  });
	}
	organisation_signup(){
		//if (this.loginForm.invalid!='false'){ return false;}
		this.userService.postUser({"firstname" :this.loginForm.value.name,"user_type" :3,"postalCode":this.loginForm.value.postcode,"credentialProvider" : "EMAIL","email" : this.loginForm.value.email,"username" : this.loginForm.value.email,"password" : this.loginForm.value.password,'website':this.loginForm.value.website,'phone':this.loginForm.value.telephone,'category':this.loginForm.value.categories}).subscribe(users => {
				this.toastr.success('Successfully created user', 'Success!');
				this.blankFormData();
			},
			err => {
					this.toastr.error('Something went wrong', 'Oops!');
			}
	  )
	}
	join_today_signup(){
		//if (this.joinForm.invalid!='false'){ return false;}
		
		this.userService.postUser({"firstname" :this.joinForm.value.name,"user_type" :2,"postalCode":this.joinForm.value.postcode,"credentialProvider" : "EMAIL","email" : this.joinForm.value.email,"username" : this.joinForm.value.email,"password" : this.joinForm.value.password}).subscribe(users => {
				this.toastr.success('Successfully created user', 'Success!');
				this.blankFormData();
			},
			err => {
					this.toastr.error('Something went wrong', 'Oops!');
			}
	  );
	}
	blankFormData(){
	
        this.loginForm = this._formBuilder.group({
            email   : [''],
            password: [''],
            website: [''],
            telephone: [''],
            postcode: [''],
            categories: [''],
			name: ['']
			
        });
		this.joinForm = this._formBuilder.group({
            email   : [''],
            password: [''],
            postcode: [''],
			name: ['']
			
        });
    
	}
	validate_data(){
		 this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            website: ['', Validators.required],
            telephone: ['', Validators.required],
            postcode: ['', Validators.required],
            categories: ['', Validators.required],
			name: ['', Validators.required]
			
        });
		this.joinForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            postcode: ['', Validators.required],
			name: ['', Validators.required]
			
        });
	}
	
}
