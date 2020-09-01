import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Weather } from "./post.model"
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { NgModel } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private weather: Weather[] = [];
  private weatherUpdated = new Subject<Weather[]>();


  constructor(private http: HttpClient) { }

  getWeatherUpdateListener() {
    return this.weatherUpdated.asObservable();
  }

 
  getWeather(cityName: string): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    this.http.post(
      'http://localhost:3000/api/posts',
      { cityName: cityName },
      {headers: headers })
      .subscribe(data => {
        // @ts-ignore
        this.weather = data.list;
        this.weatherUpdated.next([...this.weather]);
      });   
  }

}

