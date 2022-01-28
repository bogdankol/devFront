import {useState} from 'react';
import axios from 'axios';
import Modal from '../Modal';
import s from './Card.module.css';
import {Card as BootsCard, ListGroup, ListGroupItem} from 'react-bootstrap';

function Card(props) {
    const [modalOpened, setModalOpened] = useState(false)
    const [posts, setPosts] = useState(null)


    const dragStart = e => {
        const target = e.target;
        console.log(target.dataset.data);
        e.dataTransfer.setData('card_id', target.id)
        e.dataTransfer.setData('order', target.dataset.order)
        e.dataTransfer.setData('data', target.dataset.data)
    }

    const dragOver = e => {
        e.stopPropagation();

    }

    const onDoubleClick = async (e) => {
        const cardData = props.user_id
        const {data} = await axios.get(`http://localhost:5000/api/users/${cardData}/posts`)
        setModalOpened(true)
        setPosts(data.result)
    }

    const onCloseModalWindow = () => {
        setModalOpened(false)
    }

    return (
    <div
        id={props.id}
        data-order={props.order}
        data-data={props.data}
        className={s.card}
        draggable={props.draggable}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDoubleClick={onDoubleClick}
    >
        <BootsCard>
            <BootsCard.Body>
                <BootsCard.Title>{props.children[0]}</BootsCard.Title>
            </BootsCard.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{props.children[1]}</ListGroupItem>
                <ListGroupItem>{props.children[2]}</ListGroupItem>
                <ListGroupItem>{props.children[3]}</ListGroupItem>
            </ListGroup>
        </BootsCard>
        {modalOpened && posts && <Modal data={posts} onCloseModalWindow={onCloseModalWindow}/>}
    </div>
  );
}

export default Card;
