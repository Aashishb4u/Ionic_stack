// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import {ViewController, ModalController, NavController} from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { ConfigProvider } from '../../providers/config/config';
import {Http} from '@angular/http';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import {DashboardPage} from "../dashboard/dashboard";
import {SettingsPage} from "../settings/settings";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  formData = {
    email: '',
    password: '',
    repassword: '',
  };
  image;
  errorMessage = '';
  constructor(
    public http: Http,
    public config: ConfigProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public loading: LoadingProvider,
    public shared: SharedDataProvider,
    public platform: Platform,
    private authService: AuthService
  ) {
      if (this.shared.isLoggedin()) {
          this.toDashboard();
      }
  }

  signUp() {
    this.loading.show();
    this.errorMessage = '';

    this.signupHook(this.formData);

    }


  dismiss() {
    // this.viewCtrl.dismiss();
      this.navCtrl.setRoot(DashboardPage);
      // let modal = this.modalCtrl.create(DashboardPage, { hideGuestLogin: true });// <!-- 2.0 updates -->
    // modal.present();
  }

    signInWithGoogle(): void {
      let that = this;
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            (userData) => {
                let SocialformData = {
                    email: userData.email,
                    password: userData.email + "@123"
                };
                that.signupHook(SocialformData);
            });
    }

    signInWithFB(): void {
      let that = this;
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            (userData) => {
                let SocialformData = {
                    email: userData.email,
                    password: userData.email + "@123"
                };
                that.signupHook(SocialformData);
            });
    }

    signupHook (userData) {
        this.config.Woocommerce.postAsync("customers", userData ).then((data) => {
            this.loading.hide();
            let dat = JSON.parse(data.body);
            if (dat.message == undefined) {
                let user_data = {
                    "basic_info" : localStorage.user_info_1,
                    "uploaded_image" : localStorage.user_info_2,
                    "user_body" : localStorage.user_info_3,
                    "user_data" : dat
                };

                this.http.post(this.config.url + '/wp-json/wp/v2/wp_user_details',JSON.stringify(user_data) ).
                map(res => res.json()).subscribe(data => {
                    if (data.status) {
                        if (data.data) {
                            this.shared.toast("User Created");
                            this.dismiss();
                        }
                    } else {
                        this.errorMessage = data.error;
                    }
                });
            }
            if (dat.message != undefined)
                this.errorMessage = dat.message;

        });
    }


    toDashboard() {
        this.navCtrl.setRoot(DashboardPage);
    }

}
