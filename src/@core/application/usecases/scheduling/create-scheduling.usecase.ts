import { Scheduling } from '../../../domain/entities/scheduling.entity';
import { IValidation } from '../../../domain/interfaces/validation.interface';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { IProfessionalRepository } from '../../../domain/repositories/professional.repository';
import { ISchedulingRepository } from '../../../domain/repositories/scheduling.repository';
import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { IStatusRepository } from '../../../domain/repositories/status.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import {
  TInputSchedulingDTO,
  TOutputSchedulingDTO,
} from '../../dto/scheduling.dto';
import { mapOutput } from './util';

export class CreateSchedulingUsecase {
  constructor(
    private readonly schedulingRepository: ISchedulingRepository,
    private readonly statusRepository: IStatusRepository,
    private readonly serviceRepository: IServiceRepository,
    private readonly clientRepository: IClientRepository,
    private readonly professionalRepository: IProfessionalRepository,
    private readonly validator: IValidation,
    private readonly schema: object,
  ) {}

  async execute(data: TInputSchedulingDTO): Promise<TOutputSchedulingDTO> {
    const validated = this.validator.validate(this.schema, data);
    if (!validated.isValid) {
      throw new BadRequestException(validated.errorsResult);
    }

    const status = await this.statusRepository.findById(data.status_id);
    const service = await this.serviceRepository.findById(data.service_id);
    const client = await this.clientRepository.findById(data.client_id);
    const professional = await this.professionalRepository.findById(
      data.professional_id,
    );
    const scheduling = Scheduling.create({
      date: data.date,
      discount: data.discount,
      status,
      service,
      client,
      professional,
    });
    const result = await this.schedulingRepository.create(scheduling);
    return mapOutput(result);
  }
}
