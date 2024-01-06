import { IsNotEmpty , IsEmail } from "class-validator"

export class LoginUserDto {

    userName: string

    email: string

    @IsNotEmpty()
    passwords: string

}
