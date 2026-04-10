import type { FormEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../PasswordGate.css'
import './AdminPortal.css'
import { downloadRegistrationsCsv } from '../lib/exportRegistrationsCsv'
import {
  getSanityClient,
  getSanityToken,
  LIST_REGISTRATIONS_QUERY,
  type RegistrationListRow,
} from '../lib/sanity'

const ADMIN_PASSWORD = 'uat00uat'
const ADMIN_STORAGE_KEY = 'marketing-engagement-admin-v1'

function formatProducts(products: string[] | undefined): string {
  if (!products?.length) return '—'
  return products.join(', ')
}

function formatDt(iso: string | undefined): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export function AdminPortal() {
  const [adminUnlocked, setAdminUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)

  const [rows, setRows] = useState<RegistrationListRow[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    if (!getSanityToken()) {
      setLoadError(
        'Sanity is not configured. Set VITE_SANITY_API_TOKEN in web/.env and restart the dev server.',
      )
      setRows([])
      return
    }
    setLoading(true)
    setLoadError(null)
    try {
      const client = getSanityClient()
      const data = await client.fetch<RegistrationListRow[]>(
        LIST_REGISTRATIONS_QUERY,
      )
      setRows(data ?? [])
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : 'Could not load registrations.'
      setLoadError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (adminUnlocked) {
      void load()
    }
  }, [adminUnlocked, load])

  const login = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (pw === ADMIN_PASSWORD) {
        try {
          sessionStorage.setItem(ADMIN_STORAGE_KEY, '1')
        } catch {
          /* ignore */
        }
        setPwError(false)
        setAdminUnlocked(true)
        return
      }
      setPwError(true)
    },
    [pw],
  )

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setAdminUnlocked(false)
    setRows([])
    setPw('')
    setLoadError(null)
  }, [])

  const exportCsv = useCallback(() => {
    if (rows.length === 0) return
    downloadRegistrationsCsv(rows)
  }, [rows])

  if (!adminUnlocked) {
    return (
      <div className="pg-overlay">
        <div className="pg-card">
          <h1 className="pg-title">Admin</h1>
          <p className="pg-desc">Enter the admin password to view submissions.</p>
          <form onSubmit={login}>
            <div className="pg-field">
              <label className="pg-label" htmlFor="admin-pw">
                Password
              </label>
              <input
                id="admin-pw"
                className="pg-input"
                type="password"
                autoComplete="current-password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value)
                  setPwError(false)
                }}
                placeholder="Password"
              />
            </div>
            {pwError ? (
              <p className="pg-error" role="alert">
                Incorrect password.
              </p>
            ) : null}
            <button type="submit" className="pg-submit">
              Sign in
            </button>
          </form>
          <p className="admin-footer-link">
            <Link to="/">Back to site</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1 className="admin-title">Registration submissions</h1>
        <div className="admin-actions">
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={() => void load()}
            disabled={loading}
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={exportCsv}
            disabled={loading || rows.length === 0}
            title={
              rows.length === 0
                ? 'Load submissions first'
                : 'Download all rows as CSV'
            }
          >
            Download CSV
          </button>
          <button type="button" className="admin-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      {loadError ? (
        <p className="admin-banner admin-banner--error" role="alert">
          {loadError}
        </p>
      ) : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Submitted</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>FP code</th>
              <th>WA / WeChat</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {loading && rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-table__empty">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-table__empty">
                  No submissions yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r._id}>
                  <td>{formatDt(r._createdAt)}</td>
                  <td>
                    {[r.surname, r.firstName].filter(Boolean).join(' ') || '—'}
                  </td>
                  <td>{r.email || '—'}</td>
                  <td>{r.mobile || '—'}</td>
                  <td>{r.plannerCode || '—'}</td>
                  <td className="admin-table__spec">
                    {r.contactMethodDetail?.trim() || '—'}
                  </td>
                  <td className="admin-table__products">
                    {formatProducts(r.products)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-detail-wrap">
        <h2 className="admin-h2">All fields (latest first)</h2>
        {rows.length === 0 ? (
          <p className="admin-muted">No rows to show.</p>
        ) : (
          <ul className="admin-cards">
            {rows.map((r) => (
              <li key={r._id} className="admin-card">
                <p className="admin-card__meta">{formatDt(r._createdAt)}</p>
                <dl className="admin-dl">
                  <div>
                    <dt>FP code</dt>
                    <dd>{r.plannerCode ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>FP surname</dt>
                    <dd>{r.plannerSurname ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Surname</dt>
                    <dd>{r.surname ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>First name</dt>
                    <dd>{r.firstName ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Mobile</dt>
                    <dd>{r.mobile ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>{r.email ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Seminar</dt>
                    <dd>
                      {r.seminarDate ?? '—'} · {r.seminarTime ?? '—'}
                    </dd>
                  </div>
                  <div>
                    <dt>HK visit</dt>
                    <dd>{r.hkVisit ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Income</dt>
                    <dd>{r.income ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Meet slot</dt>
                    <dd>{r.meetSlot ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Contact</dt>
                    <dd>{r.contactMethod ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>WhatsApp / WeChat detail</dt>
                    <dd>{r.contactMethodDetail?.trim() || '—'}</dd>
                  </div>
                  <div>
                    <dt>Language</dt>
                    <dd>{r.meetLanguage ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Products</dt>
                    <dd>{formatProducts(r.products)}</dd>
                  </div>
                  <div>
                    <dt>Consent DM</dt>
                    <dd>{r.consentDm ? 'Yes' : 'No'}</dd>
                  </div>
                  <div>
                    <dt>Consent FP</dt>
                    <dd>{r.consentFp ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="admin-footer-link">
        <Link to="/">Back to site</Link>
      </p>
    </div>
  )
}
