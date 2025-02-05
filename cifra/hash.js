import {createHash} from 'crypto';

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = this.criaHash(senha);
  }

  criaHash(senha) {
    return createHash('sha256').update(senha).digest('hex');
  }

  autentica(nome, senha) {
    if (nome === this.nome && this.criaHash(senha) === this.hash) {
      console.log('Usuário autenticado');
      return true;
    }
    console.log('Usuário ou senha incorretos');
    return false;
  }

}

const usuario = new Usuario('joao manoel', 'minhaSenha');
console.log(usuario);
usuario.autentica('joao manoel', 'minhaSenha');
usuario.autentica('joao manoel', 'minhasenha');
