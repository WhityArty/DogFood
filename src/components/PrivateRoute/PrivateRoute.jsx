import { Navigate } from 'react-router-dom'


export const PrivateRoute = ({ loggedIn, children }) => {
  return <>{loggedIn ? <>{ children }</> : <Navigate to={'/login'} />}</>
}
