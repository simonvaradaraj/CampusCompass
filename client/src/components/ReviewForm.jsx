// use axios to make a post request on form submission
import axios from 'axios'
import PropTypes from 'prop-types';

function ReviewForm({handleReview, uni_id, org_id}) {

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
            const response = await axios.post('http://127.0.0.1:8080/api/createrating', data);
            console.log(response.data);
            handleReview()
            // Handle success
        } catch (error) {
            console.error(error);
            // Handle error
        }
    }

    const handleCancel = () => {
        handleReview()
    }

    return (
        <div className="bg-white w-[50%] h-[65vh] border-[1px] border-gray-400 p-2 overflow-y-scroll scrollbar-none">
            {/* create a form that has inputs role (dropdown), review (textarea), grouped together (social (1-5), events (1-5), happiness (1-5), officers (1-5)), insight question (dropdown), question answer (textarea)*/}
            <form className="flex flex-col items-center justify-center h-full pb-4" onSubmit={handleSubmit}>
                <h1 className="font-bold text-2xl mt-2 mb-4">Write a Review</h1>
                <div className="w-[80%]">
                    <label htmlFor="role" className="block font-bold">Role</label>
                    <select name="role" id="role" className="w-full p-2 border-[1px] border-gray-400">
                        <option value="nonmember">Non-Member</option>
                        <option value="member">Member</option>
                        <option value="officer">Officer</option>
                        <option value="alumni">Alumni</option>
                    </select>
                </div>
                <div className="w-[80%] mt-4">
                    <label htmlFor="review" className="block font-bold">Review</label>
                    <textarea name="review" id="review" placeholder='Let your thoughts out...' className="w-full p-2 border-[1px] border-gray-400"></textarea>
                </div>
                <div className="w-[80%] mt-4 flex flex-row gap-4">
                    <div className="w-[80%]">
                        <label htmlFor="social" className="block font-bold">Social</label>
                        <input type="number" min='1' max='5' placeholder='1' name="social" id="social" className="w-full p-2 border-[1px] border-gray-400"/>
                    </div>
                    <div className="w-[80%]">
                        <label htmlFor="events" className="block font-bold">Events</label>
                        <input type="number" min='1' max='5' placeholder='1' name="events" id="events" className="w-full p-2 border-[1px] border-gray-400"/>
                    </div>
                    <div className="w-[80%]">
                        <label htmlFor="happiness" className="block font-bold">Happiness</label>
                        <input type="number" min='1' max='5' placeholder='1' name="happiness" id="happiness" className="w-full p-2 border-[1px] border-gray-400"/>
                    </div>
                    <div className="w-[80%]">
                        <label htmlFor="officers" className="block font-bold">Officers</label>
                        <input type="number" min='1' max='5' placeholder='1' name="officers" id="officers" className="w-full p-2 border-[1px] border-gray-400"/>
                </div>
                </div>
                <div className="w-[80%] mt-4">
                    <label htmlFor="insight" className="block font-bold">Insight Question</label>
                    <select name="insight" id="insight" className="w-full p-2 border-[1px] border-gray-400">
                        <option value="1">How did this organization help you grow?</option>
                        <option value="2">What was the most memorable event?</option>
                        <option value="3">What was the most challenging part?</option>
                        <option value="4">What&apos;s something you wish you knew when first joining?</option>
                        <option value="4">Any tips for the interview process?</option>
                    </select>
                </div>
                <div className="w-[80%] mt-4">
                    <label htmlFor="answer" className="block font-bold">Answer</label>
                    <textarea name="answer" placeholder='This will help other students...' id="answer" className="w-full p-2 border-[1px] border-gray-400"></textarea>
                </div>
                <div className="flex flex-row gap-10">
                    <button className="bg-blue-500 text-white p-2 pl-3 pr-3 mt-4 hover:bg-blue-400 transition duration-150">Submit</button>
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
    uni_id: PropTypes.number.isRequired,
    org_id: PropTypes.number.isRequired
};