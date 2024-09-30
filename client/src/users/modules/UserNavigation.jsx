import { NavLink } from "react-router-dom";

export default function UserNavigation() {
  return (
    <ul>
      <li><NavLink to={'/'}>Register</NavLink></li>
      <li><NavLink to={'/login'}>Login</NavLink></li>
    </ul>
  )
}