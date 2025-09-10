import { Field } from '@nestjs/graphql';

export class BaseModel {
  @Field(() => String, { description: 'The ID of the resource' })
  id: string;

  @Field(() => Date, { description: 'The date the resource was created' })
  created_at: Date;

  @Field(() => Date, { description: 'The date the resource was last updated' })
  updated_at: Date;
}
