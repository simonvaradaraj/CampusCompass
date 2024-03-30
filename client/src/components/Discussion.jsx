import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./Searchbar";
import axios from 'axios';



function Discussion() {

    const [ searchParams ] = useSearchParams()
    // console.log(searchParams)
    const uni_id = searchParams.get("uni_id")
    const org_id = searchParams.get("org_id")

    const [org, setOrg] = useState([])

    const fetchOrg = async (uni_id, org_id) => {
        const response = await axios.get(`http://127.0.0.1:8080/api/getorg/${uni_id}/${org_id}`)
        setOrg(response.data.data[0])
    }

    useEffect(() => {
        fetchOrg(uni_id, org_id)
    }, [uni_id, org_id])

    return (
        <>
            {org.title && <SearchBar value={org.title}/>}
            <div className="mt-10">
                <div className="pl-40 mb-4 w-full">
                    <h1 className="font-bold text-4xl mb-2 pb-4">{org.title}</h1>
                </div>
            </div>
            <div className="flex justify-center">
                <div>
                    
                </div>
            </div>
        </>
    )
}

export default Discussion