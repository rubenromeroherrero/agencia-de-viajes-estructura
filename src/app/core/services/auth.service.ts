import { Injectable } from '@angular/core';
import { Usuario } from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
  
// GESTIONA LA SEGURIDAD
// SERVICIO QUE GUARDA UN USUARIO EN EL LOCAL STORAGE
export class AuthService {
  
  // le damos un nombre al usuario introducido en el localStorage
  private readonly APP_USER = 'APP_USER';

  constructor() { }
  
  // devolverá booleano si hay un usuario en el localStorage
  get isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  // obtener el bearer
  get bearer(): string {
    // cogemos el usuario del localStorage, en tipo string
    const b = localStorage.getItem(this.APP_USER);

    if (b) {
      // parseamos para convertirlo en objeto de tipo usuario
      const user: Usuario = JSON.parse(b);
      // devolvemos lla info que nos interesa del objeto, que es el bearer
      return user.bearer;
    }

    return '';
  }

  get user(): Usuario | null {
    const b = localStorage.getItem(this.APP_USER);

    return b ? new Usuario(JSON.parse(b)) : null;
  }

  // comprobar el rol de usuario
  hasUserRole(role: string): boolean {
    console.log(this.user);
    return this.user ? this.user.rol === role : false;
  }

  storeUser(usuario: Usuario) {
    // guardamos el usuario loggeado en el localStorage como string
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
  }

  logOutUser(): void {
    // nos cargamos del localStorage el usuario que hemos creado al logearnos
    localStorage.removeItem(this.APP_USER);
  }

  // initializeRefreshToken(usuario: Usuario) {
    
  // }

}
