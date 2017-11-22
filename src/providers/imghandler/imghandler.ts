
import { Injectable } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';


@Injectable()
export class ImghandlerProvider {
  firestore = firebase.storage();
nativepath: any;
  constructor(public filechooser:FileChooser) {
  }

  uploadimage() {
    let user = firebase.auth().currentUser.uid;
  //  console.log(user);
    //var imageStore = this.firestore.ref(user).child('/profilepic');alert(imageStore);
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });//alert("aalo ikde"+imageStore);
                  var imageStore = this.firestore.ref('/profileimages').child(user);
                  imageStore.put(imgBlob).then((res) => {alert("aalo bagh");
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                      resolve(url);
                    }).catch((err) => {
                        reject(err);
                    })
                  }).catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })
     return promise;
  }

}
