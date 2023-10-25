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

const Stocks = () => {
  const [stocks, setStocks] = useState(null);
  const [search, setSearch] = useState("");
  const CCode = localStorage.getItem("CCode");
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getStocks/${CCode}`)
      .then(function (response) {
        setStocks(response.data);
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
                PCode
              </TableCell>
              <TableCell style={{ padding: "12px", fontWeight: "bold" }}>
                Product Name
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
            {stocks ? (
              stocks
                .filter((stock) => {
                  if (search === "") {
                    return stock;
                  } else if (
                    stock.ProductName.toLowerCase().includes(
                      search.toLowerCase()
                    )
                  ) {
                    return stock;
                  }
                })
                .map((stock, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ padding: "12px" }}>
                        {stock.PCode}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {stock.ProductName}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {stock.Balance}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {new Date(stock.LastUpdate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <p className="py-8">Loading...</p>
            )}
            {stocks && stocks.length === 0 ? (
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

export default Stocks;
