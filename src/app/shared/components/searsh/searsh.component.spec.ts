import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearshComponent } from './searsh.component';

describe('SearshComponent', () => {
  let component: SearshComponent;
  let fixture: ComponentFixture<SearshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
