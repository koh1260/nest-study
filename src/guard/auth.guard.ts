import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { NotFoundError, Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService){}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        if(!request.headers.authorization){
            throw new UnauthorizedException();
        }
        return this.validateRequest(request);
    }

    private validateRequest(request: Request){
        const jwtString = request.headers.authorization.split('Bearer ')[1];

        this.authService.verify(jwtString);

        return true;
    }

}