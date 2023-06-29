import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        EmailModule,
        AuthModule,
        // entity 등록, repository pattern 지원, injectRepository로 주입
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
