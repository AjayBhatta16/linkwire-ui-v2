import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { Store } from '@ngrx/store';
import { selectUser } from './state/selectors/user.selector';
import { distinctUntilChanged, map, switchMap } from 'rxjs';
import { detectJSONChanges } from './utils/pipe-utils';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    AppHeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  isLoggedIn$ = this.store
    .select(selectUser)
    .pipe(
      distinctUntilChanged(detectJSONChanges),
      takeUntilDestroyed(this.destroyRef),
      map(user => !!user)
    );

  isLoggedIn = toSignal(this.isLoggedIn$);
}
