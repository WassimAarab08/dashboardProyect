import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  pageTitle = signal<string>('');
  turnOn= signal(true)
  pageDescription = signal<string>('');

  setTitle(title: string) {
    this.pageTitle.set(title);
  }
  setDescription(description: string) {
    this.pageDescription.set(description);
  }

  setPageInfo(title: string, description: string ): void {
    this.pageTitle.set(title);
    this.pageDescription.set(description);
  }
  turnOff(){
     this.turnOn.set(false)
  }
}
