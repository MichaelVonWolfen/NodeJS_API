import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credential.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDTO);
  }
  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accesToken: string }> {
    const { username, password } = authCredentialsDTO;
    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accesToken = await this.jwtService.sign(payload);
      return { accesToken };
    }
    throw new UnauthorizedException('Invalid Log In credentials!');
  }
}
