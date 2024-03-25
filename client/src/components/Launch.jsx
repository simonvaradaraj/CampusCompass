import{ useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Launch({ handleSearch }) {

    const [query, setQuery] = useState('');
    const formRef = useRef()

    const handleChange = (event) => {
        const { value } = event.target;
        setQuery(value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query)
  }

  return (
    <div className='bg-maroon h-[100vh] flex items-center justify-center flex-col'>
        <h1 className='text-white font-bold text-5xl mb-10'>What to Join?</h1>
        <form ref={formRef} onSubmit={handleSubmit}
        className="w-[100vw]">
          <label className='flex flex-row items-center justify-center'>
            <input type="text" name="name" value={query} onChange={handleChange} className="bg-white py-3 px-6  placeholder:text-slate-500 rounded-3xl text-black outlined-none border-none font-medium w-[40%]" placeholder="What do you want in an org?"/>
          </label>
        </form>
    </div>
  )
}

Launch.propTypes = {
    handleSearch: PropTypes.func.isRequired // Validate that getMessage is a function and is required
};

export default Launch