import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Org({title, desc, rec_status, website}) {
    return (
      <div className=' w-[450px] md:w-[600px] bg-gray-100 p-2 mb-1 border-[1px] border-gray-300 hover:drop-shadow-md transition ease-in-out duration-300'>
        <h1 className='font-bold text-lg'>{title}</h1>
        <small className='text-gray-700'>{rec_status} | <a href={website} className='text-blue-600 hover:text-blue-400 transition duration-75'>{website}</a> </small>
        <p>{desc}</p>
      </div>
    )
  }


function OrgList({title, filters}) {

    const [orgs, setOrgs] = useState([])

    const fetchOrgs = async (name, filterdata) => {
        const joinedString = filterdata.categories.join("-") + "&" + filterdata.threshold
        const response = await axios.get(`http://127.0.0.1:8080/api/search/${name}/${joinedString}`)
        setOrgs(response.data.data)
    }

    useEffect(() => {
        fetchOrgs(title, filters)
    }, [title, filters])

  return (
    <>
        <div className='flex flex-col'>
            {title && <h1 className='font-bold text-2xl mb-6'>Organizations matching "{title}"</h1> }
            {orgs.map((org, index) => (
                <Org key={index} {...org}/>
            ))}
        </div>
    </>
  )
}

OrgList.propTypes = {
    title: PropTypes.string.isRequired, // Validate that message is a string and is required
    filters: PropTypes.object.isRequired
};

Org.propTypes = {
    title: PropTypes.string.isRequired, // Validate that message is a string and is required
    desc: PropTypes.string.isRequired,
    // filter: PropTypes.string.isRequired,
    rec_status: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    // tags: PropTypes.string.isRequired  
};

export default OrgList