import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faFloppyDisk,
  faMinus,
  faPlus,
  faSquare,
  faSquareCheck,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { SuccessModal } from "../../components";
import "react-datepicker/dist/react-datepicker.css";

const PROJECT_SELECTION_DATA = [
  {
    identifier: "Direct Healthcare",
    name: "Direct Healthcare",
  },
  {
    identifier: "Interview",
    name: "Interview",
  },
  {
    identifier: "Miscellaneous",
    name: "Miscellaneous",
  },
];

const CreateDSR = () => {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [noWorkedDone, setNoWorkedDone] = useState(false);
  const [usedAI, setUsedAI] = useState(true);
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(PROJECT_SELECTION_DATA[0].identifier);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const disabledSaveButton = !(
    description &&
    project &&
    selectedDate &&
    selectedTime
  );

  console.log("disabledSaveButton====", disabledSaveButton);

  const renderProjectSelect = () => {
    return (
      <div>
        <h1 className="font-bold text-base">PROJECT</h1>
        <select
          onChange={(e) => setProject(e.target.value)}
          value={project}
          className="h-12 w-full  border-2 px-3 mt-2 rounded-md "
        >
          {PROJECT_SELECTION_DATA.map((lng) => (
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

  const rendedNoWorkView = () => {
    return (
      <div className="my-2 flex items-center">
        <FontAwesomeIcon
          onClick={() => setNoWorkedDone(!noWorkedDone)}
          icon={noWorkedDone ? faSquareCheck : faSquare}
          size="sm"
        />
        <h1 className="text-black font-bold ml-3">NO WORK DONE</h1>
      </div>
    );
  };

  const renderAiToolView = () => {
    return (
      <div className="mt-3">
        <h1>Did you use AI tools today?</h1>
        <div className="flex">
          <div className="flex items-center">
            <FontAwesomeIcon
              onClick={() => setUsedAI(true)}
              icon={usedAI ? faCircleDot : faCircle}
              size="sm"
            />
            <p>YES</p>
          </div>
          <div className="flex items-center ml-3">
            <FontAwesomeIcon
              onClick={() => setUsedAI(false)}
              icon={!usedAI ? faCircleDot : faCircle}
              size="sm"
            />
            <p>NO</p>
          </div>
        </div>
      </div>
    );
  };

  const renderDescpriptionView = () => {
    return (
      <div>
        <h1 className="font-bold text-base">DESCRIPTION</h1>

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

  const renderCreateDSRForm = () => {
    return (
      <div className="md:flex ">
        <div className=" h-full w-full md:w-1/2 ">
          {renderProjectSelect()}
          <div className="md:flex mt-2 items-center  justify-between ">
            {renderDateTimeView(1)}
            {renderDateTimeView(2)}
            {rendedNoWorkView()}
          </div>
          {renderAiToolView()}
          <div className="mt-8 hidden md:block">{renderSaveButton()}</div>
        </div>
        <div className="w-full md:w-1/2 h-full md:ml-3">
          {renderDescpriptionView()}
          <div className="mt-5 md:hidden">{renderSaveButton()}</div>
        </div>
      </div>
    );
  };

  const renderDateTimeView = (type) => {
    return (
      <div>
        {type == 1 ? (
          <label className="font-bold text-base mr-2 md:mr-0">Select Date:</label>
        ) : (
          <label
            className={`font-bold text-base  mr-2 md:mr-0 ${noWorkedDone ? "text-gray-400" : ""}`}
          >
            Select Time:
          </label>
        )}
        {type == 1 ? (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Click to select a date"
            className="h-12 w-full  border-2 px-3 mt-2 rounded-md"
          />
        ) : (
          <DatePicker
            placeholderText="Click to select a time"
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            className="h-12 w-full  border-2 px-3 mt-2 rounded-md"
            showTimeSelect
            disabled={noWorkedDone}
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        )}
      </div>
    );
  };

  const onSaveButtonPressed = () => {
    setSelectedDate("");
    setSelectedTime("");
    setDescription("");
    setProject("");
    setShowSuccessModal(true);
  };

  const renderSaveButton = () => {
    return (
      <button
        type="button"
        disabled={disabledSaveButton}
        onClick={onSaveButtonPressed}
        className={`flex h-12 items-center justify-center rounded-lg bg-gradient-to-b from-blue-400 to-blue-500 px-3 ${disabledSaveButton ? "opacity-[0.5]" : ""}`}
      >
        <FontAwesomeIcon icon={faFloppyDisk} size="sm" className="text-white" />
        <span className="ml-2 rounded-md text-sm text-white">Save</span>
      </button>
    );
  };

  return (
    <div className="h-screen col-span-11 p-5">
      <SuccessModal
        isOpen={showSuccessModal}
        title="DSR saved successfully"
        message="Your daily status report has been saved."
        onClose={() => setShowSuccessModal(false)}
      />
      <h1 className="text-3xl  font-bold">DSR</h1>
      <p className="mt-2">
        Browse and search all employees across departments.
      </p>

      <div className="h-1/2 w-full rounded-md bg-white">
        <div className="md:flex justify-center items-center mb-3 md:justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-opacity bg-purple-300 flex justify-center items-center">
              <FontAwesomeIcon icon={faCirclePlus} size="sm" />
            </div>
            <div className="ml-3">
              <div className="font-medium text-lg">Create DSR</div>
              <div className="text-xs">Submit your daily status report</div>
            </div>
          </div>

          <div className="flex mt-3">
            <div className="hidden md:block">{renderSaveButton()}</div>
            <div
              onClick={() => setIsOpened(!isOpened)}
              className="h-12 ml-5 rounded-lg px-4 justify-center items-center flex bg-gradient-to-b from-blue-400 to-blue-500 "
            >
              <FontAwesomeIcon
                icon={isOpened ? faMinus : faPlus}
                size="sm"
                className="text-white"
              />
              <h1 className="text-white text-sm ml-2 rounded-md">Add</h1>
            </div>
          </div>
        </div>
        {isOpened ? <div>{renderCreateDSRForm()}</div> : null}
      </div>
    </div>
  );
};

export default CreateDSR;
