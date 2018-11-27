// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsPage } from '../products/products';
import { NavController, Content, Events } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import {ProductDetailPage} from "../product-detail/product-detail";
import {LoadingProvider} from "../../providers/loading/loading";
import {AlertProvider} from "../../providers/alert/alert";
import {DashboardPage} from "../dashboard/dashboard";

@Component({
  selector: 'page-retailer-product',
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
  templateUrl: 'retailer-product.html',
})

export class RetailerProductPage {

  @ViewChild(Content) content: Content;

  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }

  onScroll(e) {

    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
    else this.scrollTopButton=false;
  }

  images: Array<string>;
  grid: Array<string>;
  scrollTopButton = false;
  segments: any = 'topSeller';
  errorMessage: any = '';

  constructor(
    public http: Http,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public events: Events,
    public loading: LoadingProvider,
    public alert: AlertProvider,
    translate: TranslateService,
  ) {
      this.getRetailerProductId();
      // this.getProducts();
  }

  loadProduct(value) {
      // this.loading.show();
      this.config.Woocommerce.getAsync("products/" + value.id).then((data) => {
          this.loading.hide();
          this.navCtrl.push(ProductDetailPage, { data: JSON.parse(data.body) });
          this.shared.addToRecent(JSON.parse(data.body));
      }, err => {
          this.loading.hide();
          this.alert.show("Item not Available!");
      });
  }
  ngAfterContentChecked() {
    this.content.resize();
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
    this.navCtrl.push(SearchPage);
  }

  dismiss() {
     this.navCtrl.setRoot(DashboardPage);
  }

   getProducts(id = "") {
        this.config.Woocommerce.getAsync("products?category=" + id).then((data) => {
            this.grid =  JSON.parse(data.body);
            this.loading.hide();
        }, err => {
            this.loading.hide();
            this.alert.show("Item not Available!");
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
                    this.getProducts(data.data);
                }
            } else {
                this.errorMessage = data.error;
            }
        });

    }



}
