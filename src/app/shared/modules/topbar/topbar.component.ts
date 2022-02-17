import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CurrentUserInterface } from '../../types/currentUser.interface';
import { isLoggedInSelector, isAnonymousSelector, currentUserSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './topbar.component.html',
  styleUrls: ['topbar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector)) ;
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}