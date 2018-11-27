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
import {RetailerProductPage} from "../retailer-product/retailer-product";
import {GenericListPage} from "../generic-list/generic-list";

@Component({
  selector: 'page-quiz-personalization',
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
  templateUrl: 'quiz-personalization.html',
})

export class QuizPersonalizationPage {

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

  selectedImages: Array<string> = [];
  images: Array<string>;
  grid = [
      {
          id: 1,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 2,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 3,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 4,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 5,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 6,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 7,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 8,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 9,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 10,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 11,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 12,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 13,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 14,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 15,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 16,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 17,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
      {
          id: 18,
          title: 'Summer Dress',
          price: 120,
          imageUrl: 'assets/intro/img_5.jpg',
          private: false
      },
  ];
  scrollTopButton = false;
  segments: any = 'topSeller';
  errorMessage = '';

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
  }

    selectProduct(value) {
        // this.selectedImages.filter(function(arr){return arr['id'] ==  value.id});
        // console.log(this.selectedImages.filter(function(arr){return arr['id'] ==  value.id}));
        // debugger;
        // console.log(this.selectedImages.findIndex(value.id));
        // if (this.selectedImages.indexOf(value) >= 0) {
        if ((this.selectedImages.filter(function(arr){return arr['id'] ==  value.id})).length > 0) {
            this.selectedImages.splice(value, 1);
      } else {
        this.selectedImages.push(value);
      }
  }
    // selectProduct(value) {
      // this.loading.show();
      // this.config.Woocommerce.getAsync("products/" + 48).then((data) => {
      //     this.loading.hide();
      //     this.navCtrl.push(ProductDetailPage, { data: JSON.parse(data.body) });
      //     this.shared.addToRecent(JSON.parse(data.body));
      // }, err => {
      //     this.loading.hide();
      //     this.alert.show("Item not Available!");
      // });
  // }
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

  selectedOutfits() {
      localStorage.user_generic_list = JSON.stringify(this.selectedImages);
      let user_data = {
          "user_data" : JSON.parse(localStorage.customerData),
          "user_outfit_list" : JSON.parse(localStorage.user_generic_list),
      };
      this.http.post(this.config.url + '/wp-json/wp/v2/wp_user_outfit_selection',JSON.stringify(user_data) ).
      map(res => res.json()).subscribe(data => {
          if (data.status) {
              if (data.data) {
                  this.shared.toast("Selection saved");
                  this.navCtrl.setRoot(GenericListPage);
                  // this.dismiss();
              }
          } else {
              this.errorMessage = data.error;
          }
      });
  }

  getOutfits() {

      let user_data = {
          "user_data" : JSON.parse(localStorage.customerData)
      };

      this.http.post(this.config.url + '/wp-json/wp/v2/wp_get_user_outfit_selection',JSON.stringify(user_data) ).
      map(res => res.json()).subscribe(data => {
          if (data.status) {
              if ((data.data).length > 0) {
                  this.selectedImages = JSON.parse(data.data);
              } else {
                  this.selectedImages = [];
              }
          } else {
              this.errorMessage = data.error;
          }
      });
  }

  getSelection(card_index) {
      if ((this.selectedImages.filter(function(arr){return arr['id'] ==  card_index.id})).length > 0) {
          return true;
      }
      return false;
  }

  ngOnInit () {
      this.getOutfits();
  }


}
