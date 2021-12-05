import React, { FC } from "react";
type enterChatButtonHandlerType = (e: any) => void;

const JoinChat: FC<{
  enterChatButtonHandler: enterChatButtonHandlerType;
  username: string;
}> = ({ enterChatButtonHandler, username }): JSX.Element => {
  return (
    <>
      <form className="col s12 center-align">
        <div className="row">
          <div
            className="input-field col s4 offset-s4 valign-wrapper"
            style={{ height: "100vh", width: "100vh" }}
          >
            <div className="row">
              <h1>Entering chatroom as: {username}</h1>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onSubmit={enterChatButtonHandler}
                onClick={enterChatButtonHandler}
              >
                <i className="material-icons right">Enter Chat</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default JoinChat;
