import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { getFeedAction } from '../../store/actions/getFeed.action'
import { Observable, Subscription } from 'rxjs'
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface'
import { errorSelector, feedSelector, isLoadingSelector } from '../../store/selectors'
import { environment } from 'src/environments/environment'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>

  limit = environment.limit
  baseUrl: string
  currentPage: number

  queryParamsSubscription: Subscription

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialValues()
    this.fetchData()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }

  initialValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
    this.baseUrl = this.router.url.split('?')[0]
  }

  initializeListeners() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] ?? 1)
      }
    )
  }

  fetchData() {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }))
  }
}
