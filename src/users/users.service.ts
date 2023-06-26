import { Injectable } from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
    constructor(private emailService: EmailService) {}

    async createUser(name: string, email: string, password: string){
        await this.checkUserExist(email);

        const signupVerifyToken = uuid.v1();

        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);
    }

    private checkUserExist(email: string){
        return false;
    }

    private saveUser(name: string, email: string, password: string, signupVerifyToken: string){
        return;
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string){
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }

    async verifyEmail(signupVerifyToken: string): Promise<string>{
        // TODO
        // 1. DB에서 signupVerifyToken으로 회원가입 처리 중인 유저가 있는지 조회하고 없다면 에러 처리
        // 2. 바로 로그인 상태가 되도록 JWT 발급

        throw new Error('Method not implemented');
    }

    async login(email: string, password: string){
        // TODO
        // 1. email, passwd를 가진 유저가 존재하는지 DB에서 확인 없다면 에러 처리
        // 2. JWT 발급

        throw new Error('Method not implemented');
    }

    async getUserInfo(userId: string): Promise<UserInfo>{
        // TODO
        // 1. userID를 가진 유저가 존재하는지 DB에서 확인 없다면 에러
        // 2. 조회된 데이터를 UserInfo 타입으로 응답

        throw new Error('Method not implemented');
    }
}