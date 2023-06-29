import { UserInfo } from './UserInfo';
import { EmailService } from 'src/email/email.service';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersService {
    private authService;
    private emailService;
    private userRepository;
    private dataSource;
    constructor(authService: AuthService, emailService: EmailService, userRepository: Repository<UserEntity>, dataSource: DataSource);
    private saveUserUsingTransaction;
    findAll(): Promise<UserInfo[]>;
    login(email: string, password: string): Promise<string>;
    createUser(name: string, email: string, password: string): Promise<void>;
    private checkUserExist;
    private saveUser;
    private sendMemberJoinEmail;
    verifyEmail(signupVerifyToken: string): Promise<string>;
    getUserInfo(userId: string): Promise<UserInfo>;
}
