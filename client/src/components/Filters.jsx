import{ useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Breakbar() {
  return (
    <div className='w-full bg-gray-300 h-[1px]'></div>
  )
}

function Filters({ handleFilters }) {
  // const [filters, setFilters] = useState({});
  const formRef = useRef()

  const [categories, setCategories] = useState({
    academics: false,
    fineArts: false,
    greekLife: false,
    leadership: false,
    professional: false,
    spiritual: false,
    cultural: false,
    service: false,
    social: false,
    military: false,
    residenceHalls: false,
    specialInterest: false
  });

  const properCase = {
    "academics" : "Academics",
    "fineArts" : "Fine Arts",
    "greekLife" : "Greek Life",
    "leadership" : "Leadership",
    "professional" : "Professional",
    "spiritual" : "Spiritual",
    "cultural" : "Cultural",
    "service" : "Service",
    "social" : "Social",
    "military" : "Military",
    "residenceHalls" : "Residence Halls",
    "specialInterest" : "Special Interest"
  }

  const categorylist = [
    'academics',
    'fineArts',
    'greekLife',
    'leadership',
    'professional',
    'spiritual',
    'cultural',
    'service',
    'social',
    'military',
    'residenceHalls',
    'specialInterest'
  ];

  const [orgsPreference, setOrgsPreference] = useState('');

  const handleCheckboxChange = (category) => {
    setCategories({ ...categories, [category]: !categories[category] });
  };

  const handleOrgsPreferenceChange = (e) => {
    setOrgsPreference(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let categoryArray = [];
    let thresh = "all";

    for (let i = 0; i <= 11; i++) {
      if (e.target[i].checked) { categoryArray.push(categorylist[i]) }
    }

    if (categoryArray.length === 0) {categoryArray = categorylist }

    if (e.target[12].checked) { thresh = "rec"}
    else if (e.target[13].checked) { thresh = "pend"}
    else if (e.target[14].checked) { thresh = "all" }

    const data = {
      categories: categoryArray,
      threshold: thresh
    }

    // console.log(data)
    handleFilters(data)
  }

  return (
    <div className="w-[10%]">

        <h2 className='font-bold text-lg mb-2'>Filters</h2>
        <form ref={formRef} onSubmit={handleSubmit}
        className="flex flex-col gap-4">
          <div className='flex flex-col gap-[2px]'>
            <h2 className='font-bold mb-2'>Categories</h2>
            {Object.keys(categories).map((category, index) => (
              <div key={index}className='flex flex-row items-center'>
                <input
                  type="checkbox"
                  id={category}
                  checked={categories[category]}
                  onChange={() => handleCheckboxChange(category)}
                  className='h-5 w-5 accent-teal-600'
                />
                <label htmlFor={category} className='ml-2'>{properCase[category]}</label>
              </div>
            ))}
          </div>
          <Breakbar/>
          <div className='flex flex-col gap-[2px]'>
          <h2 className='font-bold mb-2'>Orgs Preference</h2>
            <div className='flex flex-row items-center'>
              <input
                type="radio"
                id="recognized"
                name="orgPreference"
                value="recognized"
                checked={orgsPreference === 'recognized'}
                onChange={handleOrgsPreferenceChange}
                className='h-5 w-5 accent-teal-600'
              />
              <label htmlFor="recognized" className='ml-2'>Only Recognized Orgs</label>
            </div>
            <div className='flex flex-row items-center'>
              <input
                type="radio"
                id="pendingRecognition"
                name="orgPreference"
                value="pendingRecognition"
                checked={orgsPreference === 'pendingRecognition'}
                onChange={handleOrgsPreferenceChange}
                className='h-5 w-5 accent-teal-600'
              />
              <label htmlFor="pendingRecognition" className='ml-2'>Pending Recognition</label>
            </div>
            <div className='flex flex-row items-center'>
              <input
                type="radio"
                id="all"
                name="orgPreference"
                value="all"
                // checked={orgsPreference === 'all'}
                onChange={handleOrgsPreferenceChange}
                className='h-5 w-5 accent-teal-600'
                defaultChecked
              />
              <label htmlFor="all" className='ml-2'>All Orgs</label>
            </div>
          </div>
          <Breakbar/>
          <label className='flex flex-row items-center justify-center bg-orange-300 hover:bg-orange-200 rounded-full p-2 transition duration-150'>
            <button type="submit">Apply Filters</button>
          </label>




          
        </form>
    </div>
  )
}

Filters.propTypes = {
  handleFilters: PropTypes.func.isRequired, // Validate that getMessage is a function and is required
};

export default Filters