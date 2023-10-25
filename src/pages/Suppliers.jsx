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

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(null);
  const [search, setSearch] = useState("");
  const CCode = localStorage.getItem("CCode");
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getSuppliers/${CCode}`)
      .then(function (response) {
        setSuppliers(response.data);
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
                Supplier Name
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
            {suppliers ? (
              suppliers
                .filter((supplier) => {
                  if (search === "") {
                    return supplier;
                  } else if (
                    supplier.SupplierName.toLowerCase().includes(
                      search.toLowerCase()
                    )
                  ) {
                    return supplier;
                  }
                })
                .map((supplier, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ padding: "12px" }}>
                        {supplier.Code}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {supplier.SupplierName}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {supplier.Balance}
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        {new Date(supplier.LastUpdate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <p className="py-8">Loading...</p>
            )}
            {suppliers && suppliers.length === 0 ? (
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

export default Suppliers;
