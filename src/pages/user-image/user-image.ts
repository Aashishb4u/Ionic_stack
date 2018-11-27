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
import { Camera } from '@ionic-native/camera';
import {UserInfoPage} from "../user-info/user-info";
import {UserModalPage} from "../user-modal/user-modal";



/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-image',
  templateUrl: 'user-image.html',
})
export class UserImagePage {

    image_url: string = "";
    image_ext: string = "";

    formData = {
        gender: 'male',
        height: 'Inches',
    };

    dummyJson = {
        days: [
            {description: 'Mon'},
            {description: 'Tue'},
            {description: 'Wed'},
            {description: 'Thu'},
            {description: 'Fri'}
        ],
        people: [
            {description: 'Mike'},
            {description: 'Max'},
            {description: 'Adam'},
            {description: 'Brandy'},
            {description: 'Ben'}
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
                public camera: Camera,
                public navParams: NavParams) {
        }

    userinfo() {
        this.loading.show();
        this.errorMessage = '';
    }

    dismiss() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserInfoPage, {hideGuestLogin: true});// <!-- 2.0 updates -->
        modal.present();
    }

    navigateToUserBody() {
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create(UserModalPage, {hideGuestLogin: true});// <!-- 2.0 updates -->
        modal.present();
    }

    upload(e) {

        let file = e.target.files[0];

        if (file) {
            if (/^image\//i.test(file.type)) {
                this.readFile(file);
            } else {
                alert('Not a valid image!');
            }
        } else {
                alert( "File upload is not supported!");
        }
    }

    readFile(file) {
        let reader = new FileReader();

        let that = this;
        reader.onloadend = function () {
            that.image_url= reader.result;
            that.image_ext = file.type;
            that.uploadImage()
        }

        reader.onerror = function () {
            alert('There was an error reading the file!');
        }

        reader.readAsDataURL(file);
    }

    public uploadImage () {

        let image_data = {
            'base_64' : this.image_url,
            'ext' : this.image_ext
        };

        this.http.post(this.config.url + '/wp-json/wp/v2/wp_store_image',JSON.stringify(image_data)).
        map(res => res.json()).subscribe(data => {
            if (data.status) {
                if (data.data) {
                    localStorage.user_info_2 = JSON.stringify(data.data);
                    this.navigateToUserBody();
                }
            } else {
                this.errorMessage = data.error;
            }
        }, err => {
            if (err.ok == false) {
                this.errorMessage = err;
            }
        });
    }
}
