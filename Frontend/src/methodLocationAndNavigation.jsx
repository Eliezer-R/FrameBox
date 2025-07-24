import { useNavigate, useLocation } from 'react-router-dom'
export const useNavigations = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return {
    navigate,
    location
  }
}
