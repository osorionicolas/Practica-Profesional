import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { CameraService } from 'src/app/services/camera.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Global } from 'src/app/global';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage {
  
  @ViewChild('pieChart',{"static":false}) pieChart;

  bars: any;
  colorArray: any;  
  images: Array<object>;
  labels: Array<string>;
  data: Array<string>;
  imageObject: object;

  constructor(
    private cameraService:CameraService, 
    private navCtrl: NavController, 
    private global: Global,
    public loadingController: LoadingController
  ) { }

  ionViewDidEnter() {
    this.getAllImages().then(() => {
      this.createPieChart();
    });
  }

  createPieChart() {
    this.bars = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this.colorArray,
          borderColor: this.colorArray,
          borderWidth: 1
        }]
      }
    });
  }


  getAllImages(){
    this.presentLoading();
    this.images = new Array<object>(); 
    this.labels = new Array<string>(); 
    this.data = new Array<string>(); 
    this.colorArray = new Array<string>(); 
    return new Promise((resolve) => {
      this.cameraService.getAllImages(this.global.type).then((images: firebase.storage.ListResult) => {
        images.items.forEach((image:firebase.storage.Reference) => {
          Promise.all([image.getDownloadURL(),this.cameraService.getOnce("images", image.name), this.cameraService.getOnce("votes", image.name) ]).then(values => {
            this.images.push({"url": values[0], "name": image.name, "date":values[1].get("date"), "user": values[1].get("user"), "votes":values[2].get("votes") || 0});
            this.labels.push(image.name);
            this.data.push(values[2].get("votes") || 0);
            this.colorArray.push('#'+Math.floor(Math.random()*16777215).toString(16));
            resolve();
          })
        })
      }).catch(() => {
        this.navCtrl.navigateRoot("login");
      })
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Cargando gráfico"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  showImage(event){
    let element = this.bars.getElementAtEvent(event)[0];
    if(element) {
      let elementName = this.labels[element._index];
      this.imageObject = this.images.filter((data:any) => data.name == elementName)[0];
    }
  }
}
