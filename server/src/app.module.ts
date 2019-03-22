import { Module } from '@nestjs/common'; 
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot('mongodb://localhost:27017/jobsapp'),
    UsersModule,
  ]
})
export class AppModule {}
