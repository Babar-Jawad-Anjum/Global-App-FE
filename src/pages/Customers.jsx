import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

const Customers = () => {
  const [customers, setCustomers] = useState(null);
  const [search, setSearch] = useState("");
  const CCode = localStorage.getItem("CCode");
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getCustomers/${CCode}`)
      .then(function (response) {
        setCustomers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Layout>
      <div className="ml-2 mb-4">
        <TextField
          id="standard-password-input"
          label="Search by name"
          type="text"
          className="p-2"
          onChange={handleSearch}
        />
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "12px", fontWeight: "bold" }}>
                Code
              </TableCell>
              <TableCell style={{ padding: "12px", fontWeight: "bold" }}>
                Customer Name
              </TableCell>
              <TableCell style={{ padding: "12px", fontWeight: "bold" }}>
                Balance
              </TableCell>
              <TableCell style={{ padding: "12px", fontWeight: "bold" }}>
                Last Update
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              customers
                .filter((customer) => {
                  if (search === "") {
                    return customer;
                  } else if (
                    customer.CustomerName.toLowerCase().includes(
                      search.toLowerCase()
                    )
                  ) {
                    return customer;
                  }
                })
                .map((customer, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ padding: "12px" }}>
                        {customer.Code}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {customer.CustomerName}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {customer.Balance}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {new Date(customer.LastUpdate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <p className="py-8">Loading...</p>
            )}
            {customers && customers.length === 0 ? (
              <p className="py-8">No data found</p>
            ) : (
              ""
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Customers;
