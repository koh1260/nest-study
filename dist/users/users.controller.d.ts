import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLogininDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from './decorator/user.logined';
import { WinstonLogger } from 'nest-winston';
interface User {
    userId: string;
    email: string;
}
export declare class UsersController {
    private usersService;
    private authService;
    private readonly logger;
    constructor(usersService: UsersService, authService: AuthService, logger: WinstonLogger);
    createUser(dto: CreateUserDto): Promise<void>;
    findAll(): Promise<() => Promise<UserInfo[]>>;
    verifyEmail(dto: VerifyEmailDto): Promise<string>;
    login(dto: UserLogininDto): Promise<string>;
    printWinston(dto: any): void;
    getHello(user: User): void;
    getUserInfo(headers: any, userId: string): Promise<UserInfo>;
}
export {};
