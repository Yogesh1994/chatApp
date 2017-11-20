import { Injectable } from '@angular/core';
import { usercredentials } from '../../model/interface/usercredentials';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthProvider {

  credentials = {} as usercredentials;
  constructor(public authfire:AngularFireAuth) {
    
  }

  login(credentials:usercredentials){
    var promise  = new Promise((resolve,reject)=>{
      this.authfire.auth.signInWithEmailAndPassword(credentials.email,credentials.password).then((res:any)=>{
          resolve(true);
      }).catch((error)=>{
          reject(false);
      });
      
    })
    return promise;
  }

}
