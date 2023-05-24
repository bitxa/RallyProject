import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SponsorDocument = HydratedDocument<Sponsor>;

@Schema()
export class Sponsor {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;

  @Prop()
  web: string;

  @Prop()
  contact: string;
}

export const SponsorsSchema = SchemaFactory.createForClass(Sponsor);
