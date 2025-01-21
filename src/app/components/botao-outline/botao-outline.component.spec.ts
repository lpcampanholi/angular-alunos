import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoOutlineComponent } from './botao-outline.component';

describe('BotaoOutlineComponent', () => {
  let component: BotaoOutlineComponent;
  let fixture: ComponentFixture<BotaoOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoOutlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
