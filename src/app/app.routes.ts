import { Routes } from '@angular/router';
import { EstudantesComponent } from './pages/estudantes/estudantes.component';
import { FormularioEstudanteComponent } from './pages/formulario-estudante/formulario-estudante.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'usuarios/novo',
    component: FormularioUsuarioComponent
  },
  {
    path: 'usuarios/:id',
    component: FormularioUsuarioComponent
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
