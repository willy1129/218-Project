import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
const STORAGEURL: string='https://218.selfip.net//apps/QJ0h89gKh3/collections/data/documents/'

@Injectable({
  providedIn: 'root'
})



export class UtilService {
  @Output() applyFilterClicked = new EventEmitter<string>();
  @Output() saveFilterClicked = new EventEmitter<string>();
  filters: boolean[] = []
  start_date: string=""
  end_date: string=""
  data: any[] = []
  constructor(private http: HttpClient) { }

  setFilter(filters: boolean[]){
    this.filters=filters
  }

  setStartDates(date: string){
    this.start_date=date
  }

  setEndDates(date: string){
    this.end_date=date
  }

  getStartDates(){
    return this.start_date
  }

  getEndDates(){
    return this.end_date
  }


  getFilter(){
    return this.filters
  }

  getDate(){
    return this.data
  }

  async getIndex(){
    var url = STORAGEURL+"index/"
    const src = this.http.get(url)
    var index: any= await lastValueFrom(src)
    return index.data
  }

  setIndex(data: any){
    var url = STORAGEURL+"index/"
    var obj: any={}
    obj.key="index"
    obj.data=data
    this.http.put(url, obj).subscribe()
  }

  async getCount(){
    var url = STORAGEURL+"count"
    const src = this.http.get(url)
    var count: any= await lastValueFrom(src)
    return count.data
  }

  setCount(count: number){
    var obj: any={}
    obj.key = "count"
    obj.data = count
    var url = STORAGEURL+"count/"
    this.http.put(url,obj).subscribe()
  }

  async retrieveFilter(key: string){
    var getUrl = STORAGEURL+key
    const src = this.http.get(getUrl)
    var filter = await lastValueFrom(src) 
    return filter
  }

  async saveFilter(data: any, key:string){
    var obj :any={}
    obj.key=key
    obj.data=data
    var index =<Array<any>> await this.getIndex()
    index.push(key)
    this.setIndex(index)
    this.http.post(STORAGEURL,obj).subscribe()
    this.saveFilterClicked.emit()
  }

  deleteFilter(key: string){
    var deleteUrl=STORAGEURL+key+'/'  
    this.http.delete(deleteUrl).subscribe()
  }

  toChartData(){
    var chartData: any[] =[];
    for(var i in this.data){
      chartData[i]={}
      chartData[i].series=[]
    }
    if('Health_Region' in this.data[0]){
      
      for(var i in this.data){
        if(this.data[i].Health_Region!==undefined){
          chartData[i].name=this.data[i].Health_Region        }
      }
    }
    else if('Province' in this.data[0]){
      for(var i in this.data){
        if(this.data[i].Province!==undefined){
          chartData[i].name=this.data[i].Province
        }
        
      }
    }
    else{
      chartData[0].name='Canada'
    }
    for(var i in chartData){
      var j=0
      if('New_case' in this.data[i]&&this.data[i].New_case!==undefined){
        chartData[i].series[j]={}
        chartData[i].series[j].name='New_case'
        chartData[i].series[j].value=this.data[i].New_case
        j++
      }
      if('Cumulative_case' in this.data[i]&&this.data[i].Cumulative_case!==undefined){
        chartData[i].series[j]={}
        chartData[i].series[j].name='Cumulative_case'
        chartData[i].series[j].value=this.data[i].Cumulative_case
        j++
      }
      if('New_death' in this.data[i]&&this.data[i].New_death!==undefined){
        chartData[i].series[j]={}
        chartData[i].series[j].name='New_death'
        chartData[i].series[j].value=this.data[i].New_death
        j++
      }
      if('Cumulative_death' in this.data[i]&&this.data[i].Cumulative_death!==undefined){
        chartData[i].series[j]={}
        chartData[i].series[j].name='Cumulative_death'
        chartData[i].series[j].value=this.data[i].Cumulative_death
        j++
      }
      if('New_recovered' in this.data[i]&&this.data[i].New_recovered!==undefined){
        chartData[i].series[j]={}
        chartData[i].series[j].name='New_recovered'
        chartData[i].series[j].value=this.data[i].New_recovered
        j++
      }
      if('Cumulative_recovered' in this.data[i]&&this.data[i].Cumulative_recovered!==undefined){
        chartData[i].series[j]={}
        chartData[i].series[j].name='Cumulative_recovered'
        chartData[i].series[j].value=this.data[i].Cumulative_recovered
        j++
      }
    }
    return chartData
  }

  filterStats(stats: any[], filter: boolean[], s_date: string, e_date:string){
    //filter order:0: n_case 1:c_case 2:n_death 3: c_death 4: n_recovered 5: c_recovered 6:Fed 7:Prov 8:HR
    var dateStat: any[]=[]
    var newS_date= s_date[8]+s_date[9]+'-'+s_date[5]+s_date[6]+'-'+ s_date.slice(0,4)
    var newE_date= e_date[8]+e_date[9]+'-'+e_date[5]+e_date[6]+'-'+ e_date.slice(0,4) 
    if(s_date!=e_date){
      let i : number=0
      let j : number=0
      dateStat[j]={}
        while( i< stats.length){
          if(stats[i].date==newS_date){
            dateStat[j].province=stats[i].province
            dateStat[j].health_region=stats[i].health_region
            dateStat[j].cases=stats[i].cases
            dateStat[j].deaths=stats[i].deaths
            dateStat[j].recovered=stats[i].recovered
          }
          else{
            dateStat[j].cases+=stats[i].cases
            dateStat[j].deaths+=stats[i].deaths
            dateStat[j].recovered+=stats[i].recovered
          }
          if(stats[i].date==newE_date){
            dateStat[j].cumulative_cases=stats[i].cumulative_cases
            dateStat[j].cumulative_deaths=stats[i].cumulative_deaths
            dateStat[j].cumulative_recovered=stats[i].cumulative_recovered
            j++
            dateStat[j]=[]
          }
          i++
        }
        stats = dateStat
        stats.pop()
    }
    
    var newStats: any[]= []
    for(let i in stats){
      newStats[i] = {}
    }
    if(filter[6]){
      for(let i in stats){
        newStats[i].Federal="Canada" 
      }
    }
    if(filter[7]){
      for(let i in stats){
        newStats[i].Province=stats[i].province
      }
    }
    if(filter[8]){
      for(let i in stats){
        newStats[i].Health_Region=stats[i].health_region
      }
    }
      if(filter[0]){
        for(let i in stats){
          newStats[i].New_case=stats[i].cases
        }
      }
      if(filter[1]){
        for(let i in stats){
          newStats[i].Cumulative_case=stats[i].cumulative_cases
        }
      }
      if(filter[2]){
        for(let i in stats){
          newStats[i].New_death=stats[i].deaths
        }
      }
      if(filter[3]){
        for(let i in stats){
          newStats[i].Cumulative_death=stats[i].cumulative_deaths
        }
      }
      if(filter[4]){
        for(let i in stats){
          newStats[i].New_recovered=stats[i].recovered
        }
      }
      if(filter[5]){
        for(let i in stats){
          newStats[i].Cumulative_recovered=stats[i].cumulative_recovered
        }
      }
    this.data=newStats
    return newStats
  }

  async applyFilter(index: number){
    var src =<any> await this.retrieveFilter(index.toString())
    var filter=src.data.filter
    this.setFilter(filter)
    this.setStartDates(src.data.start_date)
    this.setEndDates(src.data.end_date)
    this.applyFilterClicked.emit()
  }

}

