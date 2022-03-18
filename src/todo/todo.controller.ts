import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
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
    };
    return this.todoService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request) {
    return this.todoService.findAll(request.user.sub)
    .then((resp) => {
      return { todoItems: resp, name: request.user.username };
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
  updateAllIsDone(@Body('isDone') updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateAllIsDone(updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeAllDone() {
    return this.todoService.removeAllDone();
  }
}
