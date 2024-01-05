import { Module, Global } from "@nestjs/common";
import { prismaService } from "./prisma.service";

@Global()
@Module({
    imports: [],
    controllers: [prismaService],
    providers: [prismaService],
  })

  export class prismaModule {}