import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  lang = 'en';

  translate = inject(TranslateService);

  constructor() {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.lang = browserLang?.match(/uk|ru/) ? 'uk' : 'en';
    this.translate.use(this.lang);
    }
}
