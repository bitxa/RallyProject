import { Injectable } from '@nestjs/common';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Circuit, CircuitsDocument } from './schema/circuit.schema';
import { Model } from 'mongoose';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectModel(Circuit.name) private circuitsModule: Model<CircuitsDocument>,
  ) {}
  async create(createCircuitDto: CreateCircuitDto): Promise<Circuit> {
    const circuitCreate = await this.circuitsModule.create(createCircuitDto);
    return circuitCreate;
  }

  async findAll(): Promise<Circuit[]> {
    const listCircuits = await this.circuitsModule.find();
    return listCircuits;
  }

  async findOne(id: number): Promise<Circuit> {
    const circuit = await this.circuitsModule.findById(id);
    return circuit;
  }

  update(id: number, updateCircuitDto: UpdateCircuitDto): Promise<Circuit> {
    const updatedCircuit = this.circuitsModule.findByIdAndUpdate(
      id,
      updateCircuitDto,
    );
    return updatedCircuit;
  }

  remove(id: number): Promise<Circuit> {
    const deletedCircuit = this.circuitsModule.findByIdAndDelete(id);
    return deletedCircuit;
  }
}
