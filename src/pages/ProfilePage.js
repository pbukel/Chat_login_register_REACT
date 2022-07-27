import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { updateUsers, setLogetUser } from "../features/users";

function ProfilePage() {
  const [getError, setError] = useState(null);
  const [getStyles, setStyles] = useState([
    "1px solid black",
    "1px solid black",
  ]);
  const logedUser = useSelector((state) => state.users.value.loggedUser);
  const allusers = useSelector((state) => state.users.value.users);
  // console.log(logedUser);
  const inNewPhoto = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();
  const dispatch = useDispatch();

  function changePic() {
    //pakeiciam nuotrauka prisiloginusiame arrejuje
    let user = { ...logedUser };
    user.photo = inNewPhoto.current.value;
    dispatch(setLogetUser(user));

    // randam ir pakeiciam objekta su pakeista nuotrauka bendrame visu useriu arrejuje.

    let objIndex = allusers.findIndex((obj) => obj.id === logedUser.id);
    let newarr = [...allusers];
    newarr[objIndex] = user;
    dispatch(updateUsers(newarr));
    // console.log(objIndex);
  }

  function updatePass() {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
    let styles = [...getStyles];

    if (
      passOneRef.current.value.length < 4 ||
      passOneRef.current.value.length > 20
    ) {
      styles[0] = "2px solid red";
      setStyles(styles);
      return setError("Password too short");
    }

    if (!re.test(passOneRef.current.value)) {
      styles[1] = "2px solid red";
      setStyles(styles);
      return setError(
        "It must be min 4 letter password, with at least a symbol, upper and lower case letters and a number"
      );
    }

    setStyles(["1px solid black", "1px solid black"]);
    setError(null);

    let user = { ...logedUser };
    user.pass = passOneRef.current.value;
    dispatch(setLogetUser(user));

    // randam ir pakeiciam password bendram sarase

    let objIndex = allusers.findIndex((obj) => obj.id === logedUser.id);
    let newarr = [...allusers];
    newarr[objIndex] = user;
    dispatch(updateUsers(newarr));
  }

  return (
    <div className="activeUser">
      <img src={logedUser.photo} alt="" />
      <div className="userinfo">
        <h1>User name:{logedUser.username}</h1>
        <div>
          <input ref={inNewPhoto} type="url" placeholder="newpicture" />
          <button onClick={changePic}>Change Picture</button>
        </div>
        <div>
          <input
            ref={passOneRef}
            style={{ border: getStyles[0] }}
            type="text"
            placeholder="pass"
          />
          <input
            ref={passTwoRef}
            style={{ border: getStyles[1] }}
            type="text"
            placeholder="confirm new pass"
          />
          <button onClick={updatePass}>Change pass</button>
          {getError && <h1>{getError}</h1>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
