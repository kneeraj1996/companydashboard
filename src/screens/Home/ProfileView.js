import React from 'react'
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter, timeOfDay, formattedDate, formattedTime } from '../../utils/helper';

const ProfileView = () => {
  const user = useSelector((store) => store.config.user);
  return (
    <div className='flex'>
        <img
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTxoJOzDhj-8nkfEfAibh9ZBeMDnUplrTgTBnScLo39A&s=10'}
            className='h-24 w-24 rounded-full mr-5'
        />
        <div className='ml-3'>
            <h1 className='text-xl mb-1'>Good {timeOfDay}!</h1>
            {user&& user.displayName? <h1 className='text-xl font-bold'>{capitalizeFirstLetter(user.displayName)}</h1>: null}
            <p className='text-sm'>{formattedDate}-{formattedTime} . Sr. Software Engineer</p>
        </div>
    </div>
  )
}

export default ProfileView