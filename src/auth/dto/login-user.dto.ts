import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    example: 'cns',
  })
  username: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;
}
