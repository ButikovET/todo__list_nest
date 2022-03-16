import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://User:User@todo-list.xof4m.mongodb.net/todo-list?retryWrites=true&w=majority'
      ),
    TodoModule,
    AuthModule,
    UsersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
