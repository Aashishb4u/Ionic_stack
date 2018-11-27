// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import {ApplicationRef, Component, ViewChild} from '@angular/core';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { trigger, style, animate, transition } from '@angular/animations';
import {NavController, Content, Events, ModalController, NavParams} from 'ionic-angular';
import {LoadingProvider} from "../../providers/loading/loading";
import {AlertProvider} from "../../providers/alert/alert";
import {DashboardPage} from "../dashboard/dashboard";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Storage} from "@ionic/storage";
import {MagzineArticlePage} from "../magazine-article/magazine-article";
import {RetailerProductPage} from "../retailer-product/retailer-product";
import {RetailerMarketingPage} from "../retailer-marketing/retailer-marketing";

@Component({
  selector: 'page-influencer',
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('700ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'influencer.html',
})

export class InfluencerPage {
    public product;

    grid: Array<{ title: string, component: any }>;


    selected_size = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public config: ConfigProvider,
        public shared: SharedDataProvider,
        public modalCtrl: ModalController,
        public loading: LoadingProvider,
        public iab: InAppBrowser,
        public events: Events,
        private storage: Storage,

        public alert: AlertProvider,
        public translate: TranslateService,
        private applicationRef: ApplicationRef) {



        this.grid = [
            {
                title: 'Retailer Product',
                component: RetailerProductPage,
            },
            {
                title: 'Retailer Marketing',
                component: RetailerMarketingPage,
            },
            {
                title: 'Magazine Article',
                component: MagzineArticlePage,
            },
            {
                title: 'Quiz/Personlization',
                component: RetailerProductPage,
            },
            {
                title: 'Generic Top selling Items',
                component: RetailerProductPage,
            },
            {
                title: 'Influencer',
                component: InfluencerPage,
            }
        ];

    }

    select_size(size_type) {
        this.selected_size = size_type;
        this.applicationRef.tick();
    }

    dismiss() {
        this.navCtrl.setRoot(DashboardPage);
    }

    shopNow() {
        this.navCtrl.setRoot(RetailerProductPage);
    }
}
