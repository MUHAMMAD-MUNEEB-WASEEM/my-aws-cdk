import React from "react";

const User = ({logOut}) => {
 

  
  return (
    <div>
      <h1>This is user</h1>
      <button onClick={()=>logOut()}>Logout</button>

    </div>
  );
};

export default User;