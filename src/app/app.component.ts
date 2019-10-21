import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService) {}
  ngOnInit() {
    console.log('hey')
    this.auth.localAuthSetup();
     window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.auth.logout();
  }

}
