import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-saved-filters',
  templateUrl: './saved-filters.component.html',
  styleUrls: ['./saved-filters.component.css']
})
export class SavedFiltersComponent implements OnInit {
  data: any={}
  constructor(private util: UtilService) { }

  ngOnInit() {
    this.generate()
    this.util.saveFilterClicked.subscribe(a=>this.generate())
  }

  apply(index: number){
    this.util.applyFilter(index)
  }

  delete(index: number){
    var arrIndex = this.data.index.indexOf(index);
    if (arrIndex !== -1) {
      this.data.index.splice(arrIndex, 1);
    }   
    this.util.setIndex(this.data.index)
    this.util.deleteFilter(index.toString())
    this.generate()
  }

  async generate(){
    var index = await this.util.getIndex()
    this.data.index=index
    this.data.saved_time=[]
    this.data.stats=[]
    this.data.loc=[]
    this.data.time=[]
    for(var i in this.data.index){
      this.data.stats[i]=''
      this.data.loc[i]=''
      var filter: any = await this.util.retrieveFilter(this.data.index[i])
      this.data.saved_time[i]=filter.data.date
      this.data.time[i]= filter.data.start_date+" to "+filter.data.end_date
      if(filter.data.filter[0]){
        this.data.stats[i]+="New_case, "
      }
      if(filter.data.filter[1]){
        this.data.stats[i]+="Cumulative_case, "
      }
      if(filter.data.filter[2]){
        this.data.stats[i]+="New_death, "
      }
      if(filter.data.filter[3]){
        this.data.stats[i]+="Cumulative_death, "
      }
      if(filter.data.filter[4]){
        this.data.stats[i]+="New_recovered, "
      }
      if(filter.data.filter[5]){
        this.data.stats[i]+="Cumularive recovered"
      }
      if(filter.data.filter[6]){
        this.data.loc[i]+="Federal, "
      }
      if(filter.data.filter[7]){
        this.data.loc[i]+="Provincial, "
      }
      if(filter.data.filter[8]){
        this.data.loc[i]+="Regional"
      }
    }
  }



}
