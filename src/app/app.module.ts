// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
// Version: 1.0



if (localStorage.langId == undefined) {
  localStorage.langId = '1';
}
if (localStorage.direction == undefined) {
  localStorage.direction = 'ltr';
}

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("1022820467926-o5csmrduht2u8aq5jb0g8mm58k8s47pf.apps.googleusercontent.com")
        // provider: new GoogleLoginProvider("363578212919-f61505gr8qpnncdpuggudsj71slgqq9o.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("552067555225627")
        // provider: new FacebookLoginProvider("1891061071200937")
    }
]);

import {QuizPersonalizationPage} from "../pages/quiz-personalization/quiz-personalization";
import {MagzineArticlePage} from "../pages/magazine-article/magazine-article";
import {RetailerProductPage} from "../pages/retailer-product/retailer-product";
import {RetailerMarketingPage} from "../pages/retailer-marketing/retailer-marketing";
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import {UserImagePage} from "../pages/user-image/user-image";
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { createTranslateLoader } from '../providers/translate/translate';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { ProductsProvider } from '../providers/products/products';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';
import {UserInfoPage} from "../pages/user-info/user-info";
import {UserInfo2Page} from "../pages/user-info2/user-info2";

import { IntroPage } from '../pages/intro/intro';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { LoadingProvider } from '../providers/loading/loading';
import { SharedDataProvider } from '../providers/shared-data/shared-data';

import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

import { BannersComponent } from '../components/banners/banners';
import { ProductComponent } from '../components/product/product';
import { FooterComponent } from '../components/footer/footer';
import { SlidingTabsComponent } from '../components/sliding-tabs/sliding-tabs';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CartPage } from '../pages/cart/cart';
import { CurencyPipe } from '../pipes/curency/curency';
import { SearchPage } from '../pages/search/search';
import { AlertProvider } from '../providers/alert/alert';
import { CategoriesPage } from '../pages/categories/categories';
import { ProductsPage } from '../pages/products/products';
import { WishListPage } from '../pages/wish-list/wish-list';
import { ShippingAddressPage } from '../pages/shipping-address/shipping-address';
import { SelectCountryPage } from '../pages/select-country/select-country';
import { SelectZonesPage } from '../pages/select-zones/select-zones';
import { BillingAddressPage } from '../pages/billing-address/billing-address';
import { ShippingMethodPage } from '../pages/shipping-method/shipping-method';
import { OrderPage } from '../pages/order/order';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { Stripe } from '@ionic-native/stripe';
import { CouponProvider } from '../providers/coupon/coupon';
import { PayPal } from '@ionic-native/paypal';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { NewsPage } from '../pages/news/news';
import { SettingsPage } from '../pages/settings/settings';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NewsListPage } from '../pages/news-list/news-list';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Categories2Page } from '../pages/categories2/categories2';
import { SubCategoriesPage } from '../pages/sub-categories/sub-categories';
import { Home5Page } from '../pages/home5/home5';
import { Home4Page } from '../pages/home4/home4';
import { Home3Page } from '../pages/home3/home3';
import { Home2Page } from '../pages/home2/home2';
import { Categories3Page } from '../pages/categories3/categories3';
import { Categories4Page } from '../pages/categories4/categories4';
import { Categories5Page } from '../pages/categories5/categories5';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermServicesPage } from '../pages/term-services/term-services';
import { RefundPolicyPage } from '../pages/refund-policy/refund-policy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Network } from '@ionic-native/network';
import { SubCategories2Page } from '../pages/sub-categories2/sub-categories2';
import { SubCategories3Page } from '../pages/sub-categories3/sub-categories3';
import { SubCategories4Page } from '../pages/sub-categories4/sub-categories4';
import { SubCategories5Page } from '../pages/sub-categories5/sub-categories5';
import { Categories6Page } from '../pages/categories6/categories6';
import { SubCategories6Page } from '../pages/sub-categories6/sub-categories6';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdMobFree} from '@ionic-native/admob-free';
import { FCM } from '@ionic-native/fcm';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';
import { LocationDataProvider } from '../providers/location-data/location-data';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { ReviewsPage } from '../pages/reviews/reviews';
import { AddReviewPage } from '../pages/add-review/add-review';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import {UserModalPage} from "../pages/user-modal/user-modal";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {InfluencerPage} from "../pages/influencer/influencer";
import {GenericListPage} from "../pages/generic-list/generic-list";
import {franchiseeInfoPage} from "../pages/franchisee-info/franchisee-info";


@NgModule({
  declarations: [
    MyApp,
      franchiseeInfoPage,
    HomePage,
    SearchPage,
    CartPage,
    Home2Page,
    Home3Page,
    Home4Page,
    Home5Page,
    SearchPage,
    CategoriesPage,
    Categories2Page,
    Categories3Page,
    Categories4Page,
    Categories5Page,
    Categories6Page,
    IntroPage,
    DashboardPage,
    SubCategoriesPage,
    SubCategories2Page,
    SubCategories3Page,
    SubCategories4Page,
    SubCategories5Page,
    SubCategories6Page,
    ProductsPage,
    ContactUsPage,
    AboutUsPage,
    IntroPage,
    LoginPage,
    SignUpPage,
    RetailerProductPage,
    RetailerMarketingPage,
    MagzineArticlePage,
    InfluencerPage,
    QuizPersonalizationPage,
    GenericListPage,
    UserInfoPage,
	UserInfo2Page,
    UserImagePage,
    UserModalPage,
    WishListPage,
    ShippingAddressPage,
    ForgotPasswordPage,
    BannersComponent,
    SelectZonesPage,
    BillingAddressPage,
    SelectCountryPage,
    MyAccountPage,
    ProductComponent,
    FooterComponent,
    SlidingTabsComponent,
    ProductDetailPage,
    CurencyPipe,
    ShippingMethodPage,
    ThankYouPage,
    OrderPage,
    OrderDetailPage,
    MyOrdersPage,
    PrivacyPolicyPage,
    RefundPolicyPage,
    TermServicesPage,
    NewsPage,
    NewsDetailPage,
    NewsListPage,
    SettingsPage,
    ReviewsPage,// <!-- 2.0 updates -->
    AddReviewPage // <!-- 2.0 updates -->
    
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      iconMode: 'md',
      mode:'md',
    }),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,// <!-- 2.0 updates start -->
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    SocialLoginModule.initialize(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      franchiseeInfoPage,
    HomePage,
    Home2Page,
    Home3Page,
    Home4Page,
    Home5Page,
    SearchPage,
    CategoriesPage,
    Categories2Page,
    Categories3Page,
    Categories4Page,
    Categories5Page,
    Categories6Page,
    SubCategoriesPage,
    SubCategories2Page,
    SubCategories3Page,
    SubCategories4Page,
    SubCategories5Page,
    SubCategories6Page,
    IntroPage,
    DashboardPage,
    PrivacyPolicyPage,
    RefundPolicyPage,
    TermServicesPage,
    ProductsPage,
    ContactUsPage,
    AboutUsPage,
    IntroPage,
    WishListPage,
    ShippingAddressPage,
    CartPage,
    LoginPage,
    SignUpPage,
    UserInfoPage,
	UserInfo2Page,
    UserImagePage,
    UserModalPage,
    RetailerProductPage,
    RetailerMarketingPage,
    MagzineArticlePage,
    InfluencerPage,
    QuizPersonalizationPage,
    GenericListPage,
    BillingAddressPage,
    SelectCountryPage,
    SelectZonesPage,
    MyAccountPage,
    ForgotPasswordPage,
    BannersComponent,
    ProductComponent,
    FooterComponent,
    SlidingTabsComponent,
    ProductDetailPage,
    ShippingMethodPage,
    OrderPage,
    MyOrdersPage,
    OrderDetailPage,
    ThankYouPage,
    NewsPage,
    NewsDetailPage,
    NewsListPage,
    SettingsPage,
    ReviewsPage,// <!-- 2.0 updates -->
    AddReviewPage, // <!-- 2.0 updates -->
  ],
  providers: [
    ConfigProvider,
    StatusBar,
    SplashScreen,
    SocialSharing,
    ConfigProvider,
    ProductsProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductsProvider,
    LoadingProvider,
    SharedDataProvider,
    Stripe,
    AlertProvider,
    CouponProvider,
    PayPal,
    Push,
    Device,
    Facebook,
    GooglePlus,
    LocalNotifications,
    InAppBrowser,
    Network,
    AdMobFree,
    FCM,
    AppVersion,
    OneSignal,
    LocationDataProvider,
    SpinnerDialog,
    ThemeableBrowser,
    WheelSelector,
    Camera,
    FileTransfer,
  ]
})
export class AppModule { }
