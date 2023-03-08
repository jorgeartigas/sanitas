import { ArrayItem } from './../models/arrayItem.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {
  public originalItems: ArrayItem[] = [];
  public items: ArrayItem[] = [];
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  ngOnInit(): void {
    this.originalItems = this.fillArray();
    this.items = [...this.originalItems];
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.viewPort.checkViewportSize();
    }, 1);
  }

  // Aqui también deberiamos meter toda la logica en un servicio

  private fillArray(): ArrayItem[] {
    const array: ArrayItem[] = [];
    for (let i = 0; i < 4000; i++) {
      array.push({
        id: i,
        photo: `https://loremflickr.com/320/240?lock=${i}`,
        text: this.generateRandomText()
      });
    }
    return array;
  }

  public handleFilter(event: any): void {
    const filter = event.detail.value.toLowerCase();
    const filtered = this.originalItems.filter(
      (item) => item.id == filter || item.text.toLowerCase().includes(filter)
    );
    this.items = filtered;
  }

  private generateRandomText(): string {
    const loremIpsumWords = [
      'Lorem',
      'ipsum',
      'dolor',
      'sit',
      'amet',
      'consectetur',
      'adipiscing',
      'elit',
      'sed',
      'do',
      'eiusmod',
      'tempor',
      'incididunt',
      'ut',
      'labore',
      'et',
      'dolore',
      'magna',
      'aliqua'
    ];

    let result = '';
    const wordsLength = loremIpsumWords.length;
    const length = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    for (let i = 0; i < length; i++) {
      const randomWordIndex = Math.floor(Math.random() * wordsLength);
      const randomWord = loremIpsumWords[randomWordIndex];
      result += randomWord + ' ';
    }

    return result.trim();
  }
}
