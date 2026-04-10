export const REGISTRATION_DOCUMENT_TYPE = 'registrationSubmission' as const

export const CONTACT_OPTION_WHATSAPP = 'WhatsApp (Please specify)' as const
export const CONTACT_OPTION_WECHAT = 'WeChat (Please specify)' as const

export function contactMethodNeedsDetail(method: string): boolean {
  return method === CONTACT_OPTION_WHATSAPP || method === CONTACT_OPTION_WECHAT
}

export type RegistrationSubmissionDoc = {
  _type: typeof REGISTRATION_DOCUMENT_TYPE
  plannerCode: string
  plannerSurname: string
  surname: string
  firstName: string
  mobile: string
  email: string
  seminarDate: string
  seminarTime: string
  hkVisit: string
  income: string
  meetSlot: string
  contactMethod: string
  /** WhatsApp / WeChat ID or number when that contact method is selected */
  contactMethodDetail: string
  meetLanguage: string
  products: string[]
  consentDm: boolean
  consentFp: boolean
}

export type RegistrationFormState = {
  plannerCode: string
  plannerSurname: string
  surname: string
  firstName: string
  mobile: string
  email: string
  /** `YYYY-MM-DD` from `<input type="date">` */
  seminarDateIso: string
  /** `HH:mm` from `<input type="time">` */
  seminarTimeStart: string
  seminarTimeEnd: string
  hkVisit: string
  income: string
  meetSlot: string
  contactMethod: string
  contactMethodDetail: string
  meetLanguage: string
  products: Set<string>
  consentDm: boolean
  consentFp: boolean
}

export function formatSeminarDateFromIso(iso: string): string {
  if (!iso) return ''
  const parts = iso.split('-').map(Number)
  const y = parts[0]
  const m = parts[1]
  const d = parts[2]
  if (!y || !m || !d) return iso
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatSeminarTimeRange(start: string, end: string): string {
  const s = (start || '14:30').slice(0, 5)
  const e = (end || '16:00').slice(0, 5)
  return `${s} - ${e}`
}

export function buildRegistrationSubmission(
  state: RegistrationFormState,
): RegistrationSubmissionDoc {
  return {
    _type: REGISTRATION_DOCUMENT_TYPE,
    plannerCode: state.plannerCode.trim(),
    plannerSurname: state.plannerSurname.trim(),
    surname: state.surname.trim(),
    firstName: state.firstName.trim(),
    mobile: state.mobile.trim(),
    email: state.email.trim(),
    seminarDate: formatSeminarDateFromIso(state.seminarDateIso),
    seminarTime: formatSeminarTimeRange(
      state.seminarTimeStart,
      state.seminarTimeEnd,
    ),
    hkVisit: state.hkVisit,
    income: state.income,
    meetSlot: state.meetSlot,
    contactMethod: state.contactMethod,
    contactMethodDetail: contactMethodNeedsDetail(state.contactMethod)
      ? state.contactMethodDetail.trim()
      : '',
    meetLanguage: state.meetLanguage,
    products: Array.from(state.products),
    consentDm: state.consentDm,
    consentFp: state.consentFp,
  }
}
