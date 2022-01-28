import {useState, useEffect} from 'react';
import axios from 'axios';
import s from './Navigation.module.css';
import Button from 'react-bootstrap/Button';


function Navigation({data, isLoggedIn, setIsLoggedIn}) {
    const onLogout = async () => {
        await axios.get("http://localhost:5000/api/users/logout")
        setIsLoggedIn(false)
        localStorage.clear()
    }

  return !isLoggedIn ? (
  <div className={s.div}>
        <Button href="http://localhost:5000/api/users/google" className={s.btn}>Enter using Google</Button>
  </div>
  ) : (
    <div className={s.navDiv}>
        <div className={s.innerNavDiv}>
        {data && <img src={data.avatarURL} alt={data.name}></img>}
        {data && <h4 className={s.header}>{data.name}</h4>}
        </div>
       
        <Button variant="primary" size="lg" onClick={onLogout}>LOGOUT</Button>
  </div>
  )
}

export default Navigation;
