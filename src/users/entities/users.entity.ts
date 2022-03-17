import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({required: true})
    username: string;
    @Prop({required: true})
    password: string;
    @Prop({required: true})
    name: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);