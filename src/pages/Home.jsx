import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import Backdrop from "../components/Backdrop";

const HomePage = ({ isLoading, setIsLoading }) => {
  const [average, setAverage] = useState(null);
  const CCode = localStorage.getItem("CCode");
  const Username = localStorage.getItem("UserName");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://gloabl-app.onrender.com/api/getAverage/${CCode}`)
      .then(function (response) {
        setAverage(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  }, [CCode, setIsLoading]);

  console.log(average);

  return (
    <Layout>
      <>
        {isLoading ? <Backdrop /> : ""}

        <h3 className="font-semibold mb-8 text-md">
          {/* <Backdrop /> */}
          Welcome, <span className="text-[17px]">{Username}</span>
        </h3>
        {average ? (
          <div className="cards grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <div className="card bg-white p-4 relative rounded-b-lg">
              <div className="color h-4 bg-[#dfa446] absolute w-full left-0 top-0"></div>
              <div className="content mt-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 bg-[#dfa446] rounded-full p-2 mx-auto text-white mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h1 className="font-semibold text-sm">Avg. Purchase Rate</h1>
                {average && (
                  <h1 className="font-bold my-3">
                    {average[0]?.Purchase ? average[0]?.Purchase : 0}
                  </h1>
                )}
              </div>
            </div>
            <div className="card bg-white p-4 relative rounded-b-lg">
              <div className="color h-4 bg-[#49be74] absolute w-full left-0 top-0"></div>
              <div className="content mt-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 bg-[#49be74] rounded-full p-2 mx-auto text-white mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 className="font-semibold text-sm">Avg. Sales Rate</h1>
                {average && (
                  <h1 className="font-bold my-3">
                    {average[0]?.Sales ? average[0]?.Sales : 0}
                  </h1>
                )}
              </div>
            </div>
            <div className="card bg-white p-4 relative rounded-b-lg">
              <div className="color h-4 bg-[#9069D4] absolute w-full left-0 top-0"></div>
              <div className="content mt-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 bg-[#9069D4] rounded-full p-2 mx-auto text-white mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>

                <h1 className="font-semibold text-sm">Difference</h1>
                {average && (
                  <h1 className="font-bold my-3">
                    {average[0]?.Diff ? average[0]?.Diff : 0}
                  </h1>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="py-8">Loading...</p>
        )}
      </>
    </Layout>
  );
};

export default HomePage;
