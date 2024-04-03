import {  useState } from "react"
// import axios from 'axios';
import SearchBar from "./components/Searchbar";
import OrgList from "./components/OrgList";
import Filters from "./components/Filters";
// import Launch from "./components/Launch";
import CurrentOrg from "./components/CurrentOrg";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Portal() {

  let navigate = useNavigate()

  const [ initialQuery ] = useSearchParams()

  // console.log(query)

  // const [users, setUsers] = useState([])
  const search = initialQuery.get("query")
  const [org, setOrg] = useState()
  
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

  const [filterdata, setFilterData] = useState({
    categories: categorylist,
    threshold: "all"
  })

  const handleFilters = (data) => {
    setFilterData(data)
  }

  const handleCurrentOrg = (org) => {
    setOrg(org)
    // console.log(org)
  }

  return (
    <>
      {search && 
      <>
        <SearchBar value={search}/>
        <div className="flex flex-row mt-4 sm:mt-6 md:mt-10 gap-8 justify-center">
          <Filters handleFilters={handleFilters}/>
          <OrgList title={search} filters={filterdata} handleCurrentOrg={handleCurrentOrg}/>
          {org && <CurrentOrg {...org}/>}
        </div>
      </>}
    </>
    
  )
}