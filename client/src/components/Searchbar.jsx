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
    return navigate(`/search?query=${query}`)
  }

  return (
    <div className="">
        <form ref={formRef} onSubmit={handleSubmit}
        className="flex flex-row gap-8 bg-maroon justify-center items-center p-3">
          <label className='flex flex-row items-center justify-center'>
            <span className='text-white font-bold mr-3'>Discover the Possibilities</span>
            <input type="text" name="name" value={query} onChange={handleChange} className="bg-white py-3 px-6  placeholder:text-slate-500 rounded-3xl text-black outlined-none border-none font-medium w-[500px]" placeholder="Search..."/>
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
