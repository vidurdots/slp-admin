import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ProfilesComponent} from './profiles/profiles.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventDetailsComponent} from './event-details/event-details.component';
import {EventAddComponent} from './event-add/event-add.component';
import {EventEditComponent} from './event-edit/event-edit.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {FundingComponent} from './funding/funding.component';
import {HealthComponent} from './health/health.component';
import {MyaccountComponent} from './myaccount/myaccount.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import { CommunityComponent } from './community/community.component';
import {MaterialModule} from '../../@fuse/material.module';
import {FuseWidgetModule} from '../../@fuse/components/widget/widget.module';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {SliderComponent} from './slider/slider.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
const routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfilesComponent
    },
    {
        path: 'health',
        component: HealthComponent
    },
	{
        path     : 'community',
        component: CommunityComponent
    }
	,
	{
        path     : 'funding',
        component: FundingComponent
    }
    ,
    {
        path: 'dashboard',
        component: DashboardComponent
    }
    ,
    {
        path: 'event/:slug',
        component: EventListComponent
    }
    ,
    {
        path: 'event-details',
        component: EventDetailsComponent
    },
    {
        path: 'event-add',
        component: EventAddComponent
    }
    ,
    {
        path: 'event-edit',
        component: EventEditComponent
    }
    ,
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'my-account',
        component: MyaccountComponent
    },
	{
        path     : 'contact-us',
        component: ContactUsComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FuseWidgetModule,
        MatMomentDateModule,
        FuseSharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAVVogiMRosXQmgOD1P7tzPXxK55LiByQg'
        })
    ],
    exports: [
        MaterialModule,
        SliderComponent,
        MatMomentDateModule,
        FuseWidgetModule,
        FuseSharedModule
    ],
    declarations: [HomeComponent, ProfilesComponent, DashboardComponent, EventListComponent, EventDetailsComponent, EventAddComponent, EventEditComponent, ChangePasswordComponent, FundingComponent, HealthComponent, MyaccountComponent, SliderComponent, ContactUsComponent, CommunityComponent]
})
export class FrontendModule {
}
