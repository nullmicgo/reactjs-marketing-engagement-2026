import type { RegistrationListRow } from './sanity'

const HEADERS = [
  'Document ID',
  'Submitted at (ISO)',
  'Planner code',
  'Planner surname',
  'Surname',
  'First name',
  'Mobile',
  'Email',
  'Seminar date',
  'Seminar time',
  'HK visit',
  'Income',
  'Meet slot',
  'Contact method',
  'WhatsApp / WeChat detail',
  'Language',
  'Products',
  'Consent direct marketing',
  'Consent FP contact',
] as const

function csvCell(v: unknown): string {
  if (v === null || v === undefined) {
    return '""'
  }
  let s: string
  if (typeof v === 'boolean') {
    s = v ? 'Yes' : 'No'
  } else if (Array.isArray(v)) {
    s = v.join('; ')
  } else {
    s = String(v)
  }
  return `"${s.replace(/"/g, '""')}"`
}

/** UTF-8 BOM helps Excel open UTF-8 CSV correctly. */
export function registrationsToCsv(rows: RegistrationListRow[]): string {
  const headerLine = HEADERS.map((h) => `"${h.replace(/"/g, '""')}"`).join(',')
  const dataLines = rows.map((r) =>
    [
      csvCell(r._id),
      csvCell(r._createdAt),
      csvCell(r.plannerCode),
      csvCell(r.plannerSurname),
      csvCell(r.surname),
      csvCell(r.firstName),
      csvCell(r.mobile),
      csvCell(r.email),
      csvCell(r.seminarDate),
      csvCell(r.seminarTime),
      csvCell(r.hkVisit),
      csvCell(r.income),
      csvCell(r.meetSlot),
      csvCell(r.contactMethod),
      csvCell(r.contactMethodDetail?.trim() ?? ''),
      csvCell(r.meetLanguage),
      csvCell(r.products ?? []),
      csvCell(Boolean(r.consentDm)),
      csvCell(Boolean(r.consentFp)),
    ].join(','),
  )
  return `\uFEFF${[headerLine, ...dataLines].join('\r\n')}`
}

export function downloadRegistrationsCsv(
  rows: RegistrationListRow[],
  filename?: string,
): void {
  const csv = registrationsToCsv(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const day = new Date().toISOString().slice(0, 10)
  a.download = filename ?? `registrations-${day}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
