import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.actions";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistenceService } from "src/app/shared/services/persistence.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffect {
    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loginAction),
            switchMap(({request}) => {
                return this.authService.login(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        console.log(currentUser);
                        this.persistenceService.set('acessToken', currentUser.token);
                        return loginSuccessAction({currentUser})
                    }),

                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(loginFailureAction({errors: errorResponse.error.errors}))
                    })
                )
            })
        )
    )

    redirectAfterSubmit$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(loginSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/')
                })
            ), 
            {dispatch: false}
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private persistenceService: PersistenceService,
        private router: Router
    ) {}
}