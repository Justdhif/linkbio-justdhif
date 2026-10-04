import { IProfileRepository } from '../../domain/repositories/profile.repository'
import { Profile } from '../../domain/entities/profile.entity'
import { mockProfileData } from '../data/profile.mock'

export class StaticProfileRepository implements IProfileRepository {
  async getProfile(): Promise<Profile> {
    // Simulated async fetch to reflect real-world repository pattern
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProfileData)
      }, 50)
    })
  }
}
