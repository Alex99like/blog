import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ErrorComponent } from './components/error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ErrorComponent
  ],
  exports: [
    ErrorComponent
  ]
})
export class ErrorMessageModule {}
