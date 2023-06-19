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
    console.log(circuitCreate);
    return circuitCreate;
  }

  async findAll(): Promise<Circuit[]> {
    const listCircuits = await this.circuitsModule.find();
    return listCircuits;
  }

  async findOne(id: string): Promise<Circuit> {
    const circuit = await this.circuitsModule.findById(id);
    return circuit;
  }

  async findByCompetitionId(competitionId: string): Promise<Circuit[]> {
    const circuits = await this.circuitsModule.find({
      competition_id: competitionId,
    });
    return circuits;
  }

  async update(
    id: string,
    updateCircuitDto: UpdateCircuitDto,
  ): Promise<Circuit> {
    const updatedCircuit = await this.circuitsModule.findByIdAndUpdate(
      id,
      updateCircuitDto,
    );
    return updatedCircuit;
  }

  async remove(id: string): Promise<Circuit> {
    const deletedCircuit = await this.circuitsModule.findByIdAndDelete(id);
    return deletedCircuit;
  }
}
