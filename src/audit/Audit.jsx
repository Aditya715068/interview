import React, { useEffect, useState } from "react";

export { Audit };

function Audit() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAuditData();
  }, []);

  const fetchAuditData = () => {
    fetch("http://localhost:4000/users/audit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      // body: JSON.stringify({ a: 1, b: 2 })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // Set the fetched data to the state
        setUsers(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Calculate the range of items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Auditor Page</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Username</th>
            <th style={{ width: "30%" }}>Ip adress</th>
            <th style={{ width: "30%" }}>loginTime </th>
            <th style={{ width: "30%" }}>LogoutTime</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.userIP}</td>
              <td>{user.loginTime ? user.loginTime : "--"}</td>
              <td>{user.logoutTime ? user.logoutTime : "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          style={{
            backgroundColor: "blue", // Example background color
            color: "white", // Example text color
            padding: "10px 20px", // Example padding
            borderRadius: "5px", // Example border radius
            cursor: "pointer", // Example cursor style
          }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          style={{
            backgroundColor: "blue", // Example background color
            color: "white", // Example text color
            padding: "10px 20px", // Example padding
            borderRadius: "5px", // Example border radius
            cursor: "pointer", // Example cursor style
          }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
