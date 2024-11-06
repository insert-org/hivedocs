import { CredentialsSignin } from 'next-auth';

export class UserNotFound extends CredentialsSignin {
  constructor() {
    super();
    this.code = "Usuário não encontrado";
  }
}

export class GoogleAccount extends CredentialsSignin {
  constructor() {
    super();
    this.code = "Email vinculado a uma conta Google";
  }
}

export class IncorrectPassword extends CredentialsSignin {
  constructor() {
    super();
    this.code = "Senha incorreta";
  }
}