import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo>{
    const createdTodo = new this.todoModel(createTodoDto)
    const result = createdTodo.save();
    return result
  }

  async findAll(id): Promise<Todo[]> {
    return await this.todoModel.find({author_id: id}).exec();
  }

  async findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto);
  }

  async updateAllIsDone(updateTodoDto: UpdateTodoDto) {
    return this.todoModel.updateMany({"isDone": updateTodoDto});
  }

  async remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }

  async removeAllDone(){
    return this.todoModel.deleteMany({"isDone":true});
  }
}
