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

    const bodyForLog = {
      statusCode: status,
      message: message,
      stack: stack,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    console.error(bodyForLog);

    response.status(status).json({
      errorCode: status,
      message: message,
    });
  }
}
