import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { UsersEntity } from './user/users.entity';
import { PswUsersEntity } from "./user/psw-user.entity";
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import configuration from './configuration';
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CodifModule } from './codif/codif.module';
import { PmModule } from './pm/pm.module';


@Module({
  imports: [
    // Модуль обслуживания статических файлов
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/logs/`,
      serveRoot: `/logs/`,
    }),
    // Модуль конфигурации
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    // Модуль работы с СУБД
    TypeOrmModule.forRoot({
      name: 'znodePg',
      type: "postgres",
      host: configuration().database.pg.host,
      port: configuration().database.pg.port,
      database: configuration().database.pg.database,
      username: configuration().database.pg.username,
      password: configuration().database.pg.password,
      entities: [UsersEntity, PswUsersEntity],
      synchronize: true,
      logging: ['error', 'warn'],
      logger: 'advanced-console',
    }),
    /* TypeOrmModule.forRoot({
      name: 'znodeMongo',
      type: "postgres",
      host: config.db.server,
      port: config.db.port,
      database: config.db.dbName,
      username: config.db.username,
      password: config.db.password,
      entities: [],
      synchronize: true,
      logging: ['error', 'warn'],
      logger: 'advanced-console',
    }), */
    
    UserModule,
    AuthModule,
    CodifModule,
    PmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Подключен логгер
      .apply(LoggerMiddleware)
      .forRoutes("user");
  }
}

