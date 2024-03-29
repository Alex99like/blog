import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Injectable } from "@angular/core"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { Router } from "@angular/router"
import { HttpErrorResponse } from "@angular/common/http"

import { AuthService } from "src/app/auth/services/auth.service"
import { PersistanceService } from "src/app/shared/services/persistance.service"
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.actions"
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return loginSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      console.log('success')
      this.router.navigateByUrl('/')
    })
  ), {
    dispatch: false
  })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
