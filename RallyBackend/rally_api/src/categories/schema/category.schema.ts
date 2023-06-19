import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  circuit_id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  participantTeamsIds: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
