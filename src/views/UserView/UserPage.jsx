import { useState, useEffect } from "react";
import axios from "axios";
import Board from "../../components/Board";
import Card from "../../components/Card";
import Navigation from "../../components/Navigation";
import s from "./UserPage.module.css";
import {sortFunc} from '../../js/sortFunc';
import {sortFuncTwo} from '../../js/sortFuncTwo';
import {nanoid} from 'nanoid';


function UserPage({ isLoggedIn, setIsLoggedIn }) {
  const [basicUsers, setBasicUsers] = useState(null);
  const [savedUsers, setSavedUsers] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [criteria, setCriteria] = useState("byNameAsc");
  const [criteriaTwo, setCriteriaTwo] = useState("byNameAsc");
  let token = localStorage.getItem("token");

  useEffect(() => {
    (async function () {
      if (token) {
        if (token.includes("#")) {
          token = token.slice(0, -1);
        }
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        const {
          data: { data, userInfo },
        } = await axios.get("http://localhost:5000/api/users/current");
        if (data) setSavedUsers(data.savedUsers);
        setUserInfo(userInfo);
      }
      const {
        data: { result },
      } = await axios.get("http://localhost:5000/api/users");
      setBasicUsers(result);
    })();
  }, []);

  const onSelectHandler = (e) => {
    setCriteria(e.target.value);
  };
  const onSelectHandlerSecond = (e) => {
    setCriteriaTwo(e.target.value);
  };
  return (
    <div className={s.div}>
      <Navigation
        isLoggedIn={isLoggedIn}
        data={userInfo}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className={s.innerDiv}>
        <div className={s.flexbox}>
          Sort by:{" "}
          <select onChange={onSelectHandler} className={s.select}>
            <option value="byNameAsc">byNameAsc</option>
            <option value="byNameDesc">byNameDesc</option>
            <option value="byEmailAsc">byEmailAsc</option>
            <option value="byEmailDesc">byEmailDesc</option>
            <option value="byWebsiteAsc">byWebsiteAsc</option>
            <option value="byWebsiteDesc">byWebsiteDesc</option>
            <option value="byCityAsc">byCityAsc</option>
            <option value="byCityDesc">byCityDesc</option>
          </select>
          <Board id="board-1" className="board">
            {basicUsers &&
              basicUsers.sort((a, b) => sortFunc(a,b, criteria)).map((el) => {
                return (
                  <Card
                    id="card-2"
                    className="card"
                    draggable="true"
                    order="5"
                    user_id={el.id}
                    data={JSON.stringify(el)}
                    userData={el}
                    key={nanoid()}
                  >
                    <p>{el.name}</p>
                    <p>Email: {el.email}</p>
                    <p>Website: {el.website}</p>
                    <p>City: {el.address.city}</p>
                  </Card>
                );
              })}
          </Board>
        </div>

        <div className={s.flexboxRight} >
        Sort by:{" "}
          <select onChange={onSelectHandlerSecond} className={s.select}>
            <option value="byNameAsc">byNameAsc</option>
            <option value="byNameDesc">byNameDesc</option>
            <option value="byEmailAsc">byEmailAsc</option>
            <option value="byEmailDesc">byEmailDesc</option>
            <option value="byWebsiteAsc">byWebsiteAsc</option>
            <option value="byWebsiteDesc">byWebsiteDesc</option>
            <option value="byCityAsc">byCityAsc</option>
            <option value="byCityDesc">byCityDesc</option>
          </select>
          <Board id="board-2" className="board" isLoggedIn={isLoggedIn}>
            {savedUsers &&
              savedUsers.sort((a, b) => sortFuncTwo(a,b, criteriaTwo)).map(({ data }) => {
                return (
                  <Card
                    id="card-2"
                    className="card"
                    draggable="true"
                    order="5"
                    user_id={data.id}
                    data={JSON.stringify(data)}
                    key={nanoid()}
                  >
                    <p>{data.name}</p>
                    <p>Email: {data.email}</p>
                    <p>Website: {data.website}</p>
                    <p>City: {data.address.city}</p>
                  </Card>
                );
              })}
          </Board>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
