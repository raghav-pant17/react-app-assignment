import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from "axios";
import { Stack } from '@mui/material';
import CustomerDetail from './CustomerDetail';
const baseURL = "https://mocki.io/v1/6f33e629-3fb9-4e4c-ad96-9297a28ab35a";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const tempUsers;
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        setUsers(response.data);
        setSelectedUser(response.data[0])

        response.data.map((val) => {
          if(arr.length<response.data.length)
          arr.push(val.id);
        })
        console.log(arr);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(true);
      });
  }, []);



  const handleUserClick = (user) => {
    setSelectedUser(user);
    
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-container">
          <div className="profiles">
            {users.length > 0 && users.map((user) => (
              <div className={`profile ${selectedUser === user ? 'selected' : ''}`}>
                <img
                  key={user.id}
                  src={user.image}
                  alt={user.name}
                  onClick={() => handleUserClick(user)}
                  users={users}
                />
              </div>
            ))}
          </div>
          {selectedUser && (
            <CustomerDetail selectedUser={selectedUser} change />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;