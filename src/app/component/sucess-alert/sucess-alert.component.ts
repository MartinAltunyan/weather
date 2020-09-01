import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostsService } from "./posts.service"
import { Weather } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sucess-alert',
  templateUrl: './sucess-alert.component.html',
  styleUrls: ['./sucess-alert.component.css']
})
export class SucessAlertComponent implements OnInit {
  myData = {}
  cityName = "";
  enteredContent = "";

  weather: Weather[] = [];
  weatherAll: Weather[] = [];
  private weatherSub: Subscription;

  constructor(public postsService: PostsService) {

  }

  ngOnInit(): void {


  }


  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.getWeather(form.value.cityName);
    this.weatherSub = this.postsService.getWeatherUpdateListener()
      .subscribe((weather: Weather[]) => {
      
        this.weatherAll = weather;
       
        this.weatherAll.forEach(weath => {
          const myTime = new Date(weath.dt_txt)
          const formatedDate = `${myTime.getMonth() + 1}/${myTime.getDate()}`
          weath.formatedDate = formatedDate
          weath.formatedTime =  `${myTime.getHours()}:${myTime.getMinutes()<10?0:''}${myTime.getMinutes()}`
        })
        this.weather = this.weatherAll.slice(this.weatherAll.length - 1)
        console.log(this.weather);
      })


    // console.log(form.value.cityName);
    form.resetForm();
  }

  fiveDaysView() {

    this.weather = this.weatherAll.slice(0, 5)



    console.log("%%%%%%%%% ", this.weather);

  }

}


