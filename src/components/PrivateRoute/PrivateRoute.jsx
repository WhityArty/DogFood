import { Navigate } from 'react-router-dom'

// loggedIn - boolean
// children - route
export const PrivateRoute = ({ loggedIn, children }) => {
  return <>{loggedIn ? <>{ children }</> : <Navigate to={'/login'} />}</>
}
