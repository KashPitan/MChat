import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

// import '../App.css';
import "materialize-css/dist/css/materialize.min.css";

import MessageList from "../components/MessageList";

const ChatScreen: FC = (): JSX.Element => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [usernameState, setUsernameState] =
    useState<string>("username not set");

  const { username } = useParams();
  const requestAddressBaseUrl =
    process.env.NODE_ENV === "production"
      ? "https://mstream-chat-dev.herokuapp.com"
      : "http://localhost:4000";

  // const requestAddressBaseUrl =
  //   process.env.NODE_ENV === "production"
  //     ? "http://localhost:400dada0"
  //     : "https://mstream-chat-dev.herdadokuapp.com";

  console.log(requestAddressBaseUrl);

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    setUsernameState(username ? username : "username not set");
    const socket = io(requestAddressBaseUrl, {
      withCredentials: true,
    });
    socket.on("message", (data: string) => {
      console.log(data);
      setMessages((prevState) => [...prevState, data]);
    });

    //helps prevent duplicate websocket events by closing websocket when done
    return () => {
      socket.close();
    };
  }, []);

  const sendButtonHandler = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await axios.post(
        requestAddressBaseUrl + "/chat/message",
        {
          message: messageInput,
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
      <div className="row">
        <h1>{usernameState}</h1>
        <MessageList messages={messages}></MessageList>
        {/* {messages.map((message: string) => {
          return <h1>{message}</h1>
        })} */}

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
  );
};

export default ChatScreen;
