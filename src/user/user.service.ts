/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtots/create-user.dto';
import { UpdateUserDto } from 'src/dtots/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  //ajouter un utilisateur
  async create(createUser: CreateUserDto): Promise<UserEntity> {
    if (createUser.confirm_password != createUser.password) {
      throw new BadRequestException('Your passwords are not conforme');
    }
    const { email, password } = createUser;
    //verfif si email existe deja
    const existUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (existUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = this.userRepository.create({
      ...createUser,
      password: hashedPassword,
    });
    return this.userRepository.save(newuser);
  }

  //liste des utilisateurs
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  //trouver un user
  async findbyId(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (user) {
      return user;
    }
    throw new BadRequestException('User id not found');
  }
  async findbyEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user) {
      return user;
    }
    throw new BadRequestException('User email not found');
  }

  //function update
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (user) {
      // Mise à jour des champs modifiés
      const updatedUser = Object.assign(user, updateUserDto);

      return this.userRepository.save(updatedUser);
    }
    throw new BadRequestException('User id not found');
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
  async restore(id: string): Promise<void> {
    await this.userRepository.restore(id);
  }
  async findAllUser(): Promise<UserEntity[]> {
    // Pour obtenir tous les utilisateurs, y compris ceux qui sont "soft deleted"
    return this.userRepository.find({ withDeleted: true });
  }
}
