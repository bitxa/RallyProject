import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamResultDocument = HydratedDocument<TeamResult>;

@Schema()
export class TeamResult {
  @Prop()
  team_name: string;

  @Prop()
  competition: string;

  @Prop()
  category: string;

  @Prop()
  circuit: string;

  @Prop()
  circuit_times: Array<string>;

  @Prop()
  total_circuit_times: number;
}

export const TeamResultSchema = SchemaFactory.createForClass(TeamResult);
