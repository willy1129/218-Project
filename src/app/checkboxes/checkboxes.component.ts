import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DataGetterService } from '../data-getter.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css'],
  inputs: ['data'],
  outputs: ['dataChange']
})



export class CheckboxesComponent implements OnInit {
  form!: FormGroup
  data: Array<boolean> = []
  dataChange: EventEmitter<Array<boolean>> = new EventEmitter();
  ngOnInit(): void {
    this.form = new FormGroup({
    });
    this.filterChange()
  }


  constructor(private dataGetter: DataGetterService, private util: UtilService ) { }
    statCheckboxes: any=[
    {
      name: "New Cases",
      checked: false
    },

    {
      name: 'Cumulative Cases',
      checked: false
    },

    {
      name: 'New Deaths',
      checked: false
    },

    {
      name: 'Cumulative Deaths',
      checked: false
    },

    {
      name: 'New Recovered',
      checked: false
    },

    {
      name: 'Cumulative Recovered',
      checked: false
    },

  ]

  locCheckboxes: any=[
    {
      name: "Federal",
      checked: false
    },

    {
      name: 'Provincial',
      checked: false
    },

    {
      name: 'Regional',
      checked: false
    },

  ]

  filterChange(evt?: any){
    var data: boolean[]=[]
    var stats=<any>document.getElementsByClassName("stat_checkbox")
    var locations=<any>document.getElementsByClassName("loc_checkbox")
    var startDate = <any>document.getElementById("start_date")
    var endDate = <any>document.getElementById("end_date")
    for(let i in stats){
      data.push(stats[i].checked)
    }
    for(let i=0; i<3; i++){
      data.pop()
    }
    for(let i in locations){
      data.push(locations[i].checked)
    }
    for(let i=0; i<3; i++){
      data.pop()
    }
    this.util.setFilter(data)
    this.util.setStartDates(startDate.value)
    this.util.setEndDates(endDate.value)
  }


 
  async saveFilter(){
    var date = new Date()
    var dateStr = date.toLocaleString()
    var test = await <any>this.util.getCount()
    var obj: any={}
    obj.filter = 1;
    obj.filter = this.util.getFilter()
    if(obj.filter.length==[]){
      for(var i=0; i<9; i++){
        obj.filter[i]=false
      }
    }
    obj.date = dateStr
    obj.start_date = this.util.getStartDates()
    obj.end_date = this.util.getEndDates()
    var count = await this.util.getCount()
    count++
    this.util.setCount(count)
    this.util.saveFilter(obj, count)
  }




}



