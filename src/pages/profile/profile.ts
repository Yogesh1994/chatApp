import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;

  constructor(public imghandler: ImghandlerProvider, public zone: NgZone, public alertCtrl: AlertController, public userservice: UserProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.loaduserdetail();
  }
  loaduserdetail() {

    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      console.log(this.displayName);
      this.zone.run(() => {
        this.avatar = res.photoURL;
      });

    })
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile pic was not changed');
        statusalert.present();
      })
    })
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Nickname',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Edit',
          handler: data => {
            if (data.nickname) {
              this.userservice.updatedisplayname(data.nickname).then((res: any) => {
                if (res.success) {
                  statusalert.setTitle('Updated');
                  statusalert.setSubTitle('Your nickname has been changed successfully!!');
                  statusalert.present();
                  this.zone.run(() => {
                    this.displayName = data.nickname;
                  })
                } else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('Your nickname was not changed');
                  statusalert.present();
                }

              })
            }
          }

        }
      ]
    });
    alert.present();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage');
    })
  }


}


