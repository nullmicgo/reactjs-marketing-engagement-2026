import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminPortal } from './admin/AdminPortal'
import { CampaignDetails } from './CampaignDetails'
import { RegistrationComplete } from './RegistrationComplete'
import { RegistrationForm } from './RegistrationForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CampaignDetails />} />
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route
        path="/registration/complete"
        element={<RegistrationComplete />}
      />
      <Route
        path="/registration/filled"
        element={<Navigate to="/registration" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
