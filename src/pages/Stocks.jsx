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

const Stocks = ({ isLoading, setIsLoading }) => {
  const [stocks, setStocks] = useState(null);
  const [search, setSearch] = useState("");
  const CCode = localStorage.getItem("CCode");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://gloabl-app.onrender.com/api/getStocks/${CCode}`)
      .then(function (response) {
        setIsLoading(false);

        setStocks(response.data);
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
    { label: `PCode`, key: `PCode` },
    { label: `Product Name`, key: `ProductName` },
    { label: `Balance`, key: `Balance` },
    { label: `Last Update`, key: `LastUpdate` },
  ];

  const prepareCSVData = (data) => {
    const finalData = [];
    //Data For Filter Status "All"
    data.map((element) => {
      let obj = {
        PCode: element.PCode,
        ProductName: element.ProductName,
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
          <div className="bg-[#8863C7] text-white p-2 text-sm px-3  hover:cursor-pointer rounded-md mt-5 md:mt-0">
            <CSVLink data={prepareCSVData(stocks ?? [])} headers={csvHeader}>
              Export Data
            </CSVLink>
          </div>
        </div>
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
