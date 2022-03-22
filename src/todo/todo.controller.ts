import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() request) {
    const dto: CreateTodoDto = {
      author_id: request.user.sub,
      text: request.body.text,
      completion_date: '',
    };
    return this.todoService.create(dto).then((response) => {
      return { newItem: response.result, totalItems: response.totalItems };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request) {
    return this.todoService
      .findAll(request.user.sub, request.query.page, request.query.ammount)
      .then((resp) => {
        return {
          todoItems: resp.todoItems,
          totalPages: Math.ceil(resp.numberOfItems / request.query.ammount),
          currentPage: request.query.page,
          name: request.user.username,
          todosInOnePage: request.query.ammount,
        };
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateAllIsDone(
    @Body('isDone') updateTodoDto: UpdateTodoDto,
    @Body('tasks_id') tasks_id: string[],
  ) {
    return this.todoService.updateAllIsDone(updateTodoDto, tasks_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id).then((resp) => {
      return { deletedItem: resp.deletedItem, totalItems: resp.totalItems };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeAllDone(@Body('tasks_id') tasks_id: string[]) {
    return this.todoService.removeAllDone(tasks_id).then((resp) => {
      return { deletedItems: resp.deletedItems, totalItems: resp.totalItems };
    });
  }
}
