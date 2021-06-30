import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private $loading = new BehaviorSubject(false);

  private requestSet: Set<string> = new Set<string>();

  constructor() { }

  showLoading(url: string): void {
    if (url) {
      this.requestSet.add(url);
      // next ==>  es lo mismo que el emit, pero en este caso emitimos un observable
      this.$loading.next(true);
    }
  }

  hideLoading(url: string): void {
    if (url) {
      this.requestSet.delete(url);
    
      if (this.requestSet.size === 0) {
        this.$loading.next(false);
      } 
    }  
  }

  get loading(): Observable<boolean> {
    return this.$loading.asObservable();
  }
}
