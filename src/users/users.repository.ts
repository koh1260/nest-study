import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository extends Repository<UserEntity>{}