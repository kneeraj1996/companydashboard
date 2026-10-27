import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { SuccessModal } from "../../components";
import { useSearchParams } from "react-router-dom";

const ReferCandidate = () => {
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("jobTitle") || "";
  const [state, setState] = useState({
    name: "",
    position: jobTitle,
    exp: "",
    email: "",
    phone: "",
    doc: "",
    skills: "",
    showSuccessModal: false,
  });

  const { name, position, exp, email, phone, doc, skills, showSuccessModal } =
    state;

    console.log('state cinig===',state);

  useEffect(() => {
    setState((currentState) => ({
      ...currentState,
      position: jobTitle,
    }));
  }, [jobTitle]);

  const disabledSubmitButton = !(name && exp && phone && doc && skills);

  const onSavePressed = () => {
    setState({
      ...state,
      showSuccessModal: true,
      name: "",
      exp: "",
      email: "",
      phone: "",
      doc: "",
      skills: "",
    });
  };

  const onClose = () => {
    setState({
      ...state,
      showSuccessModal: false,
    });
  };

  const renderInputContainer = ({
    label,
    disabled,
    dontStyle,
    value,
    stateKey,
  }) => {
    return (
      <div className={`w-full  md:w-1/2 ${dontStyle ? "" : "mr-5"}`}>
        <h1 className="font-bold">{label}</h1>
        <input
          placeholder={label}
          onChange={(event) => {
            if (!stateKey) return;
            setState((currentState) => ({
              ...currentState,
              [stateKey]: event.target.value,
            }));
          }}
          type={
            label == "Experience (Years)" || label == "Phone Number"
              ? "number"
              : "text"
          }
          value={value}
          disabled={disabled}
          className={`h-12 w-full border-2 px-3 mt-2 rounded-md ${disabled ? "text-gray-300" : "text-black"}`}
        />
      </div>
    );
  };

  const renderDescriptionView = () => {
    return (
      <div className="w-full md:w-1/2">
        <label className="font-bold">Enter your skills</label>
        <textarea
          id="multiline-input"
          rows="4"
          cols="50"
          placeholder="Type something here..."
          className="p-3 rounded-lg border-2 h-36 mt-2 w-full"
          value={skills}
          onChange={(e) =>
            setState({
              ...state,
              skills: e.target.value,
            })
          }
        />
      </div>
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file)
      setState({
        ...state,
        doc: file.name,
      });
  };

  const renderDocumentView = (label) => {
    return (
      <div className="w-full md:w-1/2 mr-5">
        <div className="font-bold text-base">{label}</div>
        <label className="relative mt-2 flex h-36 w-full cursor-pointer items-center justify-center rounded-md border-2 text-center bg-white">
          <span className="pointer-events-none truncate px-3">
            {doc || "Choose a file"}
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

  const renderReferalForm = () => {
    return (
      <div className="my-5">
        <div className="md:flex">
          {renderInputContainer({
            label: "Job Location",
            disabled: true,
            value: "Noida",
          })}
          {renderInputContainer({
            label: "Candidate Name",
            disabled: false,
            value: name,
            stateKey: "name",
          })}
        </div>
        <div className="md:flex my-2">
          {renderInputContainer({
            label: "Position Title",
            disabled: true,
            value: position,
          })}
          {renderInputContainer({
            label: "Experience (Years)",
            disabled: false,
            dontStyle: true,
            value: exp,
            stateKey: "exp",
          })}
        </div>
        <div className="md:flex my-2">
          {renderInputContainer({
            label: "Email ID",
            disabled: false,
            value: email,
            stateKey: "email",
          })}
          {renderInputContainer({
            label: "Phone Number",
            disabled: false,
            dontStyle: true,
            value: phone,
            stateKey: "phone",
          })}
        </div>
        <div className="md:flex">
          {renderDocumentView("Upload Resume")}
          {renderDescriptionView()}
        </div>
        <button
          onClick={onSavePressed}
          disabled={disabledSubmitButton}
          className={` ${disabledSubmitButton ? "bg-gray-400" : "bg-blue-500"} flex justify-center items-center px-2 py-3 rounded-lg text-white my-5`}
        >
          <FontAwesomeIcon icon={faEnvelope} size="xs" className="mr-2" />
          Submit Referral
        </button>
      </div>
    );
  };

  return (
    <div className={`col-span-11 p-5 bg-gray-100`}>
      <SuccessModal
        isOpen={showSuccessModal}
        title={`Reference for ${jobTitle}`}
        message={`Reference for ${jobTitle} applied successfully.`}
        onClose={onClose}
      />
      <h1 className="text-3xl  font-medium">Refer a Candidate</h1>
      <p className="mt-2">Fill in the details below to submit your referral</p>
      <form>
        <div className="bg-white w-full rounded-lg p-3 mt-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-opacity bg-green-100 flex justify-center items-center">
              <FontAwesomeIcon icon={faUser} size="sm" />
            </div>
            <div className="mx-3">
              <div className="font-medium text-md">Candidate Details</div>
            </div>
          </div>
          {renderReferalForm()}
        </div>
      </form>
    </div>
  );
};

export default ReferCandidate;
