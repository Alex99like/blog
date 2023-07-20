import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { RouterModule, Routes } from "@angular/router";
import { FeedModule } from "../shared/modules/feed/feed.module";

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
    RouterModule.forChild(routes)
  ],
  declarations: [
    GlobalFeedComponent,
  ]
})
export class GlobalFeedModule {}
