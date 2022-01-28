import { useState, useEffect } from "react";
// import './App.css';
import s from "./Homepage.module.css";
import axios from "axios";
import Board from "../../components/Board";
import Card from "../../components/Card";
import queryString from "query-string";
import Navigation from "../../components/Navigation";

function HomePage() {
  const [basicUsers, setBasicUsers] = useState(null);
  const [savedUsers, setSavedUsers] = useState(null);
  const [criteria, setCriteria] = useState("byNameAsc");

  useEffect(() => {
    (async function () {
      const {
        data: { result },
      } = await axios.get("http://localhost:5000/api/users");
      setBasicUsers(result);
    })();
  }, []);

  const sortFunc = (a, b) => {
    switch (criteria) {
      case "byNameAsc":
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }

      case "byNameDesc":
        if (a.name > b.name) {
          return -1;
        } else {
          return 1;
        }
      case "byEmailAsc":
        if (a.email > b.email) {
          return 1;
        } else {
          return -1;
        }
      case "byEmailDesc":
        if (a.email > b.email) {
          return -1;
        } else {
          return 1;
        }
      case "byWebsiteAsc":
        if (a.website > b.website) {
          return 1;
        } else {
          return -1;
        }
      case "byWebsiteDesc":
        if (a.website > b.website) {
          return -1;
        } else {
          return 1;
        }
      case "byCityAsc":
        if (a.address.city > b.address.city) {
          return 1;
        } else {
          return -1;
        }
      case "byCityDesc":
        if (a.address.city > b.address.city) {
          return -1;
        } else {
          return 1;
        }
      default:
        return;
    }
  };
  const onSelectHandler = (e) => {
    setCriteria(e.target.value);
  };
  return (
    <div className={s.div}>
      <Navigation />
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
              basicUsers.sort(sortFunc).map((el) => {
                return (
                  <Card
                    id="card-2"
                    className="card"
                    draggable="true"
                    order="5"
                    user_id={el.id}
                    data={JSON.stringify(el)}
                    key={el.name}
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

        <div className={s.flexboxRight}>
          <Board id="board-2" className="board">
            {savedUsers &&
              savedUsers.map(({ data }) => {
                return (
                  <Card
                    id="card-2"
                    className="card"
                    draggable="true"
                    order="5"
                    user_id={data.id}
                    data={JSON.stringify(data)}
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

// function App() {
//   return (
//     <div className="App">
//       <a href="http://localhost:5000/api/users/google">
//         <button>BUTTON</button>
//       </a>
//     </div>
//   );
// }

// function App() {
//   const [cardList, setCardList] = useState([
//     {id: 1, order: 1, text: 'Card1'},
//     {id: 2, order: 2, text: 'Card2'},
//     {id: 3, order: 3, text: 'Card3'},
//     {id: 4, order: 4, text: 'Card4'}
//   ])
//   const [currentCard, setCurrentCard] = useState(null)
//   const [userList, setUserList] = useState([])

//   const dragStartHandler = (e, card) => {
//     setCurrentCard(card)
//   }
//   const dragEndHandler = (e) => {
//     e.target.style.background = 'white'
//     // console.log(e.currentTarget);
//   }
//   const dragOverHandler = (e) => {
//     e.preventDefault()
//     e.target.style.background = 'blue'

//   }
//   const dragDropHandler = (e, card) => {
//     // console.log('drop', card, currentCard);
//     e.preventDefault()
//     console.log(e.dataTransfer);
//     setCardList(cardList.map(el => {
//       if(el.id === card.id) {
//         // console.log('el:', el, 'card:', card, 'currentCard:', currentCard);
//         return {...el, order: currentCard.order}
//       }
//       if(el.id === currentCard.id) {
//         // console.log('el:', el, 'card:', card, 'currentCard:', currentCard);
//         return {...el, order: card.order}
//       }
//       return el
//     }))
//     e.target.style.background = 'white'
//   }

//   const sortCards = (a, b) => {
//     if(a.order > b.order) {
//       return 1
//     } else {
//       return -1
//     }

//   }

//   return (
//     <div className="App">
//       {cardList.sort(sortCards).map(card =>
//         <div
//         className='card'
//         draggable={true}
//         onDragStart={(e) => dragStartHandler(e, card)}
//         onDragLeave={(e) => dragEndHandler(e)}
//         onDragEnd={(e) => dragEndHandler(e)}
//         onDragOver={(e) => dragOverHandler(e)}
//         onDrop={(e) => dragDropHandler(e, card)}
//         >
//           {card.text}
//         </div>)}

//         <div className='div' id="div">
//           {userList.map(card =>
//             <div
//               className='card'
//               draggable={true}

//               // onDragStart={(e) => StartHandler(e, card)}
//               // onDragLeave={(e) => EndHandler(e)}
//               // onDragEnd={(e) => EndHandler(e)}
//               // onDragOver={(e) => OverHandler(e)}
//               // onDrop={(e) => DropHandler(e, card)}
//               >
//               {card.text}
//             </div>)}
//         </div>
//     </div>
//   );
// }

export default HomePage;
