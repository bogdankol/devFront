import { useState } from "react";
import axios from "axios";
import s from "./Board.module.css";
import {Row, Col, Toast} from 'react-bootstrap';

function Board(props) {
  const [show, setShow] = useState(false);

  const drop = async (e) => {
    e.preventDefault();
    if (e.target.id === "board-2" && props.isLoggedIn) {
      const card_id = e.dataTransfer.getData("card_id");
      const data = e.dataTransfer.getData("data");

      const card = document.getElementById(card_id);
      card.style.display = "block";

      e.target.appendChild(card);

      if (axios.defaults.headers.common.Authorization) {
        try {
          await axios.post("http://localhost:5000/api/users/saveUserForWork", {
            data,
          });
          setShow(true)
        } catch (err) {
          alert(err.message);
        }
      }
    } else {
      const card_id = e.dataTransfer.getData("card_id");
      const order = e.dataTransfer.getData("order");
      const data = e.dataTransfer.getData("data");
      // console.log(`data`,data)

      const card = document.getElementById(card_id);
      card.style.display = "block";

      e.target.appendChild(card);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div
        id={props.id}
        className={s.board}
        onDrop={drop}
        onDragOver={dragOver}
      >
        {props.children}
      </div>

      {show && (
        <Row className={s.row}>
          <Col xs={6}>
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={5000}
              autohide
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Card saved!</strong>
              </Toast.Header>
              <Toast.Body>
                Please reload the page for sort functions to be available
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Board;
