import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAlunoComponent } from './detalhes-aluno.component';

describe('DetalhesAlunoComponent', () => {
  let component: DetalhesAlunoComponent;
  let fixture: ComponentFixture<DetalhesAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
