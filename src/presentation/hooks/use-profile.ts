import { useState, useEffect } from 'react'
import { Profile } from '../../domain/entities/profile.entity'
import { GetProfileUseCase } from '../../application/use-cases/get-profile.use-case'
import { StaticProfileRepository } from '../../infrastructure/repositories/static-profile.repository'

const defaultRepository = new StaticProfileRepository()
const defaultGetProfileUseCase = new GetProfileUseCase(defaultRepository)

export function useProfile(getProfileUseCase: GetProfileUseCase = defaultGetProfileUseCase) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    getProfileUseCase
      .execute()
      .then((data) => {
        if (isMounted) {
          setProfile(data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [getProfileUseCase])

  return { profile, isLoading, error }
}
