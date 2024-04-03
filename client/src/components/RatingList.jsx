import PropTypes from 'prop-types';

import SquareRow from './SquareRow';

// map that maps the insight question number to the question
const insightQuestions = {
    '1': "How did this organization help you grow?",
    '2': "What was the most memorable event?",
    '3': "What was the most challenging part?",
    '4': "What's something you wish you knew when first joining?",
    '5': "Any tips for the interview process?",
    '6': "What's the time committment like?"
};

// map that maps the role value to the role
const roles = {
    "nonmember": "non-member",
    "member": "member",
    "officer": "officer",
    "alumni": "alumni",
    "exmember": "ex-member"
}

function Rating({rating}) {
  return (
    <div className='bg-gray-200 w-[320px] sm:w-[40%] md:w-[500px] lg:w-[40vw] p-4 border-[1px] border-gray-400 flex flex-col'>
        <div className="flex flex-row justify-between">
            <h1 className="font-bold text-md lg:text-xl">This review was made by a {roles[rating.role]}</h1>
            <h2 className="font-bold text-xl">{rating.rating}</h2>
        </div>
        <p className='text-[14px] md:text-md'>{rating.review}</p>
        <div className="grid grid-cols-2 justify-between mt-1 lg:mt-2 mb-4 gap-3 lg:gap-4 text-md">
            <div>
                <h1 className="font-bold">Social</h1>
                <SquareRow number={Number(rating.social)}/>
            </div>
            <div>
                <h1 className="font-bold">Events</h1>
                <SquareRow number={Number(rating.events)}/>
            </div>
            <div>
                <h1 className="font-bold">Happiness</h1>
                <SquareRow number={Number(rating.happiness)}/>
            </div>
            <div>
                <h1 className="font-bold">Officers</h1>
                <SquareRow number={Number(rating.officers)}/>
            </div>
        </div>
        <div>
            <h1 className="font-bold text-md">{insightQuestions[rating.insight_q]}</h1>
            <p className='mt-1 text-[14px] md:text-md'>{rating.insight_a}</p>
        </div>

    </div>
  )
}

function RatingList({ ratings }) {
  return (
    <div className='flex flex-col overflow-y-scroll scrollbar-none gap-6'>
        {ratings.map((rating, index) => (
            <Rating key={index} rating = {rating}/>
        ))}
    </div>
  )
}

export default RatingList

RatingList.propTypes = {
    ratings: PropTypes.array.isRequired, // Validate that message is a string and is required
};

Rating.propTypes = {
    rating: PropTypes.object.isRequired, // Validate that message is a string and is required
};
