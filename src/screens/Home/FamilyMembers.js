import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {PeopleCard} from "../../components";
import { PEOPLE } from "../../utils/constants";
import { useSelector } from "react-redux";

const familyCards = [0, 1, 2];

const FamilyMembers = () => {
  const familyMembers  = useSelector((store) => store.config.familyMembers)
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % familyCards.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setCurrentSlide(
      (slide) => (slide - 1 + familyCards.length) % familyCards.length
    );
  };

  const showNext = () => {
    setCurrentSlide((slide) => (slide + 1) % familyCards.length);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchDistance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(touchDistance) > 40) {
      touchDistance > 0 ? showPrevious() : showNext();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="w-full md:w-1/4"
      aria-labelledby="family-members-heading"
    >
      <div className="mb-2 flex h-8 items-center justify-between">
        <h2 id="family-members-heading" className="text-lg font-bold">
          Family Members
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous family member"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next family member"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {familyMembers.map((card) => (
            <PeopleCard key={card} item={card}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyMembers;
