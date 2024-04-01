import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import axios from 'axios';
import ReviewForm from "./ReviewForm";
import RatingList from "./RatingList";

import AverageHero from "./AverageHero";
import CallToAction from "./CallToAction";

function Discussion() {

    const [ searchParams ] = useSearchParams()
    // console.log(searchParams)
    const uni_id = searchParams.get("uni_id")
    const org_id = searchParams.get("org_id")

    const [org, setOrg] = useState([])
    const [ratings, setRatings] = useState([])
    const [showReview, setShowReview] = useState(false)

    let navigate = useNavigate()

    const fetchOrg = async (uni_id, org_id) => {
        const response = await axios.get(`https://orgradar-backend.onrender.com/api/getorg/${uni_id}/${org_id}`)
        setOrg(response.data.data[0])
    }

    const goToReview = () => {
        setShowReview(true)
    }

    const leaveReview = () => {
        setShowReview(false)
    }

    const successfulReview = () => {
        setShowReview(false)
        window.location.reload()
    }

    const handleGoBack = () => {
        return navigate(`/search?query=${org.title}`)
    }


    const fetchRatings = async (uid, oid) => {
        const response = await axios.get(`https://orgradar-backend.onrender.com/api/getratings/${uid}/${oid}`)
        console.log(uid, oid)
        setRatings(response.data.data)
    }

    useEffect(() => {
        fetchRatings(uni_id, org_id)
        fetchOrg(uni_id, org_id)
    }, [uni_id, org_id])


    return (
        <div className="">
            {org.title && <SearchBar value={org.title}/>}
            <div className="mt-10">
                <div className="pl-40 mb-4 w-full">
                    <h1 className="font-bold text-4xl mb-6">{org.title}</h1>

                    <AverageHero ratings={ratings} />

                    <button className="bg-gray-200 p-2 w-32 border-[1px] border-gray-400 hover:bg-gray-300 transition duration-150" onClick={goToReview}>Write a Review</button>
                    <button className="ml-10 bg-gray-200 p-2 w-32 border-[1px] border-gray-400 hover:bg-gray-300 transition duration-150" onClick={handleGoBack}>Go Back</button>
                    <h2 className="mt-4 text-xl font-bold">{ratings.length} {ratings.length != 1 ? "Reviews" : "Review"}</h2>
                </div>
            </div>
            {ratings.length != 0 ? 
            <div className="flex justify-center h-[95vh] overflow-scroll scrollbar-none">
                <RatingList ratings={ratings}/>
            </div> :
             <div className="flex justify-center overflow-scroll scrollbar-none">
                <CallToAction onClick={goToReview}/>
            </div> 
            }
            {showReview && <>
                <div className="fixed top-0 left-0 w-full bg-black opacity-35 h-full"></div>
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    <ReviewForm handleReview={successfulReview} handleCancel={leaveReview} uni_id={org.uni_id} org_id={org.org_id}/>
                </div>
            </>}
            
        </div>
    )
}

export default Discussion

// AverageHero.propTypes = {
//     ratings: PropTypes.array.isRequired
// }