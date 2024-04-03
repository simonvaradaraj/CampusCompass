import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CurrentOrg({ org, onClick }) {

  const toggleVisibility = () => {
    onClick();
  };

  return (
    <>
      <div className='hidden md:block bg-gray-100 w-[45%] border-[1px] border-gray-300 p-5 h-[85vh]'>
        <h1 className='font-bold text-3xl mb-4'>{org.title}</h1>
        <div className='flex flex-row gap-4'>
          <div className={`bg-blue-100 border-2 border-blue-400 p-1 pl-2 pr-2 text-[13px] w-fit mb-2 rounded-md`}>
            {org.rec_status}
          </div>
          {org.founded != 'N/A' ? <div className={`bg-purple-100 border-2 border-purple-400 p-1 pl-2 pr-2 text-[13px] w-fit mb-2 rounded-md`}>
            Founded: {org.founded}
          </div> : <div className={`bg-red-100 border-2 border-red-400 p-1 pl-2 pr-2 text-[13px] w-fit mb-2 rounded-md`}>
            Founded: {org.founded}
          </div>}
        {org.phonenum != 'N/A' && <div className="flex flex-row gap-4">
            <p className='text-gray-400'>|</p>
            <p className=''>{org.phonenum}</p>
          </div>}
          
        </div>
        <div className="mt-4 flex flex-col">
          <h2 className='font-bold text-lg'>What the Org is About:</h2>
          <p className=''>{org.desc}</p>
        </div>
        <div className="mt-2 flex flex-col">
          <h2 className='font-bold text-lg'>Website Links:</h2>
          <a href={org.website} className=''><span className='text-blue-600 hover:text-blue-400 transition duration-75'>{org.website}</span></a>
          {org.website2 != 'N/A' && <a href={`https://${org.website2}`} className=''><span className='text-blue-600 hover:text-blue-400 transition duration-75'>{org.website2}</span></a>}
        </div>

        <Link to={`/org?org_id=${org.org_id}&uni_id=${org.uni_id}`}>
          <div className='bg-gray-200 border-[1px] border-gray-400 absolute top-[80%] flex justify-center w-[43%] h-[10vh] items-center rounded-md transition duration-150 hover:bg-gray-300'>
          <h2 className='font-bold text-xl text-gray-800'>View reviews about {org.title}</h2>
        </div>
        </Link>

      </div>

      
      <div className="flex md:hidden absolute top-0 left-0 w-full h-full bg-gray-100 flex-col p-4 items-center">
        <button className="absolute top-4 left-4 flex flex-row items-center" onClick={toggleVisibility}><img src="back_arrow.png" alt="back arrow" className='w-7'/><p className='text-sm ml-[-2px] font-bold'>Go Back</p></button>
        <div className="w-full mt-10">
          <h1 className='font-bold text-2xl mb-1'>{org.title}</h1>
          {org.phonenum != 'N/A' && <div className=" text-sm mb-3 text-gray-600">
            <p className='text-gray-400'></p>
            <p className=''>{org.phonenum}</p>
          </div>}
          <div className='flex flex-row gap-4'>
            <div className={`bg-blue-100 border-2 border-blue-400 p-1 pl-2 pr-2 text-[11px] w-fit mb-2 rounded-md`}>
              {org.rec_status}
            </div>
            {org.founded != 'N/A' ? <div className={`bg-purple-100 border-2 border-purple-400 p-1 pl-2 pr-2 text-[11px] w-fit mb-2 rounded-md`}>
              Founded: {org.founded}
            </div> : <div className={`bg-red-100 border-2 border-red-400 p-1 pl-2 pr-2 text-[13px] w-fit mb-2 rounded-md`}>
              Founded: {org.founded}
            </div>}
          </div>
        </div>
        
        <div className="mt-2 flex flex-col w-full">
          <h2 className='font-bold text-md'>What the Org is About:</h2>
          <p className='text-sm'>{org.desc}</p>
          <div className="mt-2 flex flex-col">
          <h2 className='font-bold text-md'>Website Links:</h2>
          <a href={org.website} className='text-sm'><span className='text-blue-600 hover:text-blue-400 transition duration-75'>{org.website}</span></a>
          {org.website2 != 'N/A' && <a href={`https://${org.website2}`} className=''><span className='text-blue-600 hover:text-blue-400 transition duration-75 text-sm'>{org.website2}</span></a>}
        </div>
        </div>
        
        <div className="w-[90%] flex justify-center items-center mt-4">
          <Link to={`/org?org_id=${org.org_id}&uni_id=${org.uni_id}`}>
            <div className='bg-gray-200 border-[1px] border-gray-400 rounded-md transition duration-150 hover:bg-gray-300 text-center p-2 pl-3 pr-3'>
            <h2 className='font-bold text-md text-gray-800'>View reviews about {org.title}</h2>
          </div>
          </Link>
        </div>
      </div>

    </>
  )
}

export default CurrentOrg

CurrentOrg.propTypes = {
  org: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};