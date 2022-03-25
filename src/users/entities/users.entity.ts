import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
    @Prop({default: 'https://picsum.photos/200'})
    photo: string;
    @Prop()
    croppedPhoto :string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);