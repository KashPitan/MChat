import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsernameInputScreen: FC = (): JSX.Element => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const navigate = useNavigate();

  const usernameInputChangeHandler = (e: any) => {
    setUsernameInput(e.target.value);
  };

  const enterChatButtonHandler = async () => {
    navigate(`/chat/${usernameInput}`);
  };

  return (
    <>
      {/* <div
        className="col s12 valign-wrapper"
        style={{ height: "100vh", width: "100vh" }}
      > */}
      <form className="col s12 center-align">
        <div className="row">
          <div
            className="input-field col s4 offset-s4 valign-wrapper"
            style={{ height: "100vh", width: "100vh" }}
          >
            <div className="row">
              <input
                id="usernameInput"
                className="validate center-align"
                placeholder="enter username"
                value={usernameInput}
                onChange={usernameInputChangeHandler}
                style={{ fontSize: "50px" }}
                type="text"
              />
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

export default UsernameInputScreen;
