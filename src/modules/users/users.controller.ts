import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      let { message, error, data } = await this.usersService.createNewUser({ ...body })
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
  async login(@Body() body: LoginUserDto, @Res() res: Response, @Req() req: Request) {
    try {
      console.log(req);

      let { message, error, token } = await this.usersService.login(body)
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

  @Post("upload")
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@UploadedFile() file: Express.Multer.File){
    let filename = `avatar_${Math.random()*Date.now()}.${file.mimetype.split("/")[1]}`
    writeFileSync(`public/img/${filename}`,file.buffer)
    return
  }
}
