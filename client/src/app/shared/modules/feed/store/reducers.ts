import {createReducer, on, Action} from '@ngrx/store'

import {FeedStateInterface} from 'src/app/shared/modules/feed/types/feedState.interface'
import {
  getFeedAction,
  getFeedSuccessAction,
  getFeedFailureAction
} from 'src/app/shared/modules/feed/store/actions/getFeed.action'
import { routerNavigatedAction } from '@ngrx/router-store'

const initialState: FeedStateInterface = {
  data: null,
  isLoading: false,
  error: null
}

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getFeedSuccessAction,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed
    })
  ),
  on(
    getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigatedAction, (): FeedStateInterface => initialState)
)

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action)
}
