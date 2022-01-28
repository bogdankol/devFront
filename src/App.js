import {useState, useEffect} from 'react';
// import './App.css';
import axios from 'axios';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Board from './components/Board';
import Card from './components/Card';
import queryString from 'query-string';
import LoadingPage from './views/LoadingView/LoadingPage';
import HomePage from './views/HomeView/HomePage';
import UserPage from './views/UserView/UserPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const token = localStorage.getItem('token')
    useEffect(() => {
      if(token && token.length> 10) setIsLoggedIn(true)
    }, [])

  return (
       <Routes>
        <Route exact path="/" element={<Navigate to="home" />} />
        <Route
          index
          path="home"
          element={
            isLoggedIn ? <Navigate replace to="/userpage" /> : <HomePage />
          }
        />
        <Route
          path="userpage"
          element={
            isLoggedIn ? (
              <UserPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route exact path="*" element={<LoadingPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
      </Routes>
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

export default App;
