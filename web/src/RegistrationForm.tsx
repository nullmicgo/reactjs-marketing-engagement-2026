import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegistrationForm.css'

/** Layout matches Figma frames `2076:8463` and `2076:11328` (same screen, different content states). */
const assets = {
  banner: '/figma-assets/08835de4347824825e5c7372d822be3defca365c.png',
  health: '/figma-assets/90ef891b60c5024a47ceeab6ce2df7b1283a0ca4.svg',
  life: '/figma-assets/8993260cf732b3a2ede4350b1a7cd684f8f766c4.svg',
  savings: '/figma-assets/efea47c2b8915553179c306704b8e81e8204316c.png',
  investment: '/figma-assets/2c04ea361be2e43aa71061694ba859fe2d8afb6d.png',
  mpf: '/figma-assets/2a6ca3df9dd65c581f7e5affa916b063c8a5d606.svg',
  group: '/figma-assets/429ef209ca275b92768567abc9b906d88a2bac9e.svg',
} as const

const PICS_HREF =
  'https://www.aia.com.hk/content/dam/hk-wise/pdf/privacy-statement/AIAHK-PICS-English.pdf'

const hkVisitOptions = [
  'Business',
  'Leisure',
  'Neither, I live in Hong Kong',
] as const

const incomeOptions = [
  'Below HKD 20,000',
  'HKD 20,000 – 49,999',
  'HKD 50,000 – 79,999',
  'HKD 80,000 – 99,999',
  'HKD 100,000+',
] as const

const meetSlotOptions = ['Morning', 'Afternoon', 'Evening'] as const

const contactOptions = [
  'Phone',
  'Email',
  'WhatsApp (Please specify)',
  'WeChat (Please specify)',
] as const

const languageOptions = ['Cantonese', 'Mandarin', 'English'] as const

const productTiles: { id: string; label: string; icon: string }[] = [
  { id: 'health', label: 'Health', icon: assets.health },
  { id: 'life', label: 'Life', icon: assets.life },
  { id: 'savings', label: 'Savings', icon: assets.savings },
  { id: 'investment', label: 'Investment', icon: assets.investment },
  { id: 'mpf', label: 'MPF / ORSO / Macau Pension', icon: assets.mpf },
  { id: 'group', label: 'Group Insurance', icon: assets.group },
]

function RadioGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string
  legend: string
  options: readonly T[]
  value: T | ''
  onChange: (v: T) => void
}) {
  return (
    <div className="rf-radio-block" role="group" aria-labelledby={`${name}-legend`}>
      <p id={`${name}-legend`} className="rf-radio-block__q">
        {legend}
      </p>
      {options.map((opt) => (
        <label key={opt} className="rf-radio">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  )
}

export function RegistrationForm() {
  const navigate = useNavigate()
  const [plannerCode, setPlannerCode] = useState('12345678')
  const [plannerSurname, setPlannerSurname] = useState('Wong')
  const [surname, setSurname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [hkVisit, setHkVisit] = useState<(typeof hkVisitOptions)[number] | ''>('')
  const [income, setIncome] = useState<(typeof incomeOptions)[number] | ''>('')
  const [meetSlot, setMeetSlot] = useState<(typeof meetSlotOptions)[number] | ''>('')
  const [contactMethod, setContactMethod] = useState<
    (typeof contactOptions)[number] | ''
  >('')
  const [meetLanguage, setMeetLanguage] = useState<
    (typeof languageOptions)[number] | ''
  >('')
  const [products, setProducts] = useState<Set<string>>(() => new Set())
  const [consentDm, setConsentDm] = useState(false)
  const [consentFp, setConsentFp] = useState(false)

  function toggleProduct(id: string) {
    setProducts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/registration/complete')
  }

  return (
    <div className="rf-shell">
      <article
        className="rf"
        data-name="1.1 Registration Form"
        data-node-id="2076:8463"
      >
        <div className="rf-body">
          <div className="rf-banner">
            <img src={assets.banner} alt="" className="rf-banner__img" />
            <div className="rf-banner__wash" aria-hidden />
          </div>

          <form className="rf-main" onSubmit={handleSubmit} noValidate>
            <div className="rf-intro">
              <p>
                Please fill in the following personal information for registration
              </p>
              <span className="rf-intro__strong">Registration Period</span>
              <ul>
                <li>
                  Priority Registration (Designated Financial Planner Code and the
                  corresponding English surname required): 20 April 2026 (12:00
                  noon) to 23 April 2026 (12:00 noon)
                </li>
                <li>
                  Public Registration: 23 April 2026 (12:00 noon) to 30 April 2026
                  (12:00 noon)
                </li>
              </ul>
            </div>

            <div className="rf-divider" role="presentation" />

            <section className="rf-section" aria-labelledby="rf-reg-info">
              <h2 id="rf-reg-info" className="rf-h2">
                Registration information
              </h2>
              <p className="rf-hint">
                If you are an existing AIA Hong Kong customer, please enter your
                personal information as registered on your policy.
              </p>

              <div className="rf-field">
                <label className="rf-label rf-label--medium" htmlFor="rf-fp-code">
                  Financial Planner code
                </label>
                <input
                  id="rf-fp-code"
                  className="rf-input"
                  value={plannerCode}
                  onChange={(e) => setPlannerCode(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="rf-field">
                <label className="rf-label rf-label--medium" htmlFor="rf-fp-surname">
                  Financial Planner&apos;s English surname
                </label>
                <input
                  id="rf-fp-surname"
                  className="rf-input"
                  value={plannerSurname}
                  onChange={(e) => setPlannerSurname(e.target.value)}
                  autoComplete="family-name"
                />
              </div>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-surname">
                  Surname
                </label>
                <input
                  id="rf-surname"
                  className="rf-input"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="e.g. Chan (as per ID / passport)"
                  autoComplete="family-name"
                />
              </div>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-first">
                  First name
                </label>
                <input
                  id="rf-first"
                  className="rf-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Tai Man (as per ID / passport)"
                  autoComplete="given-name"
                />
              </div>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-mobile">
                  Mobile number
                </label>
                <input
                  id="rf-mobile"
                  className="rf-input"
                  type="tel"
                  inputMode="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="e.g. 9123 4567"
                  autoComplete="tel"
                />
              </div>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-email">
                  Email address
                </label>
                <input
                  id="rf-email"
                  className="rf-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@mail.com"
                  autoComplete="email"
                />
                <p className="rf-field-hint">
                  The email address you enter will be used to receive the QR code
                  and details for seminar and gift.
                </p>
              </div>

              <div className="rf-field">
                <span className="rf-label rf-label--medium">Seminar date</span>
                <input
                  className="rf-input rf-input--readonly"
                  readOnly
                  value="4 May 2026"
                  aria-label="Seminar date"
                />
              </div>

              <div className="rf-field">
                <span className="rf-label rf-label--medium">Seminar time</span>
                <input
                  className="rf-input rf-input--readonly"
                  readOnly
                  value="14:30 - 16:00"
                  aria-label="Seminar time"
                />
              </div>

              <RadioGroup
                name="hk-visit"
                legend="Are you visiting Hong Kong for business or leisure?"
                options={hkVisitOptions}
                value={hkVisit}
                onChange={setHkVisit}
              />
            </section>

            <div className="rf-divider" role="presentation" />

            <section className="rf-section" aria-labelledby="rf-supp">
              <h2 id="rf-supp" className="rf-h2">
                Supplementary information
              </h2>
              <RadioGroup
                name="income"
                legend="Monthly income level"
                options={incomeOptions}
                value={income}
                onChange={setIncome}
              />
            </section>

            <div className="rf-divider" role="presentation" />

            <section className="rf-section" aria-labelledby="rf-meet">
              <h2 id="rf-meet" className="rf-h2">
                Meet with your Financial Planner
              </h2>
              <RadioGroup
                name="meet-slot"
                legend="Preferred meeting time"
                options={meetSlotOptions}
                value={meetSlot}
                onChange={setMeetSlot}
              />
              <RadioGroup
                name="contact"
                legend="Preferred contact method"
                options={contactOptions}
                value={contactMethod}
                onChange={setContactMethod}
              />
              <RadioGroup
                name="meet-lang"
                legend="Preferred language"
                options={languageOptions}
                value={meetLanguage}
                onChange={setMeetLanguage}
              />
            </section>

            <div className="rf-section">
              <h2 className="rf-h2">Interested products/services</h2>
              <div className="rf-products">
                {productTiles.map((tile) => (
                  <button
                    key={tile.id}
                    type="button"
                    className="rf-product"
                    data-selected={products.has(tile.id)}
                    onClick={() => toggleProduct(tile.id)}
                  >
                    <img
                      src={tile.icon}
                      alt=""
                      className="rf-product__icon"
                      width={48}
                      height={48}
                    />
                    {tile.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rf-section rf-legal">
              <p>
                To provide you with the latest news, offers, promotions, and direct
                marketing activities (including events, privileges, and membership
                information of AIA Vitality, where applicable), AIA International
                Limited (Hong Kong Branch) (&quot;AIA Hong Kong&quot;) may use your
                personal data in accordance with AIA Hong Kong&apos;s Personal Data
                Collection Statement (&quot;
                <strong>the Statement</strong>
                &quot;). However, without your consent, AIA Hong Kong cannot use
                and/or provide your personal data for such purposes.
              </p>
              <p>
                If you agree to the use of your personal data for direct marketing
                and for AIA Financial Planners to contact you, please tick [√] in the
                box below.
              </p>

              <div className="rf-checkbox-row">
                <input
                  id="rf-c-dm"
                  type="checkbox"
                  checked={consentDm}
                  onChange={(e) => setConsentDm(e.target.checked)}
                />
                <label htmlFor="rf-c-dm">
                  I agree that AIA Hong Kong may use my personal data for direct
                  marketing in accordance with paragraph 3 of the Statement.
                </label>
              </div>

              <div className="rf-checkbox-row">
                <input
                  id="rf-c-fp"
                  type="checkbox"
                  checked={consentFp}
                  onChange={(e) => setConsentFp(e.target.checked)}
                />
                <label htmlFor="rf-c-fp">
                  I agree that AIA Hong Kong may use the personal data I provided
                  when registering for the seminar for AIA Financial Planners to
                  contact me.
                </label>
              </div>

              <p>
                By clicking &quot;<strong>Register,</strong>&quot; I confirm that I
                have read, understood, and agreed to the event&apos;s{' '}
                <span style={{ color: 'var(--btn-primary)' }}>
                  Terms and Conditions
                </span>{' '}
                as well as the Personal Data Collection Statement (&quot;
                <strong>the Statement</strong>
                &quot;) of AIA International Limited (Hong Kong Branch) (&quot;AIA
                Hong Kong&quot;). I declare and agree that any personal data about
                me, and any other information relating to my policy or investment
                contained in this application, or collected, obtained, compiled, or
                held by AIA Hong Kong from time to time by any means, may be collected
                and used in accordance with the Statement. I acknowledge and agree
                that my personal data may be transferred to parties within or outside
                Hong Kong for the purposes stated in the Statement. The latest
                version of the Statement, in compliance with the relevant codes and
                regulations, can be downloaded here:{' '}
                <a href={PICS_HREF} target="_blank" rel="noopener noreferrer">
                  {PICS_HREF}
                </a>
                , and can also be obtained from AIA Hong Kong.
              </p>
            </div>

            <button type="submit" className="rf-btn">
              Register
            </button>
          </form>
        </div>
      </article>
    </div>
  )
}
