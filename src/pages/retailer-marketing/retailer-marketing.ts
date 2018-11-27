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
  selector: 'page-retailer-marketing',
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
  templateUrl: 'retailer-marketing.html',
})

export class RetailerMarketingPage {
    public product;

    public errorMessage = "";
    public imagesList;
    public image_display_1 = "assets/intro/default_product.png";
    public image_display_2 = "assets/intro/default_product.png";
    public everlane_heading = "Why We Love It -  The Modern snap";
    public everlane_content = "Breathable. Casual The new thing now in new colors";

    selectAttributes = new Array;
    selectedVariation = null;
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
        private applicationRef: ApplicationRef,
        ) {
        }

    dismiss() {
        this.navCtrl.setRoot(DashboardPage);
    }

    shopNow() {
        this.navCtrl.setRoot(RetailerProductPage);
    }


    loadProduct(id = 85) {
        this.config.Woocommerce.getAsync("products/" + id).then((data) => {
            this.product = JSON.parse(data.body);
            this.image_display_1 = (this.product.images[0]) ? this.product.images[0].src : "assets/intro/default_product.png" ;
            this.image_display_2 = (this.product.images[1]) ? this.product.images[1].src : "assets/intro/default_product.png" ;
            let is_set_everlane_heading = Object.keys(this.product.meta_data).find(k => this.product.meta_data[k].key === 'everlane_product');
            if (is_set_everlane_heading) {
                this.everlane_heading =  this.product.meta_data[is_set_everlane_heading].value;
            }
            let is_set_everlane_content = Object.keys(this.product.meta_data).find(k => this.product.meta_data[k].key === 'everlane_content');
            if (is_set_everlane_content) {
                this.everlane_content =  this.product.meta_data[is_set_everlane_content].value;
            }
            this.imageSetSelection(this.product);
            this.loading.hide();
        }, err => {
            this.loading.hide();
            // this.alert.show("Item not Available!");
        });
    }

    select_size(size_type) {
        this.selected_size = size_type;
        this.product.images = [];
        this.product.images = this.imagesList[size_type];
        this.applicationRef.tick();
        // this.loading.hide();
    }

    imageSetSelection(current_product) {
        // let imagesList = [];
        this.imagesList = {
            'S' : [],
            'M' : [],
            'L' : [],
            'XL' : [],
        };

        for(let images of current_product['images']){
            if (images !== undefined) {
                this.imagesList[images['alt']].push(images);
            }
        }
        this.select_size('S');
    }

    ngOnInit () {
        this.getEverlaneProductId();
    }

    getEverlaneProductId() {
        this.loading.show();
        let user_data = {
            "user_data" : JSON.parse(localStorage.customerData)
        };
        this.http.post(this.config.url + '/wp-json/wp/v2/wp_get_everlane_product/', JSON.stringify(user_data)).
        map(res => res.json()).subscribe(data => {
            if (data.status) {
                if (data.data) {
                    this.loadProduct(data.data);
                }
            } else {
                this.errorMessage = data.error;
            }
        });
    }
}
