import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {FormBuilder,Validators } from '@angular/forms';
import {TabsPage} from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;  
  public backgroundImage: any = "./assets/bg1.jpg";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";

  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController,public fb: FormBuilder,public authService:AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = fb.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
          password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });  
  }

  login(){
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();
    this.authService.login(this.loginForm.value).then((res:any)=>{
      if(res){
        this.presentToast("Login SuccessFull!",true); 
        loadingPopup.dismiss();        
      }
    }).catch((res:any)=>{
      this.presentToast("Wrong Credentials!",false); 
      loadingPopup.dismiss(); 
    });
  }

  presentToast(message,flag) {
    
     const toast = this.toastCtrl.create({
       message: message,
       duration: 1000,
       position: 'bottom'
     });
   
     toast.onDidDismiss(() => {
       if(flag)
        this.navCtrl.setRoot(TabsPage);
      //  if(flag==true && flag!='wrong'){
      //    if(this.user_type=='sales')
      //     this.navCtrl.setRoot(HomePage,{"data":getData,"user_type":this.user_type});
      //    else
      //      this.navCtrl.setRoot("ChatDetailPage",{"data":getData,"user_type":this.user_type});
         
      //  }
      
     });
   
     toast.present();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
