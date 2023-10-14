import React from 'react'
import CartWidget from '../CartWidget/CartWidget';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <div className="container">
        <Link to="/">
          <h3 className="navbar-brand nav-item mx-5">
            <i className="bi bi-apple"></i> iPhone Store
          </h3>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item mx-5">
              <NavLink to={`/category/celulares`} className="nav-link btn btn-success rounded-pill">Celulares</NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink to={`/category/tablets`} className="nav-link btn btn-success rounded-pill">Tablets</NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink to={`/category/desktop`} className="nav-link btn btn-success rounded-pill">Desktop</NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink to={`/category/accesorios`} className="nav-link btn btn-success rounded-pill">Accesorios</NavLink>
            </li>
            <li className="nav-item mx-5">
              <Link className="justify-content-end align-items-center" to={"/cart"}><CartWidget /></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;