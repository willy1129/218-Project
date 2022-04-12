import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { UtilService } from '../util.service';
import { DataGetterService } from '../data-getter.service';
import { Stats } from '../stats';



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})



export class DataTableComponent implements OnInit {
  tableDatas: any[] =[]
  start_date: string=''
  end_date: string=''
  dataChange: EventEmitter<Array<boolean>> = new EventEmitter();
  constructor(private util: UtilService, private dataGetter: DataGetterService, private changeDetector:ChangeDetectorRef) { }
      stats? :Stats 
  ngOnInit(): void {
    this.util.applyFilterClicked.subscribe(a=>this.generateTable())
  }

  ngOnChanges(){

  }

  async generateTable(){
    var loc="canada";
    var filters = this.util.getFilter();
    var start_date = this.util.getStartDates();
    var end_date = this.util.getEndDates();
    if(filters[8]){
      loc='hr'
    }
    else if(filters[7]){
      loc='prov'
    }
    var stat = await this.dataGetter.getStats(loc, start_date, end_date)
    stat=stat.summary
    this.start_date=start_date
    this.end_date = end_date
    var filteredStats = this.util.filterStats(stat, filters, start_date, end_date)
    this.tableDatas=filteredStats
  }

  returnZero() {
    return 0
  }


  sort(header: any){
    var str :string = header.key
    if(this.tableDatas[0][str]>this.tableDatas[1][str]){
      if(str=="Federal"||str=="Province"||str=="Health_Region"){
        this.tableDatas.sort((a,b)=>this.stringCompare(a,b,str))
      }
      else{
        this.tableDatas.sort((a, b)=>a[str]-b[str])
      }
    }
    else{
      if(str=="Federal"||str=="Province"||str=="Health_Region"){
        this.tableDatas.sort((a,b)=>this.stringCompare(b,a,str))
      }
      else{
        this.tableDatas.sort((a, b)=>b[str]-a[str])
      }
    }
  }

  stringCompare(a: any,b: any,str: string){
    if(a[str]<b[str]){
      return -1
    }
    if(a[str]>b[str]){
      return 1
    }
    return 0
  }


}

