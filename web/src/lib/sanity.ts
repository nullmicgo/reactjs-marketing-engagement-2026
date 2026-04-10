import { createClient, type SanityClient } from '@sanity/client'
import {
  REGISTRATION_DOCUMENT_TYPE,
  type RegistrationSubmissionDoc,
} from './registrationDocument'

export const SANITY_PROJECT_ID = 'kz2fy4f4'

const API_VERSION = '2024-11-21'

export function getSanityDataset(): string {
  return import.meta.env.VITE_SANITY_DATASET?.trim() || 'production'
}

export function getSanityToken(): string | undefined {
  const t = import.meta.env.VITE_SANITY_API_TOKEN?.trim()
  return t || undefined
}

export function getSanityClient(): SanityClient {
  const token = getSanityToken()
  if (!token) {
    throw new Error('Missing VITE_SANITY_API_TOKEN')
  }
  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: getSanityDataset(),
    apiVersion: API_VERSION,
    useCdn: false,
    token,
  })
}

export async function createRegistrationSubmission(
  doc: RegistrationSubmissionDoc,
): Promise<void> {
  const client = getSanityClient()
  await client.create(doc)
}

export const LIST_REGISTRATIONS_QUERY = `*[_type == "${REGISTRATION_DOCUMENT_TYPE}"] | order(_createdAt desc) {
  _id,
  _createdAt,
  plannerCode,
  plannerSurname,
  surname,
  firstName,
  mobile,
  email,
  seminarDate,
  seminarTime,
  hkVisit,
  income,
  meetSlot,
  contactMethod,
  contactMethodDetail,
  meetLanguage,
  products,
  consentDm,
  consentFp
}`

export type RegistrationListRow = {
  _id: string
  _createdAt: string
  plannerCode?: string
  plannerSurname?: string
  surname?: string
  firstName?: string
  mobile?: string
  email?: string
  seminarDate?: string
  seminarTime?: string
  hkVisit?: string
  income?: string
  meetSlot?: string
  contactMethod?: string
  contactMethodDetail?: string
  meetLanguage?: string
  products?: string[]
  consentDm?: boolean
  consentFp?: boolean
}
