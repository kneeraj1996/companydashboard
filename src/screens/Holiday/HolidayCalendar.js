import React from 'react'

const HolidayCalendar = () => {
  return (
    <div className="h-[calc(100dvh-5rem)] w-full p-2 sm:h-full sm:p-5">
        <img
            src='https://dashboard.appinventiv.com/uploads/calendar/2026.png'
            alt="2026 holiday calendar"
            className='h-full w-full rounded-2xl object-contain'
        />
    </div>
  )
}

export default HolidayCalendar