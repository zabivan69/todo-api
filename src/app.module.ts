import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrmConfig from './config/orm.config';
import { AuthModule } from './modules/Auth/auth.module';
import { TaskModule } from './modules/Tasks/task.module';
import { UserModule } from './modules/Users/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TaskModule,
    TypeOrmModule.forRoot(OrmConfig),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
