import React, { FC } from "react";
// import TodoItem from "./TodoItem";
// import { v4 as uuidv4 } from "uuid";
import MessageItem from './MessageItem';

const MessageList: FC<{messages:string[]}> = ({messages}): JSX.Element => {
  return (
    <>
      <h1>Messages</h1>
      {messages.length > 0 ? (
        <>
          <ol className="collection">
            {messages.map((message: string, index: number) => (
              <MessageItem key={index.toString()} message={message}/>
            ))}
          </ol>
        </>
      ) : (
        <p>No messages</p>
      )}
    </>
  );
};

export default MessageList;