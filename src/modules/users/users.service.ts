import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PrismaService from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { hash , compare} from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){}
  async createNewUser(body: CreateUserDto) {
    try {
      let user = await this.prisma.user.create(
        {
          data:{
            ...body,
            passwords:await hash(body.passwords,5),
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

  async login(loginDetail:LoginUserDto){
    try {
      let user = await this.prisma.user.findUnique({
        where:{
          userName:loginDetail.userName
        }
      })
      if (user == null) {
        throw {
            message:"Account was not found!"
        }
      }

      if (user.status == false) {
        throw {
          message:"This account was freezed!"
        }
      }

      let checkPassword = await compare(loginDetail.passwords,user.passwords)
      if (checkPassword) {
        return {
          message:"Login Success!",
          token: sign(user,process.env.HASH_PRIVATE_KEY)
        }
      }else{
        throw {
          message:"Passwords incorrect!"
        }
      }
    } catch (error) {
      return error
    }
  }
}
