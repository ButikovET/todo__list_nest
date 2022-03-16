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
    const createdUsers = new this.usersModel(createUsersDto)
    const result = createdUsers.save();
    console.log(result)
    return result
  }

  async findByUsername(username: string) {
    return this.usersModel.findOne({ username });
  }

  async update(updateUsersDto: UpdateUsersDto) {
    return this.usersModel.findOneAndUpdate(updateUsersDto);
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