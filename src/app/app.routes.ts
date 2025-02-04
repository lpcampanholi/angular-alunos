import { Routes } from '@angular/router';
import { EstudantesComponent } from './pages/estudantes/estudantes.component';
import { FormularioEstudanteComponent } from './pages/formulario-estudante/formulario-estudante.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'usuarios/novo',
    component: DetalhesUsuariosComponent
  },
  {
    path: 'usuarios/:id',
    component: DetalhesUsuariosComponent
  },
  {
    path: 'estudantes',
    component: EstudantesComponent
  },
  {
    path: 'estudantes/novo',
    component: FormularioEstudanteComponent
  },
  {
    path: 'estudantes/:id',
    component: FormularioEstudanteComponent
  }
];
