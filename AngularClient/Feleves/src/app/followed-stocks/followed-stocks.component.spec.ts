import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedStocksComponent } from './followed-stocks.component';

describe('FollowedStocksComponent', () => {
  let component: FollowedStocksComponent;
  let fixture: ComponentFixture<FollowedStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowedStocksComponent]
    });
    fixture = TestBed.createComponent(FollowedStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
