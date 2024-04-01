import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';

// const back = "https://orgradar-backend-g09zvytbq-simonvaradarajs-projects.vercel.app/"
const local = "http://127.0.0.1:8080"

function Org({org, onClick}) {

    const handleClick = () => {
      // Call the onClick function with the organization data
      // console.log(org)
      onClick({ org });
    };

    return (
      <div onClick={handleClick} className=' w-[450px] md:w-[600px] bg-gray-100 hover:cursor-pointer p-2 mb-2 border-[1px] border-gray-300 hover:drop-shadow-md transition ease-in-out duration-300'>
        <h1 className='font-bold text-lg'>{org.title}</h1>
        <small className='text-gray-700'>{org.rec_status} | <a href={org.website} className='text-blue-600 hover:text-blue-400 transition duration-75'>{org.website}</a> </small>
        <p>{org.smalldesc}</p>
      </div>
    )
  }


function OrgList({title, filters, handleCurrentOrg}) {

    const [orgs, setOrgs] = useState([])
    const [offset, setOffset] = useState(0)
    const [numOrgs, setNumOrgs] = useState(1398)

    const fetchOrgs = async (name, filterdata, offset) => {
        const joinedString = filterdata.categories.join("-") + "&" + filterdata.threshold
        const response = await axios.get(`${local}/api/search/${name}/${joinedString}/${offset}`)
        // console.log(response.data.tabledata)
        setOrgs(response.data.data)
    }

    const fetchNumOrgs = async (query, filterdata) => {
      const joinedString = filterdata.categories.join("-") + "&" + filterdata.threshold
      const response = await axios.get(`${local}/api/numorgs/${query}/${joinedString}`)
      // console.log(response.data.numorgs)
      if (response.data.numorgs != numOrgs) {
        setOffset(0)
      }
      setNumOrgs(response.data.numorgs)
    }

    const handlePage = (page) => {
      setOffset((page - 1) * 10)
    }

    useEffect(() => {
        fetchNumOrgs(title, filters)
        fetchOrgs(title, filters, offset)
    }, [title, filters, offset])

    // const handleNext = () => {
    //   setOffset(offset + 10)
    // }

    // const handlePrev = () => {
    //   setOffset(offset - 10)
    // }

  return (
    <>
        <div className='flex flex-col max-w-[600px]'>
            {title && <h1 className='font-bold text-2xl mb-2'>Organizations matching "{title}"</h1> }
            <small className='mb-2'>{numOrgs} results | Page {(offset / 10) + 1} of {Math.ceil(numOrgs / 10)}</small>
            <div className='scrollbar-none overflow-y-scroll h-[72vh]'>
              {orgs.map((org, index) => (
                  <Org key={index} onClick={handleCurrentOrg} org ={org}/>
              ))}
              {/* <div className='flex flex-row gap-6 justify-center items-center mt-3 mb-3'>
                {offset != 0 && <button className='rounded-full bg-gray-300 p-2 pl-3 pr-3 transition duration-150 hover:bg-gray-200' onClick={handlePrev}>Previous Page</button>}
                {orgs.length == 10 && <button className='rounded-full bg-gray-300 p-2 pl-3 pr-3 transition duration-150 hover:bg-gray-200' onClick={handleNext}>Next Page</button>}
              </div> */}
            </div>
              <Pagination
              className="pagination-bar"
              currentPage={(offset / 10) + 1}
              siblingCount={1}
              totalCount={numOrgs}
              pageSize={10}
              onPageChange={page => handlePage(page)}
            />

        </div>
    </>
  )
}

OrgList.propTypes = {
    title: PropTypes.string.isRequired, // Validate that message is a string and is required
    filters: PropTypes.object.isRequired,
    handleCurrentOrg: PropTypes.func.isRequired
};

Org.propTypes = {
    org: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
    // tags: PropTypes.string.isRequired  
};

export default OrgList