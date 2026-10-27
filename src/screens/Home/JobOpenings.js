import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { JOBS } from "../../utils/constants";
import { DetailView, JobOpeningCard } from "../../components";

const openingCards = [0, 1, 2];

const JobOpenings = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [detailViewData, setDetailsViewData] = useState({
    title: '',
    message: '',
    isOpened: false
  });
  const touchStartX = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % openingCards.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setCurrentSlide(
      (slide) => (slide - 1 + openingCards.length) % openingCards.length
    );
  };

  const showNext = () => {
    setCurrentSlide((slide) => (slide + 1) % openingCards.length);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchDistance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(touchDistance) > 40) {
      touchDistance > 0 ? showPrevious() : showNext();
    }
    touchStartX.current = null;
  };

  const onDetailViewPressed = (title, description) => {
    setDetailsViewData({
      title,
      message: description,
      isOpened: true
    })
  }

  const onClose = () => {
    setDetailsViewData({
      title: '',
      message: '',
      isOpened: false
    })
  }

  return (
    <section className="w-full md:w-1/4" aria-label="Latest job openings">
      <DetailView
        title={detailViewData.title}
        message={detailViewData.message}
        isOpen={detailViewData.isOpened}
        onClose={onClose}
      />
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-lg font-bold">Latest Job Openings</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous job opening"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next job opening"
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
          {JOBS.map((card) => (
           <JobOpeningCard onDetailViewPressed={onDetailViewPressed} card={card}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobOpenings;
