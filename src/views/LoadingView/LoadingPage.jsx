import React, {useEffect} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

function LoadingPage({setIsLoggedIn, isLoggedIn}) {
    let token = Object.values(queryString.parse(window.location.href))[0];

  useEffect(() => {
    (async function(){
      if(token) {
        if(token.includes('#')) {
          token = token.slice(0, -1)
        }
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        // const {data: {data, userInfo}} = await axios.get('http://localhost:5000/api/users/current')
        // if(data) setSavedUsers(data.savedUsers)
        // // setUserInfo(userInfo)
        localStorage.setItem('token', token)
        setIsLoggedIn(true)
      }
    //   const {data: {result}} = await axios.get('http://localhost:5000/api/users')
    //   setBasicUsers(result)
    })()
  }, [])

  useEffect(() => {
      if(token) {
          
      }
  }, [token])
  return !isLoggedIn ? <div style={{backgroundColor: 'grey'}}>
    LOADING...
  </div> : <Navigate replace to="/userpage" />
}

export default LoadingPage;
