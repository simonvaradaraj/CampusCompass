// use axios to make a post request on form submission
import axios from 'axios'
import { useState } from 'react';
import PropTypes from 'prop-types';

function ReviewForm({handleReview, handleCancel, uni_id, org_id}) {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const data = {
            uni_id: uni_id,
            org_id: org_id,
            datetime: Date().toLocaleString(),
            role: formData.get("role"),
            review: formData.get("review"),
            social: formData.get("social"),
            events: formData.get("events"),
            happiness: formData.get("happiness"),
            officers: formData.get("officers"),
            insight_q: formData.get("insight"),
            insight_a: formData.get("answer")
        }
        
        try {
            const response = await axios.post('https://orgradar-backend.onrender.com/api/createrating', data);
            console.log(response.data);
            handleReview()
            // Handle success
        } catch (error) {
            console.error(error);
            // Handle error
        }
    }

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);

    const handleInputChange = () => {
        const form = document.getElementById("reviewForm");
        const formData = new FormData(form);
        const isComplete = Array.from(formData.values()).every(value => value !== "");
        setIsFormComplete(isComplete);

        const isInvalid = Array.from(formData.entries()).some(([name, value]) => {
            if (name === "social" || name === "events" || name === "happiness" || name === "officers") {
                return Number(value) < 1 || Number(value) > 5;
            }
            return false;
        });
        setIsFormValid(!isInvalid);
    }

    return (
        <div className="bg-white w-[80%] lg:w-[50%] h-[70vh] border-[1px] border-gray-400 p-1 lg:p-2 text-xs xs:text-sm md:text-md lg:text-lg">
            {/* create a form that has inputs role (dropdown), review (textarea), grouped together (social (1-5), events (1-5), happiness (1-5), officers (1-5)), insight question (dropdown), question answer (textarea)*/}
            <form id="reviewForm" className="flex flex-col items-center justify-center h-full pb-4 overflow-y-scroll scrollbar-none" onSubmit={handleSubmit}>
                <h1 className="font-bold text-lg xs:text-xl lg:text-2xl mt-6 mb-2 lg:mb-4">Write a Review</h1>
                <div className="w-[80%]">
                    <label htmlFor="role" className="block font-bold">Role</label>
                    <select name="role" id="role" className="w-full p-2 border-[1px] border-gray-400" required onChange={handleInputChange}>
                        <option value="">Select a role</option>
                        <option value="nonmember">Non-Member</option>
                        <option value="member">Member</option>
                        <option value="officer">Officer</option>
                        <option value="alumni">Alumni</option>
                        <option value="exmember">Ex-Member</option>
                    </select>
                </div>
                <div className="w-[80%] mt-2 lg:mt-4">
                    <label htmlFor="review" className="block font-bold">Review</label>
                    <textarea name="review" id="review" placeholder='Let your thoughts out...' className="w-full p-2 border-[1px] border-gray-400" required onChange={handleInputChange}></textarea>
                </div>
                <div className="w-[80%] mt-2 lg:mt-4 flex flex-row gap-4">
                    <div className="w-[80%]">
                        <label htmlFor="social" className="block font-bold">Social <span className='text-xs md:text-sm font-normal'>(1-5)</span></label>
                        <input type="number" min='1' max='5' placeholder='1' name="social" id="social" className="mt-1 w-full p-2 border-[1px] border-gray-400" required onChange={handleInputChange}/>
                    </div>
                    <div className="w-[80%]">
                        <label htmlFor="events" className="block font-bold">Events <span className='text-xs md:text-sm font-normal'>(1-5)</span></label>
                        <input type="number" min='1' max='5' placeholder='1' name="events" id="events" className="mt-1 w-full p-2 border-[1px] border-gray-400" required onChange={handleInputChange}/>
                    </div>
                    <div className="w-[80%]">
                        <label htmlFor="happiness" className="block font-bold">Happiness <span className='text-xs md:text-sm font-normal'>(1-5)</span></label>
                        <input type="number" min='1' max='5' placeholder='1' name="happiness" id="happiness" className="mt-1 w-full p-2 border-[1px] border-gray-400" required onChange={handleInputChange}/>
                    </div>
                    <div className="w-[80%]">
                        <label htmlFor="officers" className="block font-bold">Officers <span className='text-xs md:text-sm font-normal'>(1-5)</span></label>
                        <input type="number" min='1' max='5' placeholder='1' name="officers" id="officers" className="mt-1 w-full p-2 border-[1px] border-gray-400" required onChange={handleInputChange}/>
                </div>
                </div>
                <div className="w-[80%] mt-2 lg:mt-4">
                    <label htmlFor="insight" className="block font-bold">Insight Question</label>
                    <select name="insight" id="insight" className="w-full p-1 lg:p-2 border-[1px] border-gray-400" required onChange={handleInputChange}>
                        <option value="1">How did this organization help you grow?</option>
                        <option value="2">What was the most memorable event?</option>
                        <option value="3">What was the most challenging part?</option>
                        <option value="4">What&apos;s something you wish you knew when first joining?</option>
                        <option value="5">Any tips for the interview process?</option>
                        <option value="6">What&apos;s the time committment like?</option>
                    </select>
                </div>
                <div className="w-[80%] mt-2 lg:mt-4">
                    <label htmlFor="answer" className="block font-bold">Answer</label>
                    <textarea name="answer" placeholder='This will help other students...' id="answer" className="w-full p-2 border-[1px] border-gray-400" required onChange={handleInputChange}></textarea>
                </div>
                <div className="flex flex-row gap-5 lg:gap-10">
                    <button className="bg-blue-500 text-white p-2 pl-3 pr-3 mt-4 hover:bg-blue-400 transition duration-150" disabled={!isFormComplete || !isFormValid}>Submit</button>
                    <button className="bg-red-500 text-white p-2 pl-3 pr-3 mt-4 hover:bg-red-400 transition duration-150" onClick={handleCancel}>Cancel</button>
                </div>
                {/* <div className="h-[3vh]"></div> */}
            </form>      
        </div>
    )
}

export default ReviewForm

ReviewForm.propTypes = {
    handleReview: PropTypes.func.isRequired, // Validate that getMessage is a function and is required
    handleCancel: PropTypes.func.isRequired,
    uni_id: PropTypes.number.isRequired,
    org_id: PropTypes.number.isRequired
};