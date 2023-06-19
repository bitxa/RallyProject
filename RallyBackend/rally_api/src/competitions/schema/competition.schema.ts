import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompetitionsDocument = HydratedDocument<Competition>;

@Schema()
export class Competition {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  province: string;
}
export const CompetitionsSchema = SchemaFactory.createForClass(Competition);
