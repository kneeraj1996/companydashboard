import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const LunchCouponDateBox = ({
  date,
  isToday,
  isPastDate,
  isWeekend,
  isSelectableDate,
  isSelected,
  isPurchased,
  onSelectionChange,
  onCancelRequest,
}) => {
  return (
    <div
      className={`lunch-date-box ${
        isToday ? "lunch-date-box-today" : ""
      } ${isPastDate ? "lunch-date-box-past" : ""} ${
        isWeekend ? "lunch-date-box-weekend" : ""
      } ${isPurchased ? "lunch-date-box-purchased" : ""}`}
    >
      {isSelectableDate && !isPurchased && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(event) => onSelectionChange(date, event.target.checked)}
          aria-label={`Select lunch coupon for ${date.toLocaleDateString()}`}
          className="lunch-date-checkbox"
        />
      )}
      {isPurchased && (
        <div className="lunch-date-menu-container">
          <button
            type="button"
            onClick={() => onCancelRequest(date)}
            aria-label={`More actions for ${date.toLocaleDateString()}`}
            className="lunch-date-menu-button"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      )}
      <span className="lunch-date-content">
        <span className="lunch-date-number">{date.getDate()}</span>
      </span>
    </div>
  );
};

export default LunchCouponDateBox;
