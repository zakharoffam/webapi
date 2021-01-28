import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Ошибка сервера';

    const stack =
      exception instanceof HttpException
        ? exception.stack
        : exception;

    // Формирование объекта для добавление в лог iisnode
    const bodyForLog = {
      timestamp: new Date(),
      hash: 'Добавить хеш запроса',
      statusCode: status,
      message: message,
      result: stack,
      request: {
        method: request.method,
        url: request.url,
        params: request.params,
        query: request.query,
        body: request.body,
        user: 'Add user account',
        userAgent: request.headers['user-agent']
      },
    };
    // Добавление в лог iisnode
    console.error(bodyForLog);

    // Отправляем ответ пользователю
    response.status(status).json({
      timestamp: new Date(),
      hash: 'Добавить хеш запроса',
      statusCode: status,
      message: message,
      result: 'Error'
    });
  }
}
