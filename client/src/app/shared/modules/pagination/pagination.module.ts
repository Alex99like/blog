import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { UtilsService } from "../../services/utils.service";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PaginationComponent],
  providers: [UtilsService],
  exports: [PaginationComponent]
})
export class PaginationModule {}
