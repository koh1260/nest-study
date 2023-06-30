import { Head, Header, Headers, Injectable, InternalServerErrorException, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { NotFoundError } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        private authService: AuthService,
        private emailService: EmailService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private dataSource: DataSource,
    ){}

    getHello(): string{
        this.logger.debug('level: debug');

        return 'Hello World';
    }

    /**
     * QueryRunner Transaciton
     */
    // private async saveUserUsingQueryRunner(name: string, email: string, password: string, signupVerifyToken: string){
    //     const queryRunner = this.dataSource.createQueryRunner();

    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();

    //     try{
    //         const user = new UserEntity();
    //         user.id = ulid();
    //         user.email = email;
    //         user.name = name;
    //         user.password = password;
    //         user.signupVerifyToekn = signupVerifyToken;

    //         await queryRunner.manager.save(user);
    //         // throw new InternalServerErrorException();
    //         await queryRunner.commitTransaction();
    //     }catch(e){
    //         await queryRunner.rollbackTransaction();
    //     }finally{
    //         await queryRunner.release();
    //     }
    // }

    /**
     * Transaction, entity manager
     */
    private async saveUserUsingTransaction(name: string, email: string, password: string, signupVerifyToken: string){
        await this.dataSource.transaction(async manager => {
            const user = new UserEntity();
            user.id = ulid();
            user.email = email;
            user.name = name;
            user.password = password;
            user.signupVerifyToekn = signupVerifyToken;

            await manager.save(user);
        })
    }

    async findAll(): Promise<UserInfo[]>{
        throw new Error('Method not implemented');
    }

    async login(email: string, password: string): Promise<string>{
        const user = await this.userRepository.findOneBy({
            email: email
        });

        if(!user){
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }

    async createUser(name: string, email: string, password: string){
        const userExist = await this.checkUserExist(email);
        if(userExist){
            throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
        }

        const signupVerifyToken = uuid.v1();

        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);
    }


    private async checkUserExist(email: string){
        const user = await this.userRepository.findOne({
            where: {email: email}
        });

        return user !== null;
    }

    private async saveUser(name: string, email: string, password: string, signupVerifyToken: string){
        const user = new UserEntity();
        user.id = ulid();
        user.name = name;
        user.password = password;
        user.email = email;
        user.signupVerifyToekn = signupVerifyToken;
        await this.userRepository.save(user);

        return;
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string){
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }

    async verifyEmail(signupVerifyToken: string): Promise<string>{
        // TODO
        // 1. DB에서 signupVerifyToken으로 회원가입 처리 중인 유저가 있는지 조회하고 없다면 에러 처리
        // 2. 바로 로그인 상태가 되도록 JWT 발급
        const user = await this.userRepository.findOneBy({
            signupVerifyToekn: signupVerifyToken
        });

        if(!user){
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email
        })
    }

    async getUserInfo(userId: string): Promise<UserInfo>{
        // TODO
        // 1. userID를 가진 유저가 존재하는지 DB에서 확인 없다면 에러
        // 2. 조회된 데이터를 UserInfo 타입으로 응답
        const user = await this.userRepository.findOneBy({
            id: userId
        });

        if(!user){
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
