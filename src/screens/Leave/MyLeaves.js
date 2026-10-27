import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPlus,
  faCirclePlus,
  faSquare,
  faSquareCheck,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { SuccessModal } from "../../components";

const LEAVE_CARDS = [
  {
    title: "Planned Leave (CL)",
    current: 5.5,
    expected: 6.0,
    taken: 0.5,
    color: "bg-green-100",
  },
  {
    title: "Privileged Leave",
    current: 16.5,
    expected: 16.5,
    taken: 0,
    color: "bg-blue-100",
  },
  {
    title: "Emergency Leave (CL)",
    current: 6,
    expected: 6.0,
    taken: 0,
    color: "bg-yellow-100",
  },
  {
    title: "Short Leaves",
    current: 7,
    expected: 10.0,
    taken: 3,
    color: "bg-purple-100",
  },
  {
    title: "Work From Home (WFH)",
    current: 1,
    expected: 1.0,
    taken: 0.4,
    color: "bg-amber-100",
  },
];

const LEAVE_TYPES = [
  {
    identifier: "Planned Leave (CL)",
    name: "Planned Leave (CL)",
  },
  {
    identifier: "Privileged Leave",
    name: "Privileged Leave",
  },
  {
    identifier: "Emergency Leave",
    name: "Emergency Leave",
  },
  {
    identifier: "Short Leave",
    name: "Short Leave",
  },
  {
    identifier: "Work From Home",
    name: "Work From Home",
  },
];

const MyLeaves = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(LEAVE_TYPES[0].identifier);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const disabledSaveButton = !(
    selectedStartDate &&
    selectedEndDate &&
    description
  );

  const nativeProgressBar = ({ value, max = 100, color }) => {
    return (
      <div>
        <progress
          id="loading-progress"
          value={value}
          max={max}
          className={`/* 1. Reset standard layout & set dimensions */
          w-full h-1.5 block appearance-none overflow-hidden rounded-full
          
          /* 2. Style the background track (Chrome/Safari) */
          [&::-webkit-progress-bar]:bg-slate-200
          [&::-webkit-progress-bar]:rounded-full
          
          /* 3. Style the moving value indicator (Chrome/Safari) */
          [&::-webkit-progress-value]:${color}
          [&::-webkit-progress-value]:rounded-full
          [&::-webkit-progress-value]:transition-all
          [&::-webkit-progress-value]:duration-300
          
          /* 4. Style the moving value indicator (Firefox) */
          [&::-moz-progress-bar]:bg-indigo-600
          [&::-moz-progress-bar]:rounded-full
          `}
        />
      </div>
    );
  };

  const renderLeaveType = () => {
    return (
      <div>
        <h1 className="font-medium text-base">LEAVE TYPE</h1>
        <select
          onChange={(e) => setSelectedLeave(e.target.value)}
          value={selectedLeave}
          className="h-12 w-full  border-2 px-3 mt-2 rounded-md "
        >
          {LEAVE_TYPES.map((lng) => (
            <option
              key={lng.identifier}
              className="text-black"
              value={lng.identifier}
            >
              {lng.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const leaveTypeCard = (item) => {
    const { title, current, expected, taken, color } = item;
    return (
      <div className="mr-3 mb-3 flex h-36 w-full md:w-64 flex-col justify-between rounded-lg bg-white p-3">
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-medium text-black">{title}</h1>
          <div
            className={`h-10 w-10 rounded-lg  flex justify-center items-center border-2 ${color}`}
          >
            <FontAwesomeIcon icon={faCalendar} size="xs" />
          </div>
        </div>
        <div className="flex items-center">
          <h1 className="font-medium text-2xl">{current}</h1>
          <h1 className="text-xs text-gray-400"> / {expected}</h1>
        </div>
        <h1 className="text-xs text-gray-500">{taken} Taken</h1>
        {nativeProgressBar({ value: taken, max: expected, color })}
      </div>
    );
  };

  const renderLeaveCards = () => {
    return (
      <div className="md:flex flex-wrap mt-3">
        {LEAVE_CARDS.map((item) => {
          return leaveTypeCard(item);
        })}
      </div>
    );
  };

  const renderDateTimeView = (type) => {
    return (
      <div className="flex flex-col">
        {type == 1 ? (
          <label className="font-medium text-base">Start Date:</label>
        ) : (
          <label className={`font-medium text-base`}>End Date:</label>
        )}
        {type == 1 ? (
          <DatePicker
            selected={selectedStartDate}
            onChange={(date) => setSelectedStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Click to select a date"
            className="h-12 w-full  border-2 px-3 mt-2 rounded-md"
          />
        ) : (
          <DatePicker
            selected={selectedEndDate}
            onChange={(date) => setSelectedEndDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Click to select a date"
            className="h-12 w-full  border-2 px-3 mt-2 rounded-md"
          />
        )}
      </div>
    );
  };

  const renderHalfView = () => {
    return (
      <div className="flex items-center mt-3">
        <FontAwesomeIcon
          onClick={() => setIsHalfDay(!isHalfDay)}
          icon={isHalfDay ? faSquareCheck : faSquare}
          size="xs"
        />
        <h1 className="font-medium text-lg ml-2">Half Day?</h1>
      </div>
    );
  };

  const renderInputView = (label) => {
    return (
      <div className="my-3">
        <div className="font-medium text-base">{label}</div>
        <input className="h-12 w-full  border-2 px-3 mt-2 rounded-md" />
      </div>
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file.name);
  };

  const renderDescpriptionView = () => {
    return (
      <div>
        <h1 className="font-medium text-base">LEAVE REASON</h1>

        <div className="h-96 border-2 w-full mt-2 rounded-lg">
          <textarea
            id="multiline-input"
            rows="4"
            cols="50"
            placeholder="Description"
            className="p-3 h-full w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderDocumentView = (label) => {
    return (
      <div className="my-3 ">
        <div className="font-medium text-base">{label}</div>
        <label className="relative mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 text-center bg-white">
          <span className="pointer-events-none truncate px-3">
            {selectedFile || "Choose a file"}
          </span>
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 bg-white"
            aria-label={label}
          />
        </label>
      </div>
    );
  };

  const onSaveButtonPressed = () => {
    setSelectedStartDate("");
    setSelectedEndDate("");
    setDescription("");
    setSelectedFile("");
    setShowSuccessModal(true);
  };

  const renderSaveAndCancelView = () => {
    return (
      <div className="flex items-center w-full ">
        <button
          type="button"
          onClick={onSaveButtonPressed}
          disabled={disabledSaveButton}
          className={`h-12 w-24 text-sm flex justify-center items-center mr-5 bg-green-400 text-white rounded-lg ${disabledSaveButton ? "opacity-[0.5]" : ""}`}
        >
          <FontAwesomeIcon icon={faCheck} className="mr-2" size="sm" />
          SAVE
        </button>
        <button
          type="button"
          onClick={() => setIsOpened(!isOpened)}
          className="h-12 w-24 text-sm flex justify-center items-center border-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faXmark} className="mr-2" size="sm" />
          Cancel
        </button>
      </div>
    );
  };

  const renderCreateLeaveForm = () => {
    return (
      <div className="md:flex mt-5 bg-white p-3 rounded-lg ">
        <div className=" h-full w-full md:w-1/2 ">
          {renderLeaveType()}
          {renderHalfView()}
          <div className="flex mt-2 items-center  justify-between ">
            {renderDateTimeView(1)}
            {renderDateTimeView(2)}
          </div>
          {renderInputView("Remarks")}
          {renderDocumentView("Upload Document")}
          <div className="mt-20 hidden md:block">
            {renderSaveAndCancelView()}
          </div>
        </div>
        <div className="h-full w-full md:ml-3 md:w-1/2">
          {renderDescpriptionView()}
          <div className="mt-5 md:hidden">
            {renderSaveAndCancelView()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${isOpened ? "h-full" : "h-screen"} col-span-11 p-5 bg-gray-100`}
    >
      <SuccessModal
        isOpen={showSuccessModal}
        title={selectedLeave}
        message={`${selectedLeave} applied successfully.`}
        onClose={() => setShowSuccessModal(false)}
      />
      <h1 className="text-3xl  font-medium">My Leaves</h1>
      <p className="mt-2">
        Track your leave balance and manage leave applications.
      </p>
      {renderLeaveCards()}
      <div className="flex items-center justify-between bg-white rounded-lg p-3 ">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-md bg-opacity bg-green-100 flex justify-center items-center">
            <FontAwesomeIcon icon={faCirclePlus} size="sm" />
          </div>
          <div className="mx-3">
            <div className="font-medium text-md">Apply Leave</div>
            <div className="text-xs">Submit a new leave application</div>
          </div>
        </div>

        <div className="flex ">
          {/* {renderSaveButton()} */}
          <div
            onClick={() => setIsOpened(!isOpened)}
            className="h-10 ml-5 rounded-lg px-4 justify-center items-center flex bg-gradient-to-b from-green-600 to-green-500 "
          >
            <FontAwesomeIcon icon={faPlus} size="sm" className="text-white" />
            <h1 className="text-white text-sm ml-2 rounded-md">Add New</h1>
          </div>
        </div>
      </div>
      {isOpened ? renderCreateLeaveForm() : null}
    </div>
  );
};

export default MyLeaves;
