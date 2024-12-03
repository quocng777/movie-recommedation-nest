import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "../dtos/response.dto";
import { catchError, map, Observable, throwError } from "rxjs";
import { Reflector } from "@nestjs/core";
import { RESPONSE_MESSAGE_METADATA } from "../decorators/response-message.decorator";

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
      ): Observable<Response<T>> {
        return next.handle().pipe(
          map((res: unknown) => this.responseHandler(res, context)),
          catchError((err: HttpException) =>
            throwError(() => this.errorHandler(err, context)),
          ),
        );
      }
     
      errorHandler(exception: HttpException & { customCode?: number}, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        const httpCode = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
     
        const status =
          exception.customCode ? 
          exception.customCode :
          httpCode
     
        response.status(httpCode).json({
          statusCode: status,
          message: exception.message,
          timestamp: new Date(),
        });
      }
     
      responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;
        const message =
        this.reflector.get<string>(
            RESPONSE_MESSAGE_METADATA,
            context.getHandler(),
        ) || HttpStatus.OK.toString();
     
        return {
          statusCode,
          data: res,
          timestamp: new Date(),
          message
        };
      }
}