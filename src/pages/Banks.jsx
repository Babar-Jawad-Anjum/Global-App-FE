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
import Backdrop from "../components/Backdrop";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

const Banks = ({ isLoading, setIsLoading }) => {
  const [banks, setBanks] = useState(null);
  const [search, setSearch] = useState("");
  const CCode = localStorage.getItem("CCode");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://gloabl-app.onrender.com/api/getBanks/${CCode}`)
      .then(function (response) {
        setBanks(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [CCode, setIsLoading]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const csvHeader = [
    { label: `Code`, key: `Code` },
    { label: `Bank Name`, key: `BankName` },
    { label: `Balance`, key: `Balance` },
    { label: `Last Update`, key: `LastUpdate` },
  ];

  const prepareCSVData = (data) => {
    const finalData = [];
    //Data For Filter Status "All"
    data.map((element) => {
      let obj = {
        Code: element.Code,
        BankName: element.BankName,
        Balance: element.Balance,
        LastUpdate: element.LastUpdate,
      };
      finalData.push(obj);
      return obj;
    });

    return finalData;
  };

  return (
    <Layout>
      <div className="ml-2 mb-4">
        {isLoading ? <Backdrop /> : ""}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <TextField
            id="standard-password-input"
            label="Search by name"
            type="text"
            className="p-2"
            onChange={handleSearch}
          />
          <div className="bg-[#d15042] text-white p-2 text-sm px-3  hover:cursor-pointer rounded-md mt-5 md:mt-0">
            <CSVLink data={prepareCSVData(banks ?? [])} headers={csvHeader}>
              Export Data
            </CSVLink>
          </div>
        </div>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  padding: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Code
              </TableCell>
              <TableCell
                style={{
                  padding: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Bank Name
              </TableCell>
              <TableCell
                style={{
                  padding: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Balance
              </TableCell>
              <TableCell
                style={{
                  padding: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Last Update
              </TableCell>
              <TableCell
                style={{
                  padding: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Actions
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
                      <TableCell style={{ padding: "10px", fontSize: "13px" }}>
                        {bank.Code}
                      </TableCell>
                      <TableCell style={{ padding: "10px", fontSize: "13px" }}>
                        {bank.BankName}
                      </TableCell>
                      <TableCell style={{ padding: "10px", fontSize: "13px" }}>
                        {bank.Balance}
                      </TableCell>
                      <TableCell style={{ padding: "10px", fontSize: "13px" }}>
                        {new Date(bank.LastUpdate).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          fontSize: "11px",
                        }}
                      >
                        <Link
                          to={`/details/${bank.Code}`}
                          className="hover:cursor-pointer h-7 w-20 flex items-center justify-center bg-[#d15042] text-white rounded-md"
                        >
                          View Details
                        </Link>
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
