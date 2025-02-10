import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = YOUR_API;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get(url);
  }

  getFiveDayForecast(city: string): Observable<any> {
    const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
