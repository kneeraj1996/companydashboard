import React from 'react'
import ProfileView from './ProfileView'
import PunchTime from './PunchTime'
import JobOpenings from './JobOpenings'
import FamilyMembers from './FamilyMembers'

const Home = () => {
  return (
    <div className='h-screen col-span-1 bg-gray-100 p-5'>
      <ProfileView />
      <PunchTime />
      <div className='flex flex-col items-start gap-6 md:flex-row'>
        <JobOpenings />
        <FamilyMembers />
      </div>
    </div>
  )
}

export default Home