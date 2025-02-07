import { Routes } from '@angular/router';
import { DetalhesEstudanteComponent } from './pages/detalhes-estudante/detalhes-estudante.component';
import { DetalhesUsuarioComponent } from './pages/detalhes-usuario/detalhes-usuario.component';
import { EstudantesComponent } from './pages/estudantes/estudantes.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CadastreSeComponent } from './pages/cadastre-se/cadastre-se.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/novo', component: DetalhesEstudanteComponent },
  { path: 'usuarios/:id', component: DetalhesUsuarioComponent },
  { path: 'estudantes', component: EstudantesComponent },
  { path: 'estudantes/novo', component: DetalhesEstudanteComponent },
  { path: 'estudantes/:id', component: DetalhesEstudanteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastreSeComponent },
  { path: '**', redirectTo: 'login' }
];
