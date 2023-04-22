import { useEffect, useState } from "react";
import "./App.css";
import FormUser from "./components/FormUser";
import useUserCrud from "./hooks/useUserCrud";
import CardUser from "./components/CardUser";

function App() {
  const [updateInfo, setUpdateInfo] = useState();
  const [formClose, setFormClose] = useState(true);

  const { users, getAllUsers, createUser, deleteUserById, updateUserById } =
    useUserCrud();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleOpenForm = () => {
    setFormClose(false);
    setUpdateInfo()
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">USERS</h1>
        <button onClick={handleOpenForm} className="app__btn">
          Create new user
        </button>
      </header>

      <FormUser
        createUser={createUser}
        updateInfo={updateInfo}
        setUpdateInfo={setUpdateInfo}
        updateUserById={updateUserById}
        setFormClose={setFormClose}
        formClose={formClose}
      />

      <div className="cards__user">
        {users?.map((user) => (
          <CardUser
            user={user}
            setUpdateInfo={setUpdateInfo}
            deleteUserById={deleteUserById}
            key={user.id}
            setFormClose={setFormClose}
            formClose={formClose}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
