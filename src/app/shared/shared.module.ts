import { NgModule } from "@angular/core";
import { SharedLoadingSpinnerComponent } from "./components/shared-loading-spinner/shared-loading-spinner.component";
import { CommonModule } from "@angular/common";
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';

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
    imports: [CommonModule]
})
export class SharedModule {

}