import { IsNotEmpty , IsEmail } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    userName: string

    @IsNotEmpty()
    passwords: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    avatar: string
}
