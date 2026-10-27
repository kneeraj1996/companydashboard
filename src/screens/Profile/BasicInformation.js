import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/configSlice";

const MARITAL_DATA = [
  { identifier: "Married", name: "Married" },
  { identifier: "UnMarried", name: "UnMarried" },
];

const GENDER = [
  { identifier: "Male", name: "Male" },
  { identifier: "Female", name: "Female" },
];

const getFormData = (user) => ({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  dateOfBirth: user.dateOfBirth || "15/10/1996",
  gender: user.gender || GENDER[0].identifier,
  maritalStatus: user.maritalStatus || MARITAL_DATA[1].identifier,
  contactNumber: user.contactNumber || "",
  address: user.address || "",
});

const BasicInformation = ({ onSave }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.config.user);
  const [formData, setFormData] = useState(() => getFormData(user));

  useEffect(() => {
    setFormData(getFormData(user));
  }, [user]);

  const updateFormField = (field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  const onSavePressed = (event) => {
    event.preventDefault();
    dispatch(addUser(formData));
    onSave();
  };

  const renderInputContainer = (label, field, disabled = false) => (
    <div className="w-full mb-3 md:mb-auto md:w-1/4">
      <label className="font-bold">
        {label}
        <input
          placeholder={label}
          value={formData[field]}
          onChange={(event) => updateFormField(field, event.target.value)}
          disabled={disabled}
          className={`mt-2 h-12 w-full rounded-md border-2 border-gray-400 px-3 ${
            disabled ? "text-gray-300" : "text-black"
          }`}
        />
      </label>
    </div>
  );

  const renderDropdownContainer = (label, data, field) => (
    <div className="w-full md:w-1/4 mb-3 md:mb-auto">
      <label className="font-bold">
        {label}
        <select
          value={formData[field]}
          onChange={(event) => updateFormField(field, event.target.value)}
          className="mt-2 h-12 w-full rounded-md border-2 border-gray-400 px-3"
        >
          {data.map((option) => (
            <option
              key={option.identifier}
              className="text-black"
              value={option.identifier}
            >
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  return (
    <div className="mt-10  w-full rounded-lg border-1 bg-white p-5 shadow-xl h-screen">
      <form onSubmit={onSavePressed} className="h-full bg-white">
        <h1 className="mb-3 text-xl font-bold">Basic Information</h1>
        <div className="md:flex justify-between">
          {renderInputContainer("First Name", "firstName")}
          {renderInputContainer("Last Name", "lastName")}
          {renderInputContainer("Date Of Birth", "dateOfBirth", true)}
        </div>
        <div className="my-3 md:flex justify-between">
          {renderDropdownContainer("Gender", GENDER, "gender")}
          {renderDropdownContainer("Marital Status", MARITAL_DATA, "maritalStatus")}
          {renderInputContainer("Contact Number", "contactNumber")}
        </div>
        <div className="my-3 flex justify-between">
          <label className="w-full font-bold">
            Address
            <textarea
              placeholder="Address"
              rows={4}
              value={formData.address}
              onChange={(event) =>
                updateFormField("address", event.target.value)
              }
              className="mt-2 h-24 w-full rounded-md border-2 border-gray-400 px-3 py-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="my-5 flex h-11 w-20 items-center justify-center self-end rounded-md bg-blue-500 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default BasicInformation;
