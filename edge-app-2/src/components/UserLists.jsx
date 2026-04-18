import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadTrigger, setLoadTrigger] = useState(false);

  useEffect(() => {
    console.log("useEffect called");
    if (!loadTrigger) return;

    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [loadTrigger]);

  return (
    <div>
      <button onClick={() => setLoadTrigger(!loadTrigger)}>Load Users</button>

      {loading && <p>Loading...</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} || {user.username} || {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
