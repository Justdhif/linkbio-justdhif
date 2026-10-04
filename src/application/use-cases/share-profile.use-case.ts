import { ShareService } from '../../infrastructure/services/share.service'
import { Profile } from '../../domain/entities/profile.entity'

export class ShareProfileUseCase {
  async execute(profile: Profile, currentUrl: string): Promise<boolean> {
    if (ShareService.canShare()) {
      return await ShareService.share({
        title: `${profile.displayStyledName} | Linktree`,
        text: profile.bio,
        url: currentUrl,
      })
    }
    return false
  }
}
