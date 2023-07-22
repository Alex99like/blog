import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PopularTagsService } from "./services/popular-tags.service";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { GetPopularTagsEffect } from "./store/effects/getPopularTags.effect";
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { ErrorMessageModule } from "../error-message/error.message.module";
import { RouterModule } from "@angular/router";
import { LoadingModule } from "../loading/loading.module";

@NgModule({
  imports: [
    CommonModule,
    ErrorMessageModule,
    RouterModule,
    LoadingModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect])
  ],
  providers: [PopularTagsService],
  declarations: [
    PopularTagsComponent
  ],
  exports: [PopularTagsComponent]
})
export class PopularTagsModule {}
