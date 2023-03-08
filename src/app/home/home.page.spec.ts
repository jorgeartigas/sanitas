import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill array with 4000 items', () => {
    const obj = component['fillArray']();
    expect(obj).toHaveSize(4000);
  });

  it('should filter items based on id or text', () => {
    const event = { detail: { value: 'test' } };

    component.originalItems = [
      { id: 1, photo: 'url1', text: 'testing' },
      { id: 2, photo: 'url2', text: 'bar' }
    ];

    component.handleFilter(event);

    expect(component.items).toEqual([{ id: 1, photo: 'url1', text: 'testing' }]);
  });

  it('should return a string with atleast 1 word and a max of 5', () => {
    const result = component['generateRandomText']();
    expect(typeof result).toBeInstanceOf(String);
    expect(result.split(' ').length).toBeGreaterThan(0);
    expect(result.split(' ').length).toBeLessThan(6);
  });
});
