import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/* Декоратор пользователя
Забирает данные из Express, конкретно из req.user
и передает их туда где они нужны
*/
export const IsUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
