import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { RouterModule, Routes } from "@angular/router";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { BannerModule } from "../shared/modules/banner/banner.module";
import { PopularTagsModule } from "../shared/modules/popular-tags/popular-tags.module";
import { FeedToggleModule } from "../shared/modules/feed-toggler/feed-toggler.module";

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FeedModule,
    PopularTagsModule,
    BannerModule,
    FeedToggleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GlobalFeedComponent,
  ]
})
export class GlobalFeedModule {}
