import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";

const JobOpeningCard = (props) => {
    const { card, onDetailViewPressed } = props;
    const navigate = useNavigate();
  return (
    <div key={card} className="w-full flex-shrink-0 px-2 pb-10 pt-2">
      
              <div className="h-[430px] w-full rounded-lg border-2 bg-white p-3 shadow-lg">
                <div className="h-40 w-full rounded-lg bg-gray-200 p-2">
                  <div className="flex h-full flex-col items-center justify-between">
                    <div className="h-10 w-10" />
                    <img
                      src="https://dashboard.appinventiv.com/uploads/award/project-management.svg"
                      className="h-12 w-12 mb-5"
                    />
                    <div className="mx-2 flex w-full items-center justify-between">
                      <div className="flex self-center rounded-md bg-white px-2 py-1.5">
                        <FontAwesomeIcon icon={faLocation} size="sm" />
                        <p className="ml-1 text-xs">Noida, Uttar Pradesh</p>
                      </div>
                      <p className="text-xs">18/9/2026</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {card.jobTitle} (#AP{card.jobId})
                  </h2>
                  <p className="text-sm text-gray-300">
                    Hiring for a Sr. {card.jobTitle}
                  </p>
                  <div className="my-2 h-1 w-full bg-gray-200" />
                </div>
                <div>
                  <div className="flex justify-between text-xs">
                    <p>No. of Openings</p>
                    <p>Experience</p>
                  </div>
                  <div className="flex justify-between text-md font-bold">
                    <p>{card.numberOfOpenings}</p>
                    <p>{card.experienceRequired}</p>
                  </div>
                  <div className="my-5 h-1 w-full bg-gray-200" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <button 
                  onClick={() => onDetailViewPressed(card.jobTitle, card.jobDescription)}
                  className="mr-2 w-1/2 rounded-md border-2 border-gray-300 py-4 text-blue-500">
                    View Details
                  </button>
                  <button 
                  onClick={() =>
                    navigate(
                      `/ReferCandidate?jobTitle=${encodeURIComponent(card.jobTitle)}`
                    )
                  }
                  className="w-1/2  rounded-md border-2 border-blue-500 bg-blue-500 py-3.5 md:py-1 text-white">
                    Refer a Candidate
                  </button>
                </div>
              </div>
            </div>
  )
}

export default JobOpeningCard