import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Circuit } from 'src/circuits/schema/circuit.schema';

//TODO el schema de los Circuitos
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

  /*
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Circuit' }],
  })
  circuits: Circuit[];
  */
}
export const CompetitionsSchema = SchemaFactory.createForClass(Competition);
