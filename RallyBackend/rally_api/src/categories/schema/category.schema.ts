//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//import { Team } from 'src/teams/schema/team.schema';

// TODO: Define the Circuit schema

export type CategoriesDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  circuit_id: string;

  @Prop()
  description: string;

  @Prop()
  winning_team: string;

  @Prop()
  participantTeamsIds: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
