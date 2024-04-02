import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CurrentOrg({ org }) {

  return (
    <div className='bg-gray-100 w-[45%] border-[1px] border-gray-300 p-5 h-[85vh]'>
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
  )
}

export default CurrentOrg

CurrentOrg.propTypes = {
  org: PropTypes.object.isRequired
};