import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { AppResolver } from './app.resolver';
import { MModules } from './mongoose.modules';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostsModule } from './modules/posts/posts.module';
import { ServerApiVersion } from 'mongodb';
import { environment } from './environments/environment';

const dbCluster = environment.dbHost || 'localhost';
const dbUser = environment.dbUser || '';
const dbPass = environment.dbPass || '';
const uri = `mongodb+srv://${encodeURI(dbUser)}:${encodeURI(dbPass)}@${encodeURI(dbCluster)}.t0zjxyv.mongodb.net/?retryWrites=true&w=majority&appName=hosterlancluster`;

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    MongooseModule.forRoot(uri, {
      dbName: environment.dbName || 'hosterlan',
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    }),

    MModules,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
      context: ({ req }) => ({ req }),
      formatError: (error) => {
        return {
          message: error?.message,
          extensions: 
          {
            validationErrors:
              error?.extensions?.validationErrors || error?.message,
            stacktrace: error.extensions
          },
          locations: error?.locations,
          path: error?.path,
        };
      },
    }),

    EventEmitterModule.forRoot(),

    UserModule,
    JwtModule,
    AuthModule,
    ProfilesModule,
    PostsModule,
  ],
  providers: [
    AppService,
    AppResolver,
    AuthService
  ],
})
export class AppModule {}