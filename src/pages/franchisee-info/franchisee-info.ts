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
import {LoginPage} from "../login/login";
import {UserImagePage} from "../user-image/user-image";
import { AlertController } from 'ionic-angular';
import {UserModalPage} from "../user-modal/user-modal";
import {UserInfo2Page} from "../user-info2/user-info2";


/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-franchisee-info',
  templateUrl: 'franchisee-info.html',
})
export class franchiseeInfoPage {

  formData = {
    gender: 'male',
    height: 'Inches',
    feet: '5',
    inches: '5',
    cm: '160',
	kg: '45',
	pounds: '110',
	weight: 'Pounds',
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
    userinfo() {
    this.loading.show();
    this.errorMessage = '';
    let height = "";
	let heightNumeric = 0;
	let heightNumericIn = 0;
	let weight = "";
	let weightNumeric = 0;

    if (this.formData.height == "cm") {
		heightNumeric = parseInt(this.formData.cm);
        heightNumeric = heightNumeric/2.54;
		height = heightNumeric.toString();
    } else {
        heightNumeric = parseInt(this.formData.feet);
		heightNumeric = heightNumeric*12;
		heightNumericIn = parseInt(this.formData.inches);
		heightNumeric = heightNumeric + heightNumericIn;
		height = heightNumeric.toString();
    }
	
	if (this.formData.weight == "Pounds") {
        weight = this.formData.pounds;
    } else {
        weightNumeric = parseInt(this.formData.kg);
		weightNumeric = weightNumeric*2.2;
		weight = weightNumeric.toString();		
    }

    let data = {
        "height" : height,
		"weight" : weight,
        "gender" : this.formData.gender
    }

    this.loading.hide();
        //this.showConfirm();
        localStorage.user_info_1 = JSON.stringify(data);
		this.navigateToInfo2();
    }

    navigateToUserBody() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserModalPage, {hideGuestLogin: true});// <!-- 2.0 updates -->
        modal.present();
    }
	
	navigateToInfo2() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserInfo2Page, {hideGuestLogin: true});// <!-- 2.0 updates -->
        modal.present();
    }


    dismiss() {
        this.viewCtrl.dismiss();
        //let modal = this.modalCtrl.create(LoginPage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        //modal.present();
    }

    imageModule() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserImagePage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        modal.present();
    }

    showConfirm() {
        const confirm = this.alertCtrl.create({
            title: 'Allow permission',
            message: 'Whould you like to take a picture at this time to assist the process?',
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
                        this.navigateToInfo2();
                        localStorage.user_info_2 = "";
                    }
                }
            ]
        });
        confirm.present();
    }
}
