import React, { FC, useState } from 'react'
import { useNavigate } from "react-router-dom";


 const UsernameInputScreen: FC = (): JSX.Element => {
   const [usernameInput, setUsernameInput] = useState<string>('');
   const navigate = useNavigate();

   const usernameInputChangeHandler = (e: any) => {
      setUsernameInput(e.target.value)
   };

   const enterChatButtonHandler = async () => {
      navigate(`/chat/${usernameInput}`);
   }

  return (
    <>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id='usernameInput'
              className="materialize-textarea"
              placeholder='enter username'
              value={usernameInput}
              onChange={usernameInputChangeHandler}
              ></textarea>
          </div>
        </div>

        <button 
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onSubmit={enterChatButtonHandler}
          onClick={enterChatButtonHandler}>
            Send
          <i className="material-icons right">Enter Chat</i>
        </button>
      </form>
    </>
  )
}

export default UsernameInputScreen;
