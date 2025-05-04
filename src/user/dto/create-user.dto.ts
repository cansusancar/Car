import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma/client';


export class CreateUserDto implements Prisma.UserCreateInput {
  createdAt?: string | Date;
  updatedAt?: string | Date;


  // Swaggerda gözükmesi için bu parametreyi vermemiz gerekiyor.
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password:string;


}