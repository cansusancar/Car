import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
constructor()
{
super();

}
async onModuleInit()
{
    await this.$connect();
}
async onModuleDestroy(){
    await this. $disconnect();
    
}

}
