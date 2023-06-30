import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
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

    private validateRequest(request: any){
        const jwtString = request.headers.authorization.split('Bearer ')[1];

        const {userId, email} = this.authService.verify(jwtString);

        /**
         * 인가 시 header의 authorization에 있는 토근의 정보를 읽어 로그인한 회원 정보를 request 객체에 담아 사용할 수 있음.
         */
        request.user = {
            userId: userId,
            email: email   
        }

        return true;
    }

}