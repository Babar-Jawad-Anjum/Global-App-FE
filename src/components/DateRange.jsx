import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { DateTime } from "luxon";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRange = ({ setDate, setApplyDateFilter }) => {
  // date state
  const [dateRange, setDateRange] = useState([
    {
      startDate: DateTime.now().minus({ days: 30 }).toJSDate(),
      endDate: DateTime.now().toJSDate(),
      key: `selection`,
    },
  ]);

  // open close dateRangePicker
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const datePickerRef = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener(`keydown`, hideOnEscape, true);
    document.addEventListener(`click`, hideOnClickOutside, true);
  }, []);

  useEffect(() => {
    // Update date state when dateRange changes
    if (dateRange.length > 0) {
      const { startDate, endDate } = dateRange[0];
      setDate({
        startDate: getFormattedDate(startDate),
        endDate: getFormattedDate(endDate),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === `Escape`) {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    const targetNode = e.target;
    if (datePickerRef.current && !datePickerRef.current.contains(targetNode)) {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateRangeApply = () => {
    setApplyDateFilter(true);
    setOpen(false);
  };

  const getFormattedDate = (date) => {
    // Parse the original date string using Luxon
    const parsedDate = DateTime.fromJSDate(new Date(date));

    // Format the date in 'YYYY-MM-DD' format
    const formattedDate = parsedDate.toFormat("yyyy-MM-dd");

    return formattedDate;
  };

  return (
    <div className="inline-block relative">
      <div
        onClick={() => setOpen((open) => !open)}
        className={`p-3 bg-white text-sm rounded-md outline-none flex justify-around items-center w-[14rem] hover:cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
        <div className="flex items-center">
          {dateRange.length > 0 &&
            dateRange[0].startDate &&
            dateRange[0].endDate && (
              <>
                {getFormattedDate(dateRange[0].startDate)}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>

                {getFormattedDate(dateRange[0].endDate)}
              </>
            )}
        </div>
      </div>

      {open && (
        <div
          className="absolute right-0 rounded-md top-[46px] z-50 border shadow-2xl bg-white"
          ref={datePickerRef}
        >
          <DateRangePicker
            onChange={(item) => setDateRange([item.selection])}
            editableDateInputs={true}
            // showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={[`#57BE82`]}
            months={1}
            direction="horizontal"
          />
          <div className="buttons pb-4 px-4 flex justify-end space-x-2">
            <button
              className="bg-red-500 text-white px-6 py-1 rounded-md cursor-pointer"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="bg-green-500 text-white px-6 py-1 rounded-md cursor-pointer"
              onClick={handleDateRangeApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRange;
