import React, { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";
import listenForOutsideClick from "../utils/listenForOutside";

const ChatInput = ({ handleSendMessage }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  const handleEmojiClick = (event, emoji) => {
    console.log({ emoji });
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
    // setShowEmoji(false);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setIsOpen(false);
      setMsg("");
    }
  };
  return (
    <Container ref={menuRef}>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={toggle} />
          {isOpen && (
            <Picker
              onEmojiClick={(emojiObject) =>
                setMsg((prevMsg) => prevMsg + emojiObject.emoji)
              }
              style={{ height: "350px" }}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type ur message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -359px;
        left: 30px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9186f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
          .emoji-search {
            background-color: transparent;
            border-color: #9186f3;
          }
          .emoji-group {
            background-color: #080420;
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      /* height: 60%; */

      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
export default ChatInput;
