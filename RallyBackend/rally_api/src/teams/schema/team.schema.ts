import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  name: string;

  @Prop()
  car_number: number;

  @Prop()
  driver: string;

  @Prop()
  copilot: string;
}
export const TeamsSchema = SchemaFactory.createForClass(Team);
