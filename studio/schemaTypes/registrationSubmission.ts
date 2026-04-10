import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'registrationSubmission',
  title: 'Registration submission',
  type: 'document',
  fields: [
    defineField({
      name: 'plannerCode',
      title: 'Financial Planner code',
      type: 'string',
    }),
    defineField({
      name: 'plannerSurname',
      title: "Financial Planner's English surname",
      type: 'string',
    }),
    defineField({
      name: 'surname',
      title: 'Surname',
      type: 'string',
    }),
    defineField({
      name: 'firstName',
      title: 'First name',
      type: 'string',
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
    }),
    defineField({
      name: 'seminarDate',
      title: 'Seminar date',
      type: 'string',
    }),
    defineField({
      name: 'seminarTime',
      title: 'Seminar time',
      type: 'string',
    }),
    defineField({
      name: 'hkVisit',
      title: 'HK visit (business / leisure / resident)',
      type: 'string',
    }),
    defineField({
      name: 'income',
      title: 'Monthly income level',
      type: 'string',
    }),
    defineField({
      name: 'meetSlot',
      title: 'Preferred meeting time',
      type: 'string',
    }),
    defineField({
      name: 'contactMethod',
      title: 'Preferred contact method',
      type: 'string',
    }),
    defineField({
      name: 'contactMethodDetail',
      title: 'WhatsApp / WeChat (specified ID or number)',
      type: 'string',
      description:
        'Filled when contact method is WhatsApp or WeChat (please specify).',
    }),
    defineField({
      name: 'meetLanguage',
      title: 'Preferred language',
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'Interested products / services',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'consentDm',
      title: 'Consent — direct marketing',
      type: 'boolean',
    }),
    defineField({
      name: 'consentFp',
      title: 'Consent — Financial Planner contact',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      surname: 'surname',
      firstName: 'firstName',
      created: '_createdAt',
    },
    prepare({ email, surname, firstName, created }) {
      const name = [surname, firstName].filter(Boolean).join(' ').trim()
      return {
        title: email || name || 'Submission',
        subtitle: created
          ? new Date(created).toLocaleString()
          : name || undefined,
      }
    },
  },
  orderings: [
    {
      title: 'Submitted, newest first',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
