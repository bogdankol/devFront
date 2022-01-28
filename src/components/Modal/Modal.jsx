import React, { useEffect, useState } from "react";
import s from "./Modal.module.css";
import { createPortal } from "react-dom";
import { nanoid } from "nanoid";
import axios from "axios";

const modalRoot = document.querySelector("#modal-root");
function Modal({ data, onCloseModalWindow }) {

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onCloseModalWindow(e);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModalWindow(e);
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <h3 className={s.nickname}>All Posts</h3>
        <ul className={s.list}>
          {data &&
            data.map((post) => {
              return (
                <li key={post.id} className={s.listItem}>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
