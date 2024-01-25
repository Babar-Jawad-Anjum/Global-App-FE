import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import Backdrop from "../components/Backdrop";
import DateRange from "../components/DateRange";
import { DateTime } from "luxon";

const LedgerDetail = ({ isLoading, setIsLoading }) => {
  const [data, setData] = useState(null);
  const [applyDateFilter, setApplyDateFilter] = useState(true);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const { Code } = useParams();
  const CCode = localStorage.getItem("CCode");

  useEffect(() => {
    const fetchDate = () => {
      setIsLoading(true);
      let payload = {
        Code: Code,
        StartDate: date.startDate,
        EndDate: date.endDate,
        CCode: CCode,
      };
      axios
        .post(
          `https://gloabl-app.onrender.com/api/getLedgerData`,
          // `${process.env.REACT_APP_LOCAL_BE_URL}/api/getLedgerData`,
          payload
        )
        .then(function (response) {
          setData(response.data);
          // making applyDateFilter to false after making the API call so that I can set it to true again for making api call
          setApplyDateFilter(false);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          // making applyDateFilter to false after making the API call so that I can set it to true again for making api call
          setApplyDateFilter(false);
          setIsLoading(false);
        });
    };

    if (applyDateFilter && date.startDate !== "" && date.endDate !== "") {
      fetchDate();
      setApplyDateFilter(false);
    }
  }, [applyDateFilter, date.startDate, date.endDate]);

  const formatDate = (date) => {
    // Parse the original date string using Luxon
    const parsedDate = DateTime.fromJSDate(new Date(date));

    // Format the date in 'YYYY-MM-DD' format
    const formattedDate = parsedDate.toFormat("yyyy-MM-dd");

    return formattedDate;
  };

  return (
    <Layout>
      <div className="bg-gray-100">
        {isLoading ? <Backdrop /> : ""}
        <div className="flex justify-end">
          <DateRange
            setDate={setDate}
            setApplyDateFilter={setApplyDateFilter}
          />
        </div>
        {data && data.length > 0 && !isLoading ? (
          <div className="">
            <div className="pb-6 pt-4 pl-8 flex flex-col md:flex-row md:justify-between">
              <div className="mb-5 md:mb-0">
                <div className="flex items-center gap-2 mb-4">
                  <p className="font-semibold">Account Name:</p>
                  <p>{data[0]?.AcName || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="font-semibold">Account Number:</p>
                  <p>{data[0]?.AcNo || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">AutoId:</p>
                  <p>{data[0]?.AutoId || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-scroll w-[100%]">
              <div className="min-w-[700px] overflow-hidden bg-gray-100">
                <div
                  className={`grid grid-cols-6 gap-3 ${
                    Code.charAt(0) === "S"
                      ? "bg-[#D19A42] text-white"
                      : "bg-green-300"
                  }  p-3 text-center`}
                >
                  <p>Date</p>
                  <p>Invoice #</p>
                  <p>Description</p>
                  <p>Debit</p>
                  <p>Credit</p>
                  <p>Balance</p>
                </div>
                {data.map((element) => (
                  <div className="grid grid-cols-6 gap-3 p-3 border-b border-black text-sm text-center">
                    <p>{formatDate(element.Date)}</p>
                    <p>{element.InvoiceNo || "-"}</p>
                    <p>{element.Description || "-"}</p>
                    <p>{element.Dr || "-"}</p>
                    <p>{element.Cr || "-"}</p>
                    <p>{element.Balance || "-"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          "No date found"
        )}
      </div>
    </Layout>
  );
};

export default LedgerDetail;
