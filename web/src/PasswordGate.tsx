import type { FormEvent, ReactNode } from 'react'
import { useCallback, useState } from 'react'
import './PasswordGate.css'

const STORAGE_KEY = 'marketing-engagement-auth-v1'
const APP_PASSWORD = 'uat00uat'

type PasswordGateProps = {
  children: ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (value === APP_PASSWORD) {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1')
        } catch {
          /* ignore quota / private mode */
        }
        setError(false)
        setUnlocked(true)
        return
      }
      setError(true)
    },
    [value],
  )

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="pg-overlay">
      <div className="pg-card">
        <h1 className="pg-title">Protected</h1>
        <p className="pg-desc">Enter the password to open this experience.</p>
        <form onSubmit={submit}>
          <div className="pg-field">
            <label className="pg-label" htmlFor="pg-password">
              Password
            </label>
            <input
              id="pg-password"
              className="pg-input"
              type="password"
              name="password"
              autoComplete="current-password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setError(false)
              }}
              placeholder="Password"
            />
          </div>
          {error ? (
            <p className="pg-error" role="alert">
              That password is not correct. Try again.
            </p>
          ) : null}
          <button type="submit" className="pg-submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
