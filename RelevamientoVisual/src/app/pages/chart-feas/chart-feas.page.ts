import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { CameraService } from 'src/app/services/camera.service';
import { LoadingController } from '@ionic/angular';
import { Global } from 'src/app/global';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-chart-feas',
  templateUrl: './chart-feas.page.html',
  styleUrls: ['./chart-feas.page.scss'],
})
export class ChartFeasPage {

  @ViewChild('chart',{"static":false}) chart;

  bars: any;
  colors: Array<string>;
  images: Array<object>;
  labels: Array<string>;
  data: Array<string>;
  imageObject: object;

  constructor(
    private cameraService:CameraService, 
    private global: Global,
    public loadingController: LoadingController,
    private notificationService: NotificationService
  ) { }

  ionViewDidEnter() {
    this.getAllImages().then(() => {
      this.createChart();
    });  
  }

  createChart() {
    this.bars = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Votos en unidades',
          data: this.data,
          backgroundColor: this.colors,
          borderColor: this.colors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  
  getAllImages(){
    this.notificationService.presentLoading(2000, "Cargando gráfico");
    this.initiateArrays();
    return new Promise((resolve) => {
      this.cameraService.getAllImages(this.global.type).then((images: firebase.storage.ListResult) => {
        images.items.forEach((image:firebase.storage.Reference) => {
          let imageName = image.name;
          Promise.all([image.getDownloadURL(),
            this.cameraService.getOnce("images", imageName),
            this.cameraService.getOnce("votes", imageName)
          ]).then(values => {
            let votes = values[2].get("votes") || 0;
            if(votes > 0){
              this.images.push({"url": values[0], "name": imageName, "date":values[1].get("date"), "user": values[1].get("user")});
              this.labels.push(imageName);
              this.data.push(values[2].get("votes"));
              this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
              setTimeout(function() { resolve() }, 1000);
            }
          })
        })
      })
    })
  }

  initiateArrays(){
    this.images = []; 
    this.labels = [];
    this.data = [];
    this.colors = [];
  }

  showImage(event){
    let element = this.bars.getElementAtEvent(event)[0];
    if(element) {
      let elementName = this.labels[element._index];
      this.imageObject = this.images.filter((data:any) => data.name == elementName)[0];
    }
  }
}
