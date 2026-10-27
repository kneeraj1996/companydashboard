import { useState } from "react";
import "./LunchCoupon.css";
import LunchCouponDateBox from "./LunchCouponDateBox";

const LunchCoupon = () => {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState([]);
  const [purchasedDates, setPurchasedDates] = useState([]);
  const [dateToCancel, setDateToCancel] = useState(null);
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const leadingBlankCount = firstDay.getDay();
  const weekCount = Math.ceil((leadingBlankCount + daysInMonth) / 7);
  const calendarCells = Array.from({ length: weekCount * 7 }, (_, index) => {
    const dayNumber = index - leadingBlankCount + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) return null;
    return new Date(today.getFullYear(), today.getMonth(), dayNumber);
  });

  const updateDateSelection = (date, isSelected) => {
    const dateKey = date.toDateString();
    setSelectedDates((currentDates) =>
      isSelected
        ? currentDates.includes(dateKey)
          ? currentDates
          : [...currentDates, dateKey]
        : currentDates.filter((selectedDate) => selectedDate !== dateKey)
    );
  };

  const submitCoupons = () => {
    setPurchasedDates((currentDates) =>
      [...new Set([...currentDates, ...selectedDates])].sort(
        (firstDate, secondDate) => new Date(firstDate) - new Date(secondDate)
      )
    );
    setSelectedDates([]);
  };

  const cancelCoupon = (date) => {
    const dateKey = date.toDateString();
    setPurchasedDates((currentDates) =>
      currentDates.filter((purchasedDate) => purchasedDate !== dateKey)
    );
    setDateToCancel(null);
  };

  const renderPurchaseButtonView = () => {
    return (
      <div className="flex mb-5">
          <div className="h-40 w-1/2 bg-white rounded-lg   p-3 flex flex-col justify-between">
            <div />
            <div>
              <h1>Amount Due</h1>
              <h1 className="text-3xl">₹425</h1>
            </div>
            <div className="flex items-center">
              <h1>ℹ️</h1>
              <h1 className="font-medium ml-2 text-xs text-gray-400">Note: Amount due need to paid in cash in account office only between 26th-6th of the month.</h1>
          </div>
          </div>
          <div className="h-40 w-1/2 ml-3 bg-white rounded-lg   p-3 flex flex-col justify-between">
            <div />
            <div>
              <h1>Coupon Count</h1>
              <h1 className="text-3xl">
                {selectedDates.length + purchasedDates.length}
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1>ℹ️</h1>
                <h1 className="font-medium ml-2 text-xs text-gray-400">Note: Coupon amount is ₹25.</h1>
            </div>
            {selectedDates.length > 0 ? (
              <button
                type="button"
                onClick={submitCoupons}
                className="rounded-lg bg-green-500 px-3 py-3 text-white hover:bg-green-600"
              >
              Submit
              </button>
            ) : null}
          </div>
          </div>
          
      </div>
    )
  }

  return (
    <main className="lunch-coupon-page">
      {dateToCancel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 p-4"
          onClick={() => setDateToCancel(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-coupon-title"
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="cancel-coupon-title"
              className="text-lg font-semibold text-gray-900"
            >
              Cancel lunch coupon?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Cancel the coupon for{" "}
              {dateToCancel.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              ? This will remove it from your coupon count.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDateToCancel(null)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Keep coupon
              </button>
              <button
                type="button"
                onClick={() => cancelCoupon(dateToCancel)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Cancel coupon
              </button>
            </div>
          </section>
        </div>
      )}
      <header className="mb-4">
        <h1 className="text-3xl font-medium">Lunch Coupon</h1>
        <p className="mt-2 text-gray-600">
          You can purchase/cancel a coupon for the upcoming day before 6:40
          p.m. today.
        </p>
      </header>
      {renderPurchaseButtonView()}
      <div className="bg-white rounded-lg p-3 h-full w-full">
      <h2 className="mb-3 text-xl font-semibold text-gray-800">
        {today.toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <div className="lunch-coupon-calendar">
        <div className="lunch-weekday-row" aria-hidden="true">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="lunch-weekday-heading">
              {day}
            </div>
          ))}
        </div>
        <div
          className="lunch-date-grid"
          style={{ "--week-count": weekCount }}
          role="group"
          aria-label={`Lunch coupon dates for ${today.toLocaleDateString(
            undefined,
            { month: "long", year: "numeric" }
          )}`}
        >
          {calendarCells.map((date, index) => {
            if (!date) {
              return <div key={`blank-${index}`} aria-hidden="true" />;
            }

            const isPastDate = date < todayDate;
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isSelectableDate = date > todayDate && !isWeekend;
            const dateKey = date.toDateString();

            return (
              <LunchCouponDateBox
                key={date.toDateString()}
                date={date}
                isToday={date.toDateString() === todayDate.toDateString()}
                isPastDate={isPastDate}
                isWeekend={isWeekend}
                isSelectableDate={isSelectableDate}
                isSelected={selectedDates.includes(dateKey)}
                isPurchased={purchasedDates.includes(dateKey)}
                onSelectionChange={updateDateSelection}
                onCancelRequest={setDateToCancel}
              />
            );
          })}
        </div>
      </div>
      </div>
    </main>
  );
};

export default LunchCoupon;
