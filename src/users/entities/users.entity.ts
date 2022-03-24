import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Binary } from 'bson';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    username: string;
    @Prop({required: true})
    password: string;
    @Prop()
    photo: Binary;
    @Prop()
    croppedPhoto :string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);