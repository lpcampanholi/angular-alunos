import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoDestaqueComponent } from './botao-destaque.component';

describe('BotaoDestaqueComponent', () => {
  let component: BotaoDestaqueComponent;
  let fixture: ComponentFixture<BotaoDestaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoDestaqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
