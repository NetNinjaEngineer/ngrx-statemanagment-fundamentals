import { NgModule } from "@angular/core";
import { SharedLoadingSpinnerComponent } from "./components/shared-loading-spinner/shared-loading-spinner.component";
import { CommonModule } from "@angular/common";
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';
import { StoreModule } from "@ngrx/store";
import { sharedFeatureKey } from "./store/shared.selectors";
import { sharedReducer } from "./store/shared.reducer";

@NgModule({
    declarations: [
        SharedLoadingSpinnerComponent,
        ErrorPopupComponent
    ],
    exports: [
        SharedLoadingSpinnerComponent,
        CommonModule,
        ErrorPopupComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('shared', sharedReducer)
    ]
})
export class SharedModule {

}