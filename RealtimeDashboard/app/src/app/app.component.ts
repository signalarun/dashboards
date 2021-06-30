import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const mySocket = io('http://localhost:8080');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Realtime Dashboard Demo';
  chart: any;
  
  ngOnInit(){ 
  
    mySocket.on('dashboardupdate', (res) => {
      console.log('update recieved');
      this.updateFromServer(this.chart, res, 0);
    });
    
    this.chart = new Chart('bar-chart', {
      type: 'bar',
      options: {
        responsive: true
      },
      data: {
        labels: ["India", "China", "United States", "Indonesia", "Pakistan"],
        datasets: [
          {
            type: 'bar',
            label: 'Vaccination',
            data: [243, 156, 365, 30, 156],
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            borderColor: 'rgba(255,0,255,0.4)'
          }
 
        ]
      }
    });

    

    // Bar chart
    /*this.x = new Chart("bar", {
      type: 'bar',
      data: {
        labels: ["China", "India", "United States", "Indonesia", "Pakistan"],
        datasets: [
          {
            label: "Population",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: []
          }
        ]
      },
      options: {

        title: {
          display: true,
          text: 'Population in 2020'
        }
      }
    });*/

  };

  updateFromServer(chart:any, data:any, dataSetIndex:any) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }

}
