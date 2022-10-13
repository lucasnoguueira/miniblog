import { NavLink } from "react-router-dom"

import { useAuthentication } from '../hooks/useAuthentication'

import { useAuthValue } from "../context/AuthContext"
 
import styles from './Navbar.module.css'

const Navbar = () => {

    const {user} = useAuthValue()
    const {logout} = useAuthentication()

  return (
    <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
                {!user && (
                <>
                    <li>
                        <NavLink to='/register'>Cadastre-se</NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'>Entrar</NavLink>
                    </li>
                </>
                )}
                {user && (
                <>
                    <li>
                        <NavLink to='/posts/create'>Novo post</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                    </li>
                </>
                )}
            <li>
                <NavLink to='/about'>Sobre</NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar