import { createAction, props } from "@ngrx/store"

import { LoginRequestInterface } from "src/app/auth/types/loginRequest.interface"
import { ActionTypes } from "src/app/auth/store/actionTypes"
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"
import { BackendErrorsInterface } from "src/app/shared/types/backendErrorsInterface"

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
