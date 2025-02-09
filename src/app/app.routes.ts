import { Routes } from '@angular/router';
import { autenticadoGuard } from './guards/autorizado.guard';
import { CadastreseComponent } from './pages/cadastre-se/cadastre-se.component';
import { DetalhesEstudanteComponent } from './pages/detalhes-estudante/detalhes-estudante.component';
import { DetalhesUsuarioComponent } from './pages/detalhes-usuario/detalhes-usuario.component';
import { EstudantesComponent } from './pages/estudantes/estudantes.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastrar',
    component: CadastreseComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [autenticadoGuard]
  },
  {
    path: 'usuarios/novo',
    component: DetalhesUsuarioComponent,
    canActivate: [autenticadoGuard]
  },
  {
    path: 'usuarios/:id',
    component: DetalhesUsuarioComponent,
    canActivate: [autenticadoGuard]
  },
  {
    path: 'estudantes',
    component: EstudantesComponent,
    canActivate: [autenticadoGuard]
  },
  {
    path: 'estudantes/novo',
    component: DetalhesEstudanteComponent,
    canActivate: [autenticadoGuard]
  },
  {
    path: 'estudantes/:id',
    component: DetalhesEstudanteComponent,
    canActivate: [autenticadoGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
