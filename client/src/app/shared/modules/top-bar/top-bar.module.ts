import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule],
  declarations: [TopBarComponent],
  exports: [TopBarComponent]
})
export class TopBarModule {}
