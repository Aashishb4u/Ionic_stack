// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/

import { Component, ViewChild, ApplicationRef } from '@angular/core';
import {Platform, ModalController, Events, NavController, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { LoginPage } from '../pages/login/login';
import { franchiseeInfoPage } from '../pages/franchisee-info/franchisee-info';
import { ConfigProvider } from '../providers/config/config';
import { SharedDataProvider } from '../providers/shared-data/shared-data';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';
import { trigger, transition, animate, style } from '@angular/animations';
import { DashboardPage } from "../pages/dashboard/dashboard";
import {UserInfoPage} from "../pages/user-info/user-info";

@Component({
    animations: [
        trigger(
            'animate', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('500ms', style({ opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('500ms', style({ opacity: 0 }))
                ])
            ]
        )
    ],
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('slider') slider;
    @ViewChild(Nav) nav: Nav;


    public Slides = [
        {
            title: '1',
            imageUrl: 'assets/hd_pizaa.jpeg',
            private: false
        },
        {
            title: '2',
            imageUrl: 'assets/hd_pizza2.jpeg',
            private: false
        },
        {
            title: '3',
            imageUrl: 'assets/hd_pizza_4.png',
            private: true
        },
        {
            title: '4',
            imageUrl: 'assets/pizza_hd5.jpg',
            private: true
        }
    ];

    rootPage: any;

    homeList = false;
    homeListIcon = 'add';
    categoriesList = false;
    isLoggedin = false;
    categoriesListIcon = 'add';
    shopList = false;
    shopListIcon = 'add';


    constructor(
        public platform: Platform,
        public modalCtrl: ModalController,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        translate: TranslateService,
        public storage: Storage,
        public shared: SharedDataProvider,
        public config: ConfigProvider,
        public network: Network,
        public alert: AlertProvider,
        public loading: LoadingProvider,
        public events: Events,
        public plt: Platform,
        private applicationRef: ApplicationRef,

    ) {
        this.initializeApp();

        let connectedToInternet = true;
        network.onDisconnect().subscribe(() => {
            connectedToInternet = false;
            translate.get(["Please Connect to the Internet!", "Disconnected"]).subscribe((res) => {
                this.alert.showWithTitle(res["Please Connect to the Internet!"], res["Disconnected"]);
            });
        });

        network.onConnect().subscribe(() => {
            if (!connectedToInternet) {
                window.location.reload();
                translate.get(["Network connected Reloading Data", "Connected"]).subscribe((res) => {
                    this.alert.showWithTitle(res["Network connected Reloading Data"] + '...', res["Connected"]);
                });

            }
        });
        this.platform.setDir(localStorage.direction, true);
        shared.dir = localStorage.direction;

        if (this.shared.isLoggedin()) {
            this.toDashboard();
        }
        //setting default languge on start up
        translate.setDefaultLang(this.config.url + '/api/appsettings/get_all_labels/?insecure=cool');

    }

    onClick() {
        this.applicationRef.tick();
    }

    openLoginPage() {
        let modal = this.modalCtrl.create(LoginPage, { hideGuestLogin: true });// <!-- 2.0 updates -->
        modal.present();
    }

    openGetStarted() {
        let modal = this.modalCtrl.create(franchiseeInfoPage, { hideGuestLogin: true });
        modal.present();
    }

    currentIndex = 0;

    nextSlide() {
        this.slider.slideNext();
    }

    previousSlide() {
        this.slider.slidePrev();
    }

    onSlideChanged() {
        this.currentIndex = this.slider.getActiveIndex();
    }

    toDashboard() {
        this.rootPage = DashboardPage;
        this.isLoggedin = true;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

}
