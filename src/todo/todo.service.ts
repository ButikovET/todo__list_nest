import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(
    createTodoDto: CreateTodoDto,
  ): Promise<{ result: Todo; totalItems: number }> {
    const createdTodo = new this.todoModel(createTodoDto);
    const result = await createdTodo.save();
    const totalItems = await this.todoModel.collection.countDocuments();
    return { result, totalItems };
  }

  async findAll(
    id: string,
    pageNum: number,
    ammountInOnePage: number,
  ): Promise<{ todoItems: Todo[]; numberOfItems: number }> {
    const totalItems = await this.todoModel.collection.countDocuments();
    return {
      todoItems: await this.todoModel
        .find({ author_id: id })
        .sort({ updatedAt: -1 })
        .limit(ammountInOnePage)
        .skip((pageNum - 1) * Number(ammountInOnePage)),
      numberOfItems: totalItems,
    };
  }

  async findOne(id: string) {
    return await this.todoModel.findById(id).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.todoModel.findByIdAndUpdate(id, updateTodoDto);
  }

  async updateAllIsDone(updateTodoDto: UpdateTodoDto, tasks_id): Promise<any> {
    return await this.todoModel.updateMany(
      { _id: { $in: tasks_id } },
      { isDone: updateTodoDto },
    );
  }

  async remove(id: string) {
    const totalItems = (await this.todoModel.collection.countDocuments()) - 1;
    return {
      deletedItem: await this.todoModel.findByIdAndDelete(id),
      totalItems,
    };
  }

  async removeAllDone(tasks_id: string[]): Promise<any> {
    const totalItems = await this.todoModel.collection.countDocuments();
    return {
      deletedItems: await this.todoModel.deleteMany({ _id: { $in: tasks_id } }),
      totalItems: totalItems - tasks_id.length,
    };
  }
}
