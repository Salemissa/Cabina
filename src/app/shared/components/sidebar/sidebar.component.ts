import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() closenav = new EventEmitter<boolean>();
  mobileQuery: MediaQueryList;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
    
  }

  private _mobileQueryListener: () => void;


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navMobileEvent(){
    
    if(this.mobileQuery.matches){
      this.closenav.emit(false);
    
    
    }
  }

}
