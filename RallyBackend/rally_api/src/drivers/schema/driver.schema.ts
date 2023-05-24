import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema()
export class Driver {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  identification: string;

  @Prop()
  blood_type: string;

  @Prop()
  emergencyContact: string;

  @Prop()
  province: string;

  @Prop()
  city: string;

  @Prop()
  current_category: string;
}

export const DriversSchema = SchemaFactory.createForClass(Driver);
