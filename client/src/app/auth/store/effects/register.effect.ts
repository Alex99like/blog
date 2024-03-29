import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";
import { AuthService } from "src/app/auth/services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/services/persistance.service";


@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(registerSuccessAction),
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

