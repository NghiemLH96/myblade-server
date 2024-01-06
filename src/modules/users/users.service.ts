import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PrismaService from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){}
  async createNewUser(body: CreateUserDto) {
    try {
      let user = await this.prisma.user.create(
        {
          data:{
            ...body,
            avatar:"123"
          }
        }
      )     
      return {
        message:"create successed",
        data:user
      }
    } catch (error) {
      if (error.code == "P2002") {
        if(error.meta.target == "User_email_key"){
          return {
            error:"Email was existed"
          }
        }
        if (error.meta.target == "User_userName_key") {
          return {
            error:"UserName was existed!"
          }
        }
      }
    }
  }
}
