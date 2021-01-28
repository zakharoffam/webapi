import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AllExceptionsFilter } from "src/common/exceptions/all-exception.filter";
import { AppModule } from "./app.module";
import { logger } from "./common/middlewares/logger.middleware";
/* import { RolesGuard } from './common/guard/roles.guard'; */
/* import { ValidationPipe } from './common/pipe/validation.pipe'; */



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  /* Включаем CORS */
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  });

  /* Используем глобального охраника */
  /* app.useGlobalGuards(new RolesGuard()); */

  /* Можно использовать Middleware'ы глобально */
  app.use(logger);

  /* Подключили глобальный фильтр-перехватчик всех исключений */
  app.useGlobalFilters(new AllExceptionsFilter());

  /* Можно использовать Pipe'ы глобально */
  /* app.useGlobalPipes(new ValidationPipe); */
  await app.listen(port, () => {
    console.log(`[${new Date()}] Сервер запущен. Прослушивается порт ${port}`);
  });
}
bootstrap();
