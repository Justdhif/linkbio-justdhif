import { useState, useCallback } from 'react'
import { CopyLinkUseCase } from '../../application/use-cases/copy-link.use-case'

const defaultCopyUseCase = new CopyLinkUseCase()

export function useClipboard(copyUseCase: CopyLinkUseCase = defaultCopyUseCase) {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copy = useCallback(
    async (text: string) => {
      const success = await copyUseCase.execute(text)
      if (success) {
        setCopiedText(text)
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      }
      return success
    },
    [copyUseCase]
  )

  return { copy, isCopied, copiedText }
}
