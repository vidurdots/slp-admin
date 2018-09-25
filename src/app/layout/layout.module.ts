import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent,SignDialogContentExampleDialog } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ItemComponent,DialogContentExampleDialog } from './item/item.component';
import { FuseNavigationModule } from '@fuse/components';
import {
    MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
    MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
    MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
		RouterModule,
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
    	MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
		FuseNavigationModule
  ],
   exports     : [
        HeaderComponent,
		FooterComponent,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
		FuseNavigationModule,
		SignupComponent,
		DialogContentExampleDialog,
		SignDialogContentExampleDialog,
		ItemComponent
		
		
    ],
  declarations: [SignupComponent,HeaderComponent, FooterComponent,DialogContentExampleDialog,SignDialogContentExampleDialog, ItemComponent],
   entryComponents: [
        DialogContentExampleDialog,
		SignDialogContentExampleDialog
    ]
})
export class LayoutModule { }
