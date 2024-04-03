import PropTypes from 'prop-types';

function CallToAction({onClick}) {
    return (
        <div className='text-center bg-gray-200 w-[80vw] lg:w-[40vw] p-4 border-[1px] border-gray-400 flex justify-center h-[10vh] items-center  hover:bg-gray-300 transition duration-150' onClick={onClick}>
            <p className="text-mg lg:text-xl">Tell your experience by writing a review!</p>
        </div>
        )
    }

  export default CallToAction

CallToAction.propTypes = {
    onClick: PropTypes.func.isRequired, // Validate that message is a string and is required
};