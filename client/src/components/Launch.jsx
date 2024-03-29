import{ useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { Form, redirect } from 'react-router-dom';

export const searchAction = async ({ request }) => {
  console.log(request)
  const data = await request.formData()

  const submission = {
    query: data.get('query')
  }

  return redirect(`/search/${submission.name}`)
} 

function Launch() {

    const [query, setQuery] = useState('');
    const formRef = useRef()

    const handleChange = (event) => {
        const { value } = event.target;
        setQuery(value);
    };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   return redirect(`/search/${}`)
  // }

  return (
    <div className='bg-maroon h-[100vh] flex items-center justify-center flex-col'>
        <h1 className='text-white font-bold text-5xl mb-10'>What to Join?</h1>
        <Form ref={formRef} action="/search"
        className="w-[100vw]">
          <label className='flex flex-row items-center justify-center'>
            <input type="text" name="query" value={query} onChange={handleChange} className="bg-white py-3 px-6  placeholder:text-slate-500 rounded-3xl text-black outlined-none border-none font-medium w-[40%]" placeholder="What do you want in an org?"/>
          </label>
        </Form>
    </div>
  )
}

// Launch.propTypes = {
//     handleSearch: PropTypes.func.isRequired // Validate that getMessage is a function and is required
// };

export default Launch