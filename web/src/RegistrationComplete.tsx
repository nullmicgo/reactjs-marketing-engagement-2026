import { Link } from 'react-router-dom'
import './RegistrationComplete.css'

const qrImage = '/figma-assets/d6c8bba753575645d476d81a9d2a21b0b4ec6106.png'

function SuccessIllustration() {
  return (
    <svg
      className="rc-success__icon"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="64" cy="64" r="56" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="2" />
      <path
        d="M40 66L56 82L90 48"
        stroke="#2E7D32"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RegistrationComplete() {
  return (
    <div className="rc-shell">
      <article
        className="rc"
        data-name="2.0 WeChat_Campagin_complete"
        data-node-id="2076:8341"
      >
        <div className="rc-success">
          <SuccessIllustration />
          <h1 className="rc-success__title">Your application has been submitted</h1>
        </div>

        <div className="rc-details">
          <div className="rc-row">
            <span className="rc-row__label">Seminar date and time</span>
            <span className="rc-row__value">4 May 2026, 14:30 - 16:00</span>
          </div>
          <div className="rc-row rc-row--venue">
            <div className="rc-row__inner">
              <span className="rc-row__label">Seminar venue</span>
              <span className="rc-row__value">
                Grand Ballroom, Regent Hong Kong (18 Salisbury Road, Tsim Sha Tsui,
                Kowloon, Hong Kong)
              </span>
            </div>
          </div>
        </div>

        <div className="rc-qr">
          <div className="rc-qr__frame">
            <img src={qrImage} alt="Registration QR code" width={120} height={120} />
          </div>
          <div className="rc-qr__copy">
            <strong>Long press to save the QR code</strong>
            <p>The QR code can only be used once and is non-transferable.</p>
          </div>
        </div>

        <Link to="/" className="rc-done">
          Done
        </Link>
      </article>
    </div>
  )
}
