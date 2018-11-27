// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { AlertProvider } from '../../providers/alert/alert';
import {UserImagePage} from "../user-image/user-image";
import {UserInfoPage} from "../user-info/user-info";
import {SignUpPage} from "../sign-up/sign-up";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModalPage {

  formData = {
  };

  public trustURL="";
  errorMessage = '';
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loading: LoadingProvider,
    public http: Http,
    public config: ConfigProvider,
    public modalCtrl: ModalController,
    public alert: AlertProvider,
    public navParams: NavParams,
	private _sanitizationService: DomSanitizer) {
	this.loadIframe();
  }
  
    userinfo() {
		this.loading.show();
		this.errorMessage = '';
		localStorage.user_info_3 = JSON.stringify("");
		this.loading.hide();
		this.userCreateModule();
		
    }

    dismiss() {
        this.viewCtrl.dismiss();
        let modal;
        if (localStorage.user_info_2 != ""){
            modal = this.modalCtrl.create(UserImagePage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        } else {
            modal = this.modalCtrl.create(UserInfoPage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        }
        modal.present();
    }

    imageModule() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserImagePage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        modal.present();
    }

    userCreateModule() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(SignUpPage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        modal.present();
    }

	loadIframe() {

		if(JSON.parse(localStorage.user_info_1).gender == 'male')
		{

			this.trustURL = 'https://beta.drapr.com/pca_web_interface/viewer/index-sliders.php?multipier=2&pca_user=richard&model_path='+JSON.parse(localStorage.user_info_1).gender+'-'+JSON.parse(localStorage.user_info_1).height+'-'+JSON.parse(localStorage.user_info_1).weight+'-'+JSON.parse(localStorage.user_info_body).bodyType+'-'+JSON.parse(localStorage.user_info_body).fitnessLevel+'-'+JSON.parse(localStorage.user_info_body).dressShirtNeck+'-'+JSON.parse(localStorage.user_info_body).dressShirtSleeve+'-'+JSON.parse(localStorage.user_info_body).pantWaist+'-'+JSON.parse(localStorage.user_info_body).pantInseam+'.obj';
		}

		if(JSON.parse(localStorage.user_info_1).gender == 'female')
		{

			this.trustURL = 'https://beta.drapr.com/pca_web_interface/viewer/index-sliders.php?multipier=2&pca_user=richard&model_path='+JSON.parse(localStorage.user_info_1).gender+'-'+JSON.parse(localStorage.user_info_1).height+'-'+JSON.parse(localStorage.user_info_1).weight+'-'+JSON.parse(localStorage.user_info_body).bodyType+'-'+JSON.parse(localStorage.user_info_body).braCircumference+'-'+JSON.parse(localStorage.user_info_body).braCup+'-'+JSON.parse(localStorage.user_info_body).breastShape+'-'+JSON.parse(localStorage.user_info_body).buttShape+'.obj';
		}
		
		return this._sanitizationService.bypassSecurityTrustResourceUrl(this.trustURL);
	}


}
