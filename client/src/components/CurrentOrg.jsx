import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';

function CurrentOrg({ title, desc, rec_status, website }) {

  // const [border, setBorder] = useState("")
  // const [background, setBackground] = useState("")

  // useEffect(() => {
  //   setBorder(rec_status.split(' ').join('_') + "_Border")
  //   setBackground(rec_status.split(' ').join('_'))
  // }, [rec_status])

  return (
    <div className='bg-gray-100 w-[45%] border-[1px] border-gray-300 p-5 h-[85vh]'>
      <h1 className='font-bold text-3xl mb-3'>{title}</h1>
      <div className={`bg-blue-100 border-2 border-blue-400 p-1 pl-2 pr-2 text-[13px] w-fit mb-2 rounded-md`}>
        {rec_status}
      </div>
      <a href={website} className='text-lg'>Website Link: <span className='text-blue-600 hover:text-blue-400 transition duration-75'>{website}</span></a>
      <p>{desc}</p>
      
      
    </div>
  )
}

export default CurrentOrg

CurrentOrg.propTypes = {
  title: PropTypes.string.isRequired, // Validate that message is a string and is required
  desc: PropTypes.string.isRequired,
  // filter: PropTypes.string.isRequired,
  rec_status: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  // tags: PropTypes.string.isRequired  
};