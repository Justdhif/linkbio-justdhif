import { ClipboardService } from '../../infrastructure/services/clipboard.service'

export class CopyLinkUseCase {
  async execute(url: string): Promise<boolean> {
    return await ClipboardService.copyText(url)
  }
}
