import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  currentWeather: any = null;
  forecast: any[] = [];
  currentDate: string = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  constructor(
    private weatherService: WeatherService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.city$.subscribe((city) => {
      if (city) {
        this.weatherService.getCurrentWeather(city).subscribe((data) => {
          this.currentWeather = data;
        });

        this.weatherService.getFiveDayForecast(city).subscribe((data) => {
          this.forecast = data.list
            .filter((item: any) => item.dt_txt.includes('12:00:00'))
            .map((item: any) => {
              const date = new Date(item.dt_txt);
              return {
                ...item,
                day: this.formatDay(date),
                date: this.formatDate(date),
              };
            });
        });
      }
    });
  }
  private formatDay(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const day = date.toLocaleDateString('es-ES', options);
    return day.charAt(0).toUpperCase() + day.slice(1);
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('es-ES', options);
    const parts = formattedDate.split(' de ');
    const formattedDateWithComma = `${parts[0]} de ${parts[1]}, ${parts[2]}`;
    return formattedDateWithComma;
  }
}
