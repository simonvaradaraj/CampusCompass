import{ useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function SearchBar({ value }) {
  const [query, setQuery] = useState(value);
  const formRef = useRef()
  let navigate = useNavigate()

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( query != "") {
      return navigate(`/search?query=${query}`)
    }
    return navigate(`/search?query=nothing`)
      
  }

  return (
    <div>
        <form ref={formRef} onSubmit={handleSubmit}
        className="flex flex-row gap-4 md:gap-8 bg-maroon justify-center items-center p-3 sm:text-sm md:text-lg">
          <label className='flex flex-row items-center justify-center w-[80vw]'>
            <div className='text-white font-bold mr-3 lg:mr-6 text-sm md:text-lg md:w-[40%] text-right'>Discover the Possibilities</div>
            <div className='w-[60vw]'>
              <input type="text" name="name" value={query} onChange={handleChange} className="bg-white py-2 md:py-3 px-4 md:px-6 w-[90%] sm:w-[70%] md:w-full lg:w-[70%] placeholder:text-slate-500 rounded-3xl text-black outlined-none border-none font-medium text-sm sm:text-md" placeholder="Search..."/>
              </div>
          </label>
        </form>
    </div>
    
  );
}

SearchBar.propTypes = {
    // handleSearch: PropTypes.func.isRequired, // Validate that getMessage is a function and is required
    value: PropTypes.string.isRequired 
};

export default SearchBar;
