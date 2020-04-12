import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor(private afsAuth: AngularFireAuth){
    
  }
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     this.afsAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
    this.afsAuth.auth.signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => {
         console.log(res);
          /*this.dataApi.TraerUno(userData.user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {
            this.user.Uid = userx.Uid;
            this.user.Email = userx.Email;
            this.user.ImagenUrl = userx.ImagenUrl;
            this.user.Nombre = userx.Nombre;
            this.user.Perfil = userx.Perfil;
          });*/
        resolve(res)
       },
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(this.afsAuth.auth.currentUser){
        this.afsAuth.auth.signOut()
        .then(() => {
          console.log("Log Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  getCurrentUser(){
    return this.afsAuth.auth.currentUser;
  }

  getAuthStateChanged() {
    return new Promise((resolve, reject) => {
       const unsubscribe = this.afsAuth.auth.onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
       }, reject);
    });
  }
}
