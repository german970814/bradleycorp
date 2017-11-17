import React from 'react'
import { Link } from 'react-router-dom'
import style from './Header.scss'

const Header = () => {
  return (
    <header className={style.header}>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
