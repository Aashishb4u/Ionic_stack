// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import {Http, RequestOptions} from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { AlertProvider } from '../../providers/alert/alert';
import {LoginPage} from "../login/login";
import {UserImagePage} from "../user-image/user-image";
import { AlertController } from 'ionic-angular';
import {UserModalPage} from "../user-modal/user-modal";
import {UserInfoPage} from "../user-info/user-info";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-info2',
  templateUrl: 'user-info2.html',
})
export class UserInfo2Page {

  formData = {
    gender: JSON.parse(localStorage.user_info_1).gender,
	bodyType: 'oval',
    fitnessLevel: 'medium',
    dressShirtNeck: '15',
    dressShirtSleeve: '32',
    pantWaist: '32',
	pantInseam: '32',
	braCircumference: '32',
	braCup: 'C',
	breastShape: 'athletic',
	buttShape: 'invertedv'
  };

    numbers = Array(60).fill(0).map((x,i)=>i);

    dummyJson = {
        feet: [
            {description: '4'},
            {description: '5'},
            {description: '6'},
            {description: '7'},
            {description: '8'}
        ],
        inches: [
            {description: '1'},
            {description: '2'},
            {description: '3'},
            {description: '4'},
            {description: '5'},
            {description: '6'},
            {description: '7'},
            {description: '8'},
            {description: '9'},
            {description: '10'},
            {description: '11'},
        ]
    }


  errorMessage = '';
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loading: LoadingProvider,
    public http: Http,
    public config: ConfigProvider,
    public modalCtrl: ModalController,
    public alert: AlertProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }
    userinfo2() {
    this.loading.show();
    this.errorMessage = '';
	let bodyData = {};

    let data = {
		"height": JSON.parse(localStorage.user_info_1).height,
		"weight": JSON.parse(localStorage.user_info_1).weight,
        "gender": JSON.parse(localStorage.user_info_1).gender,
		"bodyType": this.formData.bodyType,
		"fitnessLevel": this.formData.fitnessLevel,
		"dressShirtNeck": this.formData.dressShirtNeck,
		"dressShirtSleeve": this.formData.dressShirtSleeve,
		"pantWaist": this.formData.pantWaist,
		"pantInseam": this.formData.pantInseam,
		"braCircumference": this.formData.braCircumference,
		"braCup": this.formData.braCup,
		"breastShape": this.formData.breastShape,
		"buttShape": this.formData.buttShape
    }

    this.loading.hide();
        this.showConfirm();
        localStorage.user_info_1 = JSON.stringify(data);
        localStorage.user_info_body = JSON.stringify(data);
    }

    navigateToUserBody() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserModalPage, {hideGuestLogin: true});// <!-- 2.0 updates -->
        modal.present();
    }


    dismiss() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserInfoPage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        modal.present();
    }

    imageModule() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserImagePage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        modal.present();
    }

    showConfirm() {
        const confirm = this.alertCtrl.create({
            title: 'Allow permission',
            message: 'Would you like to take a picture at this time to assist the process?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.imageModule();
                    }
                },
                {
                    text: 'Maybe Later',
                    handler: () => {
                        this.bodyHook();
                        localStorage.user_info_2 = "";
                    }
                }
            ]
        });
        confirm.present();
    }

	bodyHook () {
	
		let bodyData = {};

		if(JSON.parse(localStorage.user_info_1).gender == 'female')
		{
			bodyData = {
				"female": {
					"height": JSON.parse(localStorage.user_info_1).height,
					"weight": JSON.parse(localStorage.user_info_1).weight,
					"bodyshape": this.formData.bodyType,
					"bodyfat": this.formData.fitnessLevel,
					"bracircumference": this.formData.braCircumference,
					"bracup": this.formData.braCup,
					"breastshape": this.formData.breastShape,
					"buttshape": this.formData.buttShape,
					"fileout": '../../drapr-v0-mobile-web/www/pca_web_interface/bodies/'+JSON.parse(localStorage.user_info_1).gender+'-'+JSON.parse(localStorage.user_info_1).height+'-'+JSON.parse(localStorage.user_info_1).weight+'-'+this.formData.bodyType+'-'+this.formData.braCircumference+'-'+this.formData.braCup+'-'+this.formData.breastShape+'-'+this.formData.buttShape+'.obj'
				}
			}
		}
		
		if(JSON.parse(localStorage.user_info_1).gender == 'male')
		{
			bodyData = {
				"male": {
					"height": JSON.parse(localStorage.user_info_1).height,
					"weight": JSON.parse(localStorage.user_info_1).weight,
					"bodyshape": this.formData.bodyType,
					"bodyfat": this.formData.fitnessLevel,
					"neck": this.formData.dressShirtNeck,
					"arm": this.formData.dressShirtSleeve,
					"waist": this.formData.pantWaist,
					"inseam": this.formData.pantInseam,
					"fileout": '../../drapr-v0-mobile-web/www/pca_web_interface/bodies/'+JSON.parse(localStorage.user_info_1).gender+'-'+JSON.parse(localStorage.user_info_1).height+'-'+JSON.parse(localStorage.user_info_1).weight+'-'+this.formData.bodyType+'-'+this.formData.fitnessLevel+'-'+this.formData.dressShirtNeck+'-'+this.formData.dressShirtSleeve+'-'+this.formData.pantWaist+'-'+this.formData.pantInseam+'.obj'
				}
			}
		}


		this.http.post(this.config.bodyConfigUrl + '?action=createBody',JSON.stringify(bodyData) ).
		map(res => {
		    return res
		}).
        subscribe(data => {
			if (data) {
			    console.log(data);
                this.navigateToUserBody();
                // this.errorMessage = data.status;
			} else {
				this.errorMessage = "";
			}
		});
    }
}
