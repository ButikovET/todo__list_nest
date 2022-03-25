import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users, UsersDocument } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users>{
    const bcrypt = require('bcrypt');
    createUsersDto.password = await bcrypt.hash(createUsersDto.password, 10);
    const createdUsers = new this.usersModel(createUsersDto);
    const ifUserExists = await this.findByUsername(createdUsers.username);    
    if(!ifUserExists){
      const result = createdUsers.save();
      return result
    }
    else throw new Error('User allready exists')
  }

  async findByUsername(username: string) {
    return this.usersModel.findOne({ username });
  }

  async update(id, updateUsersDto: UpdateUsersDto) {
    return this.usersModel.findOneAndUpdate(id, updateUsersDto);
  }

  async remove(updateUsersDto: UpdateUsersDto) {
    return this.usersModel.findOneAndDelete(updateUsersDto);
  }
}









// This should be a real class/interface representing a user entity
// export type User = any;

// @Injectable()
// export class UsersService {
//   private readonly users = [
//     {
//       userId: 1,
//       username: 'john',
//       password: 'changeme',
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess',
//     },
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find(user => user.username === username);
//   }
// }