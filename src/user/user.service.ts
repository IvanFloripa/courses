import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  saltOrRounds: number = 10;

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashPass = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    const dataUser = {
      ...createUserDto,
      password: hashPass,
    };
    return this.prisma.user.create({
      data: dataUser,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashPass = await bcrypt.hash(
      updateUserDto.password,
      this.saltOrRounds,
    );
    const dataUser = {
      ...updateUserDto,
      password: hashPass,
    };
    return this.prisma.user.update({
      where: { id },
      data: dataUser,
    });
  }
  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log(user);
    console.log(password);
  }
}
