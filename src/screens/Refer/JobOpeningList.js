import React, { useState } from "react";
import { JOBS } from "../../utils/constants";
import { DetailView, JobOpeningCard } from "../../components";

const JobOpeningList = () => {
  const [detailViewData, setDetailsViewData] = useState({
    title: "",
    message: "",
    isOpened: false,
  });
  const onDetailViewPressed = (title, description) => {
    setDetailsViewData({
      title,
      message: description,
      isOpened: true,
    });
  };

  const onClose = () => {
    setDetailsViewData({
      title: "",
      message: "",
      isOpened: false,
    });
  };

  return (
    <div className="h-screen col-span-11 p-5">
      <DetailView
        title={detailViewData.title}
        message={detailViewData.message}
        isOpen={detailViewData.isOpened}
        onClose={onClose}
      />
      <h1 className="text-3xl  font-bold">Current JOB Openings</h1>
      <p className="mt-2">
        Browse open positions and refer a candidate directly from this page.
      </p>
      <div className="md:flex flex-wrap ">
        {JOBS.map((item) => {
          return (
            <div
              key={item}
              className="w-full md:w-1/4 transition-transform duration-[600ms] ease-in-out hover:scale-105"
            >
              <JobOpeningCard onDetailViewPressed={onDetailViewPressed} card={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobOpeningList;
