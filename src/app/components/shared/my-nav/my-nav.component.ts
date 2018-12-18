import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartControllerService } from 'src/app/services/cart-controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss'],
})
export class MyNavComponent {
  r: string;
  numOfProd: number;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private carSvc: CartControllerService,
    private router: Router,
  ) {
    carSvc.car$.subscribe(data => {
      this.numOfProd = data.length;
    });
    router.events.pipe(map((m: any) => m.url)).subscribe(r => {
      if (r !== undefined) {
        this.r = r;
      }
    });
  }
}
