//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Sponsor } from 'src/sponsors/schema/sponsor.schema';
//import { Category } from 'src/categories/schema/category.schema';

//TODO el schema de los Circuitos
export type CircuitsDocument = HydratedDocument<Circuit>;

@Schema()
export class Circuit {
  @Prop()
  competition_id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  track_lenght: number;

  @Prop()
  location: string;
  /*

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }],
  })
  sponsor: Sponsor[];


   * 'length' property name refactored to 'track_length'

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categories: Category[];
     */
}
export const CircuitsSchema = SchemaFactory.createForClass(Circuit);
