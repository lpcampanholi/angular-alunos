import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EstudantesComponent } from './pages/estudantes/estudantes.component';
import { DetalhesEstudanteComponent } from './pages/detalhes-estudante/detalhes-estudante.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'estudantes',
    component: EstudantesComponent
  },
  {
    path: 'estudantes/novo',
    component: DetalhesEstudanteComponent
  },
  {
    path: 'estudantes/:id',
    component: DetalhesEstudanteComponent
  }
];
