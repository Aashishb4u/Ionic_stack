import {Component, ViewChild} from '@angular/core';
import {ModalController, Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../home/home';
import {MyAccountPage} from "../my-account/my-account";
import {MenuController} from 'ionic-angular';
import {MyApp} from "../../app/app.component";
import {SignUpPage} from "../sign-up/sign-up";
import {Home2Page} from "../home2/home2";
import {Home3Page} from "../home3/home3";
import {Home4Page} from "../home4/home4";
import {Home5Page} from "../home5/home5";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {LoginPage} from "../login/login";


@Component({
    templateUrl: 'dashboard.html'
})
export class DashboardPage {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    isLoggedin = false;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public menuCtrl: MenuController,
                public shared: SharedDataProvider,
                public modalCtrl: ModalController,
                public navCtrl: NavController,
    ) {
        this.initializeApp();

        this.pages = [
            // { title: 'Sign In', component: SignUpPage },
            {title: 'Account Info', component: MyAccountPage},
            {title: 'Change Body', component: MyAccountPage},
            {title: 'Share', component: MyApp},
        ];

        if (!(this.shared.isLoggedin())) {
            this.logoutUser();
        }

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }


    openMenu() {
        this.menuCtrl.open();
    }

    closeMenu() {
        this.menuCtrl.close();
    }

    toggleMenu() {
        this.menuCtrl.toggle('right');
    }

    logoutUser() {
        this.shared.removeUserAuth();
        this.navCtrl.setRoot(LoginPage);
    }

}


