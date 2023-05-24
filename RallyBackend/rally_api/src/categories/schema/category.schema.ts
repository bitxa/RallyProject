import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Circuit } from 'src/circuits/schema/circuit.schema';
import { Driver } from 'src/drivers/schema/driver.schema';

//TODO el schema de los Circuitos
export type UsersDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Circuit' })
  circuits: Circuit[];

  @Prop()
  description: string;

  @Prop()
  winning_drivers: Driver[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],
  })
  drivers: Driver[];

  @Prop()
  password: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
