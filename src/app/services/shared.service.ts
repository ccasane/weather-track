import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private citySource = new BehaviorSubject<string>('Chihuahua');
  city$ = this.citySource.asObservable();

  setCity(city: string): void {
    this.citySource.next(city);
  }
}
