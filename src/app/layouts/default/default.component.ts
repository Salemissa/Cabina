import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { LoaderService } from 'src/app/modules/loader.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  loading: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(public loaderService: LoaderService ,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public breakpointObserver: BreakpointObserver) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)',);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
   }

  ngOnInit() { }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

 
}
