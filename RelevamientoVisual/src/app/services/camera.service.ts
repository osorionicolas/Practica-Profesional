import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import { File } from "@ionic-native/file/ngx";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private images: Array<string>;
  private type: string;

  constructor(
    private camera: Camera, 
    private file: File,
    private localNotifications: LocalNotifications,
    private toastController: ToastController,
    private afs: AngularFirestore,
    private afsAuth: AngularFireAuth
  ) { }

  async takePhoto(type:string){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      targetHeight: 600,
      targetWidth: 304
    }
    try{
      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo:any = await this.makeFileIntoBlob(cameraInfo);
      await this.uploadToFirebase(blobInfo, type);
      this.presentToast('Subida Realizada con Éxito', "success");
      let currentUser = this.getCurrentUser().email.split('@')[0];
      this.setDocument("images", blobInfo.fileName, { "user" : currentUser, "date": Date.now() })
    } 
    catch (e) { }
  }

  private makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;
          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          fileName = name;
          // we are provided the name, so now read the file into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          
          // pass back blob and the name of the file for saving into fire base
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  private uploadToFirebase(_imageBlobInfo, type) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref("images/" + type + "/" + _imageBlobInfo.fileName);
      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      uploadTask.on(
        "state_changed",
        (_snap: any) => {
          let percentage = Math.floor((_snap.bytesTransferred / _snap.totalBytes) * 100);
          console.log("progess: " + percentage);
            this.localNotifications.schedule({
              id: 1,
              text: 'Uploading Image ' + _imageBlobInfo.fileName,
              progressBar: { "value":  percentage}
            });
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
          this.localNotifications.cancel(1);
        }
      );
    });
  }

  getAllImages(type){
    return new Promise((resolve, reject) => {
      resolve(firebase.storage().ref("images").child(type).listAll());
    })
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top",
      color: color
    });
    toast.present();
  }

  setDocument(collection:string, id:string, object:object): void {
    this.afs.collection(collection).doc(id).set(object);
  }

  getOnce(collection, id){
    return this.afs.collection(collection).doc(id).get().toPromise();
  }

  getCurrentUser(){
    return this.afsAuth.auth.currentUser;
  }

  getObservableFromDocument(collection, id){
    return this.afs.collection(collection).doc(id).valueChanges();
  }

}
