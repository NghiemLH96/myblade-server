import { Controller, Get, Post, Body, Patch, Param, Delete , Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto, @Res() res:Response) {
    try {
      let {message ,error , data} = await this.usersService.createNewUser({...body})
      if (error) {
        throw error
      }
      return res.status(200).json({
        message,
        data
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Post("login")
  async login(@Body() body:LoginUserDto, @Res() res:Response){
    try {
      let {message , error , token} = await this.usersService.login(body)
      if (error) {
        throw error
      }
      return res.status(200).json({
        message,
        token
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error"
      })
    }
  }
}
