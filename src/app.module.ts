import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AiModule } from './ai/ai.module';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';

import { User } from './users/user.entity';
import { Note } from './notes/note.entity';
import { Subscription } from './subscriptions/subscription.entity';
import { Plan } from './plans/plan.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Note, Subscription, Plan],
      synchronize: true, // prod'da false olacak!
      autoLoadEntities: true,
    }),

    AuthModule,
    UsersModule,
    NotesModule,
    AiModule,
    PlansModule,
    SubscriptionsModule,
    PaymentsModule,
    UserModule,
  ],
})
export class AppModule {}
