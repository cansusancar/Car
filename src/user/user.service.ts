import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  findAll() {
   return this.databaseService.user.findMany();
  }

 

  findOneLogin(idOrUsername: number | string): Promise<any> {
    if (typeof idOrUsername === 'number') {
      // ID ile kullanıcıyı bul
      return this.databaseService.user.findUnique({
        where: { id: idOrUsername },
      });
    } else if (typeof idOrUsername === 'string') {
      // Username ile kullanıcıyı bul
      return this.databaseService.user.findUnique({
        where: { username: idOrUsername },
      });
    }
    throw new Error('Invalid input: ID or Username expected');
  }

  async findOne(idOrUsername: number | string): Promise<any> {
    if (typeof idOrUsername === 'number') {
      return this.databaseService.user.findUnique({
        where: { id: idOrUsername },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
    } else if (typeof idOrUsername === 'string') {
      return this.databaseService.user.findUnique({
        where: { username: idOrUsername },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
    }
    throw new Error('Invalid input: ID or Username expected');
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
