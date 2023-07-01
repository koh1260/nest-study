import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";
import { expression } from "joi";
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from "nest-winston";

@Catch()
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter{
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: WinstonLogger
    ){}

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>()
        const req = ctx.getResponse<Request>();

        if(!(exception instanceof HttpException)){
            exception = new InternalServerErrorException();
        }

        const response = (exception as HttpException).getResponse();

        const log = {
            timestamp: new Date(),
            url: req.url,
            response,
        }
        this.logger.getWinstonLogger().info(log);

        res.status((exception as HttpException).getStatus()).json(response);
    }
}