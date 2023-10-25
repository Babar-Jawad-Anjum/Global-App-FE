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

const Banks = () => {
  const [banks, setBanks] = useState(null);
  const [search, setSearch] = useState("");
  const CCode = localStorage.getItem("CCode");
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getBanks/${CCode}`)
      .then(function (response) {
        setBanks(response.data);
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
                Bank Name
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
            {banks ? (
              banks
                .filter((bank) => {
                  if (search === "") {
                    return bank;
                  } else if (
                    bank.BankName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return bank;
                  }
                })
                .map((bank, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ padding: "12px" }}>
                        {bank.Code}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {bank.BankName}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {bank.Balance}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {new Date(bank.LastUpdate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <p className="py-8">Loading...</p>
            )}
            {banks && banks.length === 0 ? (
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

export default Banks;
