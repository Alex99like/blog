import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss']
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null

  isLoggedIn$: Observable<boolean | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
  }
}
