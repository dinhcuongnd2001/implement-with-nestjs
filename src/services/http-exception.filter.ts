// catch all http exception before send to the user

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message =
      typeof exception.getResponse() === 'string'
        ? exception.getResponse()
        : (exception.getResponse() as { message: string }).message;

    // level 1: log:
    new LoggerService().warn(request.url, 'ExceptionFilter');

    // level 2: write to file

    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
