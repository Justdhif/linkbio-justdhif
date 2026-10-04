import { Profile } from '../entities/profile.entity'

export interface IProfileRepository {
  getProfile(): Promise<Profile>
}
