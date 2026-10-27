import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faIdCardClip, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import BasicInformation from "./BasicInformation";
import { SuccessModal } from '../../components';
import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/helper";
import { useSelector } from "react-redux";

const Profile = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
 const user = useSelector((store) => store.config.user);
  
 if(!user) return null;

  const renderProfileHeaderContainer = () => {
    return (
    <div>
      <div className="bg-gradient-to-r from-blue-700 to-blue-400 h-44 w-full rounded-2xl text-white flex items-center px-5">
        <img
          src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
          className="h-32 w-32 rounded-full"
        />
        <div className="w-full px-5">
          <h1 className="text-2xl font-bold">{capitalizeFirstLetter(user.displayName)}</h1>
          <div className="flex justify-between w-full font-bold">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} size="xs" />
                <p className="ml-1 text-sm md:text-base">Email: {user.email}</p>
            </div>
            <div className="flex items-center w-0 invisible md:w-auto md:visible">
                <FontAwesomeIcon icon={faIdCardClip} size="xs" />
                <p  className="ml-1">Employee ID: AI2358</p>
            </div>
            <div className="flex items-center w-0 invisible md:w-auto md:visible">
                <FontAwesomeIcon icon={faBriefcase} size="xs" />
                <p  className="ml-1">Designation: Sr. Software Engineer</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
  }

  return (
    <div className="h-screen  col-span-11 pr-5">
      <SuccessModal
        isOpen={showSuccessModal}
        title={'Profile'}
        message={'Profile saved successfully.'}
        onClose={() => setShowSuccessModal(false)}
      />
      {renderProfileHeaderContainer()}
      <BasicInformation 
        onSave={() => setShowSuccessModal(!showSuccessModal)}
      />
    </div>
  )

  
};

export default Profile;
