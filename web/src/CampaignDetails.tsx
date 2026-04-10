import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CampaignDetails.css'

const assets = {
  banner: '/figma-assets/08835de4347824825e5c7372d822be3defca365c.png',
  speaker: '/figma-assets/6fee0dd8e88fc5447841c95543b15379a76b8586.png',
} as const

const eventDetailsRows: { label: string; value: string }[] = [
  { label: 'Date', value: '4 May 2026 (Monday)' },
  { label: 'Time', value: '2:30pm to 4:00pm' },
  { label: 'Registration time', value: '1:30pm' },
  {
    label: 'Topic',
    value:
      'Elevate Your Life – Grow with Purpose, Thrive with Family',
  },
  { label: 'Language', value: 'Mandarin' },
  {
    label: 'Venue',
    value:
      'Grand Ballroom, Regent Hong Kong (18 Salisbury Road, Tsim Sha Tsui, Kowloon, Hong Kong)',
  },
]

export function CampaignDetails() {
  const [plannerCode, setPlannerCode] = useState('123456789')
  const [surname, setSurname] = useState('Wong')

  return (
    <div className="cd-shell">
      <article
        className="cd"
        data-name="1.0 Campaign details"
        data-node-id="2076:8395"
      >
        <div className="cd-body">
          <div className="cd-banner-wrap">
            <div className="cd-banner">
              <img src={assets.banner} alt="" className="cd-banner__img" />
              <div className="cd-banner__wash" aria-hidden />
            </div>
          </div>

          <div className="cd-main">
            <div className="cd-title-block">
              <p className="cd-title">
                Register now to join the &quot;AIA Inspiring Seminar: Elevate Your
                Life – Grow with Purpose, Thrive with Family&quot; for free and
                redeem an exquisite gift.
              </p>
            </div>

            <div className="cd-divider" role="presentation" />

            <section className="cd-section" aria-labelledby="cd-details-heading">
              <div className="cd-details-intro">
                <h2 id="cd-details-heading" className="cd-h2">
                  Campaign details
                </h2>
                <p className="cd-lead">
                  A prominent Speaker&nbsp;is invited for sharing:
                </p>
              </div>

              <div className="cd-speakers">
                <div className="cd-speaker">
                  <div className="cd-speaker__photo-wrap">
                    <img
                      src={assets.speaker}
                      alt="Mr. Fan Deng"
                      className="cd-speaker__photo"
                      width={131}
                      height={138}
                    />
                  </div>
                  <div className="cd-speaker__text">
                    <p className="cd-speaker__name">Mr. Fan Deng</p>
                    <p className="cd-speaker__role">
                      Founder &amp; Chief Content Officer of Fanshu&nbsp;APP,
                      Visiting Professor at Xi&apos;an Jiaotong&nbsp;University,
                      Former CCTV Host
                    </p>
                  </div>
                </div>
              </div>

              <div className="cd-table-wrap">
                <table className="cd-details-table">
                  <caption className="cd-details-table__caption">
                    Event details
                  </caption>
                  <tbody>
                    {eventDetailsRows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cd-copy">
                <p>
                  Attend the seminar and complete the on-site registration to
                  receive an exquisite gift.
                </p>
                <p>
                  If you were invited by a Financial Planner , Please enter their
                  Financial Planner code and English surname.
                </p>
              </div>
            </section>

            <div className="cd-field">
              <label className="cd-label" htmlFor="fp-code">
                Financial Planner code (if applicable)
              </label>
              <input
                id="fp-code"
                className="cd-input"
                value={plannerCode}
                onChange={(e) => setPlannerCode(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="cd-field">
              <label className="cd-label" htmlFor="fp-surname">
                English surname of Financial Planner <br />
                (if applicable)
              </label>
              <input
                id="fp-surname"
                className="cd-input"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                autoComplete="family-name"
              />
            </div>

            <Link to="/registration" className="cd-btn cd-btn--link">
              Next
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
