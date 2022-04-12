import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})



export class DataGetterService {
  constructor(private http: HttpClient, private util:UtilService) { }

  async getStats(loc: string, s_date: string, e_date:string) {
    var url = `https://api.opencovid.ca/summary?loc=${loc}&after=${s_date}&before=${e_date}`
      const src = this.http.get<any>(url)
      var stat = await lastValueFrom(src)
      return stat
  }
}
