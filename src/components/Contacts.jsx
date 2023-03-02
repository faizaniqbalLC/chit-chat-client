import React, { useState, useEffect } from "react";
import styled from "styled-components";

import logo from "../assets/logo.gif";
const Contacts = ({ contacts, currentUser, chatChange }) => {
  const [currUsername, setCurrUsername] = useState(undefined);
  const [currAvatarImage, setCurrAvatarImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrAvatarImage(currentUser.avatarImage);
      setCurrUsername(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    chatChange(contact);
  };

  return (
    <>
      {currAvatarImage && currUsername && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Chit Chat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, ind) => {
              return (
                <div
                  className={`contact ${
                    ind === currentSelected ? "selected" : ""
                  }`}
                  key={ind}
                  onClick={() => changeCurrentChat(ind, contact)}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currAvatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currUsername}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      border-radius: 0.2rem;
      transition: 0.9s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        min-height: 3rem;
        .username {
          h3 {
            font-size: 1rem;
            flex-wrap: wrap;
          }
        }
        .avatar {
          img {
            height: 2rem;
          }
        }
      }
      @media screen and (min-width: 320px) and (max-width: 500px) {
        gap: 0.2rem;
        .username {
          h3 {
            font-size: 0.8rem;
          }
        }
        .avatar {
          img {
            height: 2rem;
          }
        }
        min-height: 2rem;
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
    @media screen and (min-width: 320px) and (max-width: 500px) {
      gap: 0.2rem;
      .username {
        h2 {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

export default Contacts;
