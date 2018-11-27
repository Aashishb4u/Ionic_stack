// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import {ApplicationRef, Component, ViewChild} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsPage } from '../products/products';
import {NavController, Content, Events, ModalController, NavParams} from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import {ProductDetailPage} from "../product-detail/product-detail";
import {LoadingProvider} from "../../providers/loading/loading";
import {AlertProvider} from "../../providers/alert/alert";
import {DashboardPage} from "../dashboard/dashboard";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SocialSharing} from "@ionic-native/social-sharing";
import {ReviewsPage} from "../reviews/reviews";
import {Storage} from "@ionic/storage";
import {RetailerProductPage} from "../retailer-product/retailer-product";

@Component({
  selector: 'page-magazine-article',
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
  templateUrl: 'magazine-article.html',
})

export class MagzineArticlePage {
    public product;

    errorMessage = "";
    htmlContent = "";
    selected_size = null;
    quantity = 1;
    discount_price;
    product_price;
    releatedItems = []; // <!-- 2.0 updates -->
    reviews = [];// <!-- 2.0 updates -->
    ratingStarsValue = null;// <!-- 2.0 updates -->
    allVariableAttributes = [];
    tempAllVariableAttributes = [];
    attributes = [];
    public isLiked = 0;
    public wishArray = [];
    public disableCartButton = false;
    public variations = new Array;
    public groupProducts = new Array;
    public variationPrice = null;
    constructor(
        public http: Http,
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
        this.getRetailerProductId();
        this.selected_size = "S";
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

    getProducts(id = "") {
        this.http.get(this.config.url + '/wp-json/wp/v2/pages/'+ id).
        map(res => res.json()).subscribe(data => {
            if (data.status) {
                this.htmlContent = data.content.rendered;
                // if (data.data) {
                //     debugger;
                    // this.getProducts('146');
                // }
                this.loading.hide();
            } else {
                this.loading.hide();
                this.alert.show("Item not Available!");
            }
        });
    }


    getRetailerProductId() {
        this.loading.show();
        let user_data = {
            "user_data" : JSON.parse(localStorage.customerData),
        };

        this.http.post(this.config.url + '/wp-json/wp/v2/wp_get_reformation_product', JSON.stringify(user_data)).
        map(res => res.json()).subscribe(data => {
            if (data.status) {
                if (data.data) {
                    this.getProducts('146');
                }
            } else {
                this.errorMessage = data.error;
            }
        });

    }

}
