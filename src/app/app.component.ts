import { Component } from '@angular/core';
import { LoginPanelService } from './home/login-panel/login-panel.service';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( public loginService: LoginPanelService, private _commonService: CommonService ) {}

  get commonService(): CommonService {
    return this._commonService;
  }
}
