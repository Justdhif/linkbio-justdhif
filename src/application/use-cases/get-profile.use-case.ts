import { IProfileRepository } from '../../domain/repositories/profile.repository'
import { Profile } from '../../domain/entities/profile.entity'

export class GetProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(): Promise<Profile> {
    return await this.profileRepository.getProfile()
  }
}
