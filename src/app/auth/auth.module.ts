import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { AuthService } from "./services/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "./store/effects/register.effect";
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module";
import { PersistenceService } from "../shared/services/persistence.service";
import { LoginComponent } from "./components/login/login.component";
import { LoginEffect } from "./store/effects/login.effect";

const routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes), 
        ReactiveFormsModule, 
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([
            RegisterEffect,
            LoginEffect
          ]),
        BackendErrorMessagesModule
    ],
    declarations: [RegisterComponent, LoginComponent],
    providers: [AuthService, PersistenceService]
})
export class AuthModule {}