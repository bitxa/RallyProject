import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Driver } from 'src/drivers/schema/driver.schema';

//TODO el schema de los Circuitos
export type CategoriesDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  circuits: string;

  @Prop()
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],
  })
  winning_drivers: Driver[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],
  })
  drivers: Driver[];

  @Prop()
  password: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
