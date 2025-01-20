import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogExcluirComponent } from './alert-dialog-excluir.component';

describe('AlertDialogExcluirComponent', () => {
  let component: AlertDialogExcluirComponent;
  let fixture: ComponentFixture<AlertDialogExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogExcluirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
