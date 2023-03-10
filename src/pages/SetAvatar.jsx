import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
const SetAvatar = () => {
  useLayoutEffect(() => {
    document.title = "Set Avatar Page";
  }, []);
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //   useEffect(() => {

  //   }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select a  avatar", toastOptions);
    } else {
      const user1 = localStorage.getItem("chat-app-user");
      const user = JSON.parse(user1);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error Setting Avatar, Please try again", toastOptions);
      }
    }
  };
  const fetchData = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setIsLoading(false);
    setAvatars(data);
  };
  useEffect(() => {
    const user1 = localStorage.getItem("chat-app-user");
    const user = JSON.parse(user1);
    if (!user1) {
      navigate("/login");
    }
    if (user?.avatarImage) {
      navigate("/");
    }
    fetchData();
  }, []);
  return (
    <>
      {
        <Container>
          {isLoading ? (
            <img src={loader} alt="loader" className="loader" />
          ) : (
            <Container>
              <div className="title-container">
                <h1>Pick as avatar as your profile picture</h1>
              </div>
              <div className="avatars">
                {avatars.map((avatar, ind) => {
                  return (
                    <div
                      className={`avatar ${
                        selectedAvatar === ind ? "selected" : ""
                      }`}
                      key={ind}>
                      <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        onClick={() => {
                          setSelectedAvatar(ind);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <button className="submit-btn" onClick={setProfilePicture}>
                Set as Profile Picture
              </button>
            </Container>
          )}
        </Container>
      }

      <ToastContainer />
    </>
  );
};

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
      transition: 0.5s ease-in-out;
    }
  }
`;
