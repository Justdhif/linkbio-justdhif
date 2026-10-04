export interface ShareDataPayload {
  title: string
  text?: string
  url: string
}

export class ShareService {
  static canShare(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.share
  }

  static async share(payload: ShareDataPayload): Promise<boolean> {
    if (this.canShare()) {
      try {
        await navigator.share(payload)
        return true
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing content', err)
        }
        return false
      }
    }
    return false
  }
}
