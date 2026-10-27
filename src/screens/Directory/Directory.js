import React from 'react'
import { PeopleCard } from '../../components'
import { PEOPLE } from '../../utils/constants'
import { useSelector } from 'react-redux'

const Directory = () => {
    const familyMembers = useSelector(store => store.config.familyMembers);
  return (
    <div  className="h-screen col-span-11 p-5">
        <h1 className='text-3xl  font-bold'>Employee Directory</h1>
        <p className='mt-2'>Browse and search all employees across departments.</p>
        <div className='md:flex flex-wrap '>
            {familyMembers.map((item) => {
                return( 
                    <div key={item} className=' w-full md:w-1/4 transition-transform duration-[600ms] ease-in-out hover:scale-105'>
                        <PeopleCard item={item}/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Directory