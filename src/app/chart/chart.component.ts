import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  data :any[] = []

  constructor(private util: UtilService) { }
  view: any[] = [1900, 800];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Location';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Amount';
  legendTitle: string = 'Type of stats';
  ngOnInit(): void {
    console.log(this.data)
  }

  render(){
    var data = this.util.toChartData()
    this.data=data
    console.log(data)
  }

}
