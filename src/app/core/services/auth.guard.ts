import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){}

  // clase que funciona como un servicio, a traves de interfaz
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // checkear si es usuario o no para poder acceder a la pagina de admin
    // el requiredRole lo establecemos en el app-routing.module
    const roleRequired = route.data.requiredRole;
    // console.log(roleRequired);
    
    // si hay un true, es decir usuario en el localStorage, le permitimos acceder a las rutas
    if (this.authService.isUserAuthenticated) {

      // si se requiere un rol, comprobamos el rol, y si no se require rol, se da true
      return roleRequired ? this.authService.hasUserRole(roleRequired) : true;

   }

    // en caso de que no sea correcto, volvemos a redirigir a la página de login
    return this.router.createUrlTree(['login']);
    // this.router.navigate(['login']);
    // return false;
  }
  
}
