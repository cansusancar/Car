import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Giriş yaparken şifre doğrulama ve JWT oluşturma
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneLogin(username);//burada databaseService.user.findUnique gibi bir yöntem de kullanılabilir?

    // Kullanıcı yoksa veya şifre yanlışsa, hatalı giriş yapıldığında
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isDeleted) {
      throw new UnauthorizedException('User is deleted');
    }

    // JWT token oluşturuluyor
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Yeni kullanıcı kaydı oluşturma
  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOne(
      createUserDto.username,
    );

    // Kullanıcı zaten varsa, hata ver
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Şifreyi hash'leyelim ve hash'lemenin başarılı olup olmadığını test edelim
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Hashleme işlemi başarılı ise kullanıcıyı oluştur
      if (!hashedPassword) {
        throw new Error('Password hashing failed');
      }

      const newUserDto = { ...createUserDto, password: hashedPassword };
      const resp = await this.usersService.create(newUserDto);
      if (resp) {
        return true;
      }
      throw new Error('User creation failed');
    } catch (error) {
      // Eğer hash'leme başarısız olursa, hata mesajı döndür
      throw new Error('Şifre hashlenemedi: ' + error.message);
    }
  }

  async deleteProfile(userId: number) {
    return this.usersService.remove(userId);
  }
}
