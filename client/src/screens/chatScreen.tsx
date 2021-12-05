import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

// import '../App.css';
import "materialize-css/dist/css/materialize.min.css";

import { messageType } from "../types";

import MessageList from "../components/MessageList";
import JoinChat from "../components/JoinChat";

const ChatScreen: FC = (): JSX.Element => {
  //maybe make this into one state object
  const [socket, setSocket] = useState<any>(null); //give this a proper socket typing later
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<messageType[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [usernameState, setUsernameState] =
    useState<string>("username not set");

  const { username } = useParams();
  const requestAddressBaseUrl =
    process.env.NODE_ENV === "production"
      ? "https://mstream-chat-dev.herokuapp.com"
      : "http://localhost:4000";

  console.log(requestAddressBaseUrl);

  useEffect(() => {
    setUsernameState(username ? username : "username not set");

    //helps prevent duplicate websocket events by closing websocket when done
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data: messageType) => {
        console.log(data);
        setMessages((prevState) => [...prevState, data]);
      });
    }
  }, [socket]);

  const joinChatButtonHandler = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setSocket(
      io(requestAddressBaseUrl, {
        withCredentials: true,
        query: {
          username: usernameState,
        },
      })
    );

    setJoined(true);
  };

  const sendButtonHandler = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await axios.post(
        requestAddressBaseUrl + "/chat/message",
        {
          message: messageInput,
          username: usernameState,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("error ==> ", error);
    }
    setMessageInput("");
  };

  const messageBoxChangeHandler = (e: any) => {
    setMessageInput(e.target.value);
  };

  return (
    <>
      {joined ? (
        <>
          <div className="row">
            <h1>{usernameState}</h1>
            <MessageList messages={messages}></MessageList>

            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="messageInput"
                    className="materialize-textarea"
                    placeholder="enter message"
                    value={messageInput}
                    onChange={messageBoxChangeHandler}
                  ></textarea>
                </div>
              </div>

              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onSubmit={sendButtonHandler}
                onClick={sendButtonHandler}
              >
                Send
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </>
      ) : (
        <JoinChat
          enterChatButtonHandler={joinChatButtonHandler}
          username={usernameState}
        />
      )}
    </>
  );
};

export default ChatScreen;
