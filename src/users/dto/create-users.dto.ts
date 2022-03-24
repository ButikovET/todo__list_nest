import { Binary } from "bson";

export class CreateUsersDto {
    name: string;
    username: string;
    password: string;
    photo: Binary;
    croppedPhoto: string;
}
