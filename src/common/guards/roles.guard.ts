import { string } from "@hapi/joi";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // Метод проверки есть ли данная роль у пользователя
  checkRole(arrRoleName: Array<string>, arrRolesUser: Array<string>): boolean {
    let result: boolean = false;
    arrRoleName.map((roleName) => {
      if (arrRolesUser.includes(roleName)) {
        result = true;
      }
    });
    return result;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return false; // было true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.checkRole(roles, user.roles);
  }
}
