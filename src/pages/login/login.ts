// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { Component, ApplicationRef } from '@angular/core';
import { ViewController, ModalController, NavController, NavParams, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingProvider } from '../../providers/loading/loading';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { AlertProvider } from '../../providers/alert/alert';
import { GooglePlus } from '@ionic-native/google-plus';
import {DashboardPage} from "../dashboard/dashboard";
import {UserInfoPage} from "../user-info/user-info";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {
  hideGuestLogin = false;
  formData = { username: '', password: '' };
  errorMessage = '';
  constructor(
    public http: Http,
    public config: ConfigProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loading: LoadingProvider,
    public shared: SharedDataProvider,
    public alert: AlertProvider,
    private googlePlus: GooglePlus,
    private applicationRef: ApplicationRef,
    public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    private authService: AuthService
  ) {
    this.hideGuestLogin = navParams.get('hideGuestLogin');

      if (this.shared.isLoggedin()) {
          this.toDashboard();
      }

  }
  // <!-- 2.0 updates -->
  guestLogin() {
    if (this.config.checkOutPage == 1)
      this.shared.onePageCheckOut();
    else
      this.events.publish('openShippingAddressPage');
    this.dismiss();
  }

  login() {
    this.loading.show();
    this.errorMessage = '';
    this.loginHook(this.formData, '', false);

  }

  getUserData(c, type_user) {
    let id;
    if (type_user == "simple") id = c.user.id;
    if (type_user == "fb") id = c.id;
    this.config.Woocommerce.getAsync("customers/" + id).then((data) => {
      this.loading.hide();
      let dat = JSON.parse(data.body);
      this.shared.login(Object.assign({ cookie: c.cookie }, dat));
      this.dismiss();
      this.applicationRef.tick();
    });
  }

  openSignUpPage() {
      this.navCtrl.setRoot(UserInfoPage);
      // this.dismiss();
  }

  openForgetPasswordPage() {
      this.navCtrl.setRoot(ForgotPasswordPage);
      // this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  toHome() {
      // this.dismiss();
      this.navCtrl.setRoot(DashboardPage);
  }

    signInWithGoogle(): void {
        let that = this;
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            (userData) => {
                let SocialformData = {
                    username: userData.email,
                    password: userData.email + "@123"
                };
                let error_msg = "The account you are attempting to log in with does not currently exist. Please create an account first!"
                that.loginHook(SocialformData, error_msg, true);
            });
    }

    signInWithFB(): void {
    let that = this;
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            (userData) => {
                let SocialformData = {
                    username: userData.email,
                    password: userData.email + "@123"
                };
                let error_msg = "The account you are attempting to log in with does not currently exist. Please create an account first!"
                that.loginHook(SocialformData, error_msg, true);
            });
    }

    loginHook (userData, error_msg, is_social) {
        this.http.get(encodeURI(this.config.url + '/api/appusers/generate_cookie/?insecure=cool&username=' + userData.username + "&password=" + userData.password)).map(res => res.json()).subscribe(data => {
            if (data.status == "ok") {
                // this.getUserData(data, "simple");
                this.shared.setUserAuth(data);
                this.loading.hide();
                this.toHome();
            } else {
                if (is_social) {
                    this.errorMessage = error_msg;
                } else {
                    this.errorMessage = data.error;
                }
                this.loading.hide();
            }
        }, err => {
            this.loading.hide();
            if (err.ok == false) {
                if (is_social) {
                    this.errorMessage = error_msg;
                } else {
                    this.errorMessage = "Invalid Username or Password";
                }
            }
        });
    }

    toDashboard() {
        this.navCtrl.setRoot(DashboardPage);
    }

}
