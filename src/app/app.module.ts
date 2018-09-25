import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import 'hammerjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,MatIconModule,MatDividerModule,   MatMenuModule, MatSelectModule, MatTableModule, MatTabsModule } from '@angular/material';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { FrontendModule } from 'app/frontend/frontend.module';
import { LoginComponent } from './main/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { NoAuthGuard } from './shared/services/no-auth-guard.service';
import {SharedModule,HttpTokenInterceptor} from './shared';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider,LinkedinLoginProvider,AuthService} from 'ng4-social-login';
import { ToastrModule, ToastrService } from 'ngx-toastr';
let config = new AuthServiceConfig([],false);
export function provideConfig() {return config;}
const appRoutes: Routes = [
	{
        path     : 'login',
        component: LoginComponent,
		canActivate: [NoAuthGuard]
		
    },
	{
        path     : 'dashboard',
        component: DashboardComponent,
		canActivate: [AuthGuard]
    },
	{
        path      : '**',
        redirectTo: 'sample'
    }
	
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent
    ],
    imports     : [
        BrowserModule,
		CookieModule.forRoot(),
		ToastrModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
		MatDividerModule,   
		MatMenuModule, 
		MatSelectModule, 
		MatTableModule, 
		MatTabsModule,
        
		// Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
		FuseWidgetModule,

        // App modules
        LayoutModule,
        SampleModule,
		FrontendModule,
		SharedModule
    ],
	providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
	AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
	],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
