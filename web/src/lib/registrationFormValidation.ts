import { contactMethodNeedsDetail } from './registrationDocument'

export type RegistrationFieldKey =
  | 'plannerCode'
  | 'plannerSurname'
  | 'surname'
  | 'firstName'
  | 'mobile'
  | 'email'
  | 'seminarDate'
  | 'seminarTime'
  | 'hkVisit'
  | 'income'
  | 'meetSlot'
  | 'contactMethod'
  | 'contactMethodDetail'
  | 'meetLanguage'
  | 'products'
  | 'consentDm'
  | 'consentFp'

export type RegistrationValidationInput = {
  plannerCode: string
  plannerSurname: string
  surname: string
  firstName: string
  mobile: string
  email: string
  seminarDateIso: string
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

function timeToMinutes(t: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.trim())
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h > 23 || min > 59) return null
  return h * 60 + min
}

function countDigits(s: string): number {
  return (s.match(/\d/g) ?? []).length
}

/** Practical check for HK / international mobile (digits only, min length). */
function isPlausibleMobile(s: string): boolean {
  return countDigits(s) >= 8
}

function isValidEmail(s: string): boolean {
  const t = s.trim()
  if (t.length < 5 || t.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)
}

export function validateRegistrationForm(
  input: RegistrationValidationInput,
): {
  valid: boolean
  errors: Partial<Record<RegistrationFieldKey, string>>
} {
  const errors: Partial<Record<RegistrationFieldKey, string>> = {}

  if (!input.plannerCode.trim()) {
    errors.plannerCode = 'Please enter the Financial Planner code.'
  }
  if (!input.plannerSurname.trim()) {
    errors.plannerSurname =
      "Please enter the Financial Planner's English surname."
  }
  if (!input.surname.trim()) {
    errors.surname = 'Please enter your surname as shown on your ID or passport.'
  }
  if (!input.firstName.trim()) {
    errors.firstName = 'Please enter your first name as shown on your ID or passport.'
  }
  if (!input.mobile.trim()) {
    errors.mobile = 'Please enter your mobile number.'
  } else if (!isPlausibleMobile(input.mobile)) {
    errors.mobile = 'Please enter a valid mobile number (at least 8 digits).'
  }
  if (!input.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!input.seminarDateIso.trim()) {
    errors.seminarDate = 'Please choose a seminar date.'
  }
  const startM = timeToMinutes(input.seminarTimeStart)
  const endM = timeToMinutes(input.seminarTimeEnd)
  if (startM === null || endM === null || endM <= startM) {
    errors.seminarTime =
      'Please set a valid seminar time (end time must be after start).'
  }

  if (!input.hkVisit) {
    errors.hkVisit = 'Please select an option for your visit to Hong Kong.'
  }
  if (!input.income) {
    errors.income = 'Please select your monthly income level.'
  }
  if (!input.meetSlot) {
    errors.meetSlot = 'Please select a preferred meeting time.'
  }
  if (!input.contactMethod) {
    errors.contactMethod = 'Please select a preferred contact method.'
  }
  if (
    contactMethodNeedsDetail(input.contactMethod) &&
    !input.contactMethodDetail.trim()
  ) {
    errors.contactMethodDetail =
      'Please enter your WhatsApp or WeChat ID or phone number.'
  }
  if (!input.meetLanguage) {
    errors.meetLanguage = 'Please select a preferred language.'
  }
  if (input.products.size === 0) {
    errors.products = 'Please select at least one product or service you are interested in.'
  }
  if (!input.consentDm) {
    errors.consentDm =
      'Please agree to the use of your personal data for direct marketing to continue.'
  }
  if (!input.consentFp) {
    errors.consentFp =
      'Please agree to allow AIA Financial Planners to contact you to continue.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

/** Display order for scrolling to the first invalid field. */
export const REGISTRATION_FIELD_ORDER: RegistrationFieldKey[] = [
  'plannerCode',
  'plannerSurname',
  'surname',
  'firstName',
  'mobile',
  'email',
  'seminarDate',
  'seminarTime',
  'hkVisit',
  'income',
  'meetSlot',
  'contactMethod',
  'contactMethodDetail',
  'meetLanguage',
  'products',
  'consentDm',
  'consentFp',
]

const FOCUS_ID: Record<RegistrationFieldKey, string> = {
  plannerCode: 'rf-fp-code',
  plannerSurname: 'rf-fp-surname',
  surname: 'rf-surname',
  firstName: 'rf-first',
  mobile: 'rf-mobile',
  email: 'rf-email',
  seminarDate: 'rf-seminar-date',
  seminarTime: 'rf-time-start',
  hkVisit: 'rf-group-hk-visit',
  income: 'rf-group-income',
  meetSlot: 'rf-group-meet-slot',
  contactMethod: 'rf-group-contact',
  contactMethodDetail: 'rf-contact-spec',
  meetLanguage: 'rf-group-meet-lang',
  products: 'rf-group-products',
  consentDm: 'rf-group-consents',
  consentFp: 'rf-group-consents',
}

export function focusFirstInvalidField(
  errors: Partial<Record<RegistrationFieldKey, string>>,
): void {
  for (const key of REGISTRATION_FIELD_ORDER) {
    if (!errors[key]) continue
    const id = FOCUS_ID[key]
    const el = document.getElementById(id)
    if (!el) continue
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
    ) {
      el.focus()
    } else {
      el.querySelector<HTMLInputElement>('input[type="radio"]')?.focus()
    }
    break
  }
}
