//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Circuit } from 'src/circuits/schema/circuit.schema';
import { Competitor } from 'src/competitors/schema/competitor.schema';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  name: string;

  @Prop()
  car_number: string;

  @Prop()
  driver: Competitor;

  @Prop()
  copilot: Competitor;
  /*
  @Prop()
  current_category: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competitor' }],
  })
circuits: Circuit[];
  */
}
export const CompetitionsSchema = SchemaFactory.createForClass(Team);
