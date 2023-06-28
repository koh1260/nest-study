import { UserInfo } from './UserInfo';
import { EmailService } from 'src/email/email.service';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
export declare class UsersService {
    private emailService;
    private userRepository;
    private dataSource;
    constructor(emailService: EmailService, userRepository: Repository<UserEntity>, dataSource: DataSource);
    private saveUserUsingTransaction;
    findAll(): Promise<UserInfo[]>;
    createUser(name: string, email: string, password: string): Promise<void>;
    private checkUserExist;
    private saveUser;
    private sendMemberJoinEmail;
    verifyEmail(signupVerifyToken: string): Promise<string>;
    login(email: string, password: string): Promise<void>;
    getUserInfo(userId: string): Promise<UserInfo>;
}
