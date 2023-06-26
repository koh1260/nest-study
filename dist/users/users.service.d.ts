import { UserInfo } from './UserInfo';
import { EmailService } from 'src/email/email.service';
export declare class UsersService {
    private emailService;
    constructor(emailService: EmailService);
    createUser(name: string, email: string, password: string): Promise<void>;
    private checkUserExist;
    private saveUser;
    private sendMemberJoinEmail;
    verifyEmail(signupVerifyToken: string): Promise<string>;
    login(email: string, password: string): Promise<void>;
    getUserInfo(userId: string): Promise<UserInfo>;
}
