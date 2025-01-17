import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { DetalhesAlunoComponent } from './components/detalhes-aluno/detalhes-aluno.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'alunos',
    component: AlunosComponent
  },
  {
    path: 'alunos/:id',
    component: DetalhesAlunoComponent
  }
];
