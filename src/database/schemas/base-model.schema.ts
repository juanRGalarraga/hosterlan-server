import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class BaseModel {
  @Field(() => ID)
  _id: string;
  
  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, nullable: true })
  created_at?: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, nullable: true })
  updated_at?: Date;
}
