import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import { File } from "@ionic-native/file/ngx";
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
   
  constructor(
      private camera: Camera, 
      private file: File,
      private router: Router
  ) { }

  ngOnInit() {}
  
  async takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    try{
      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      let uploadInfo: any = await this.uploadToFirebase(blobInfo);

      alert("File Upload Success " + uploadInfo.fileName);
    } 
    catch (e) {
      console.log(e.message);
      this.router.navigate(['/error', { error : e.message }]);
    }
}

  uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage()
                        .ref("images/" + _imageBlobInfo.fileName);
      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      uploadTask.on(
        "state_changed",
        (_snap: any) => {
          console.log(
            "progess: " + Math.floor((_snap.bytesTransferred / _snap.totalBytes) * 100)
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      let fileName = "";
      console.log(_imagePath);
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;
          // get the path..
          let path = nativeURL
                      .substring(0, nativeURL.lastIndexOf("/"));
          fileName = name;
          // we are provided the name, so now read the file 
          // into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          
          // pass back blob and the name of the file for saving
          // into fire base
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

}