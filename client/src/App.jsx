import {  useState } from "react"
// import axios from 'axios';
import SearchBar from "./components/Searchbar";
import OrgList from "./components/OrgList";
import Filters from "./components/Filters";
import Launch from "./components/Launch";
import CurrentOrg from "./components/CurrentOrg";

export default function App() {

  // const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
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

  const handleSearch = (query) => {
    setSearch(query)
  }

  const handleFilters = (data) => {
    setFilterData(data)
  }

  const handleCurrentOrg = (org) => {
    setOrg(org)
    // console.log(org)
  }

  return (
    <>
      {!search &&
      <Launch handleSearch={handleSearch}/>
      }
      {search && 
      <>
        <SearchBar handleSearch={handleSearch} value={search}/>
        <div className="flex flex-row mt-10 gap-8 justify-center">
          <Filters handleFilters={handleFilters}/>
          <OrgList title={search} filters={filterdata} handleCurrentOrg={handleCurrentOrg}/>
          {org && <CurrentOrg {...org}/>}
        </div>
      </>}
    </>
    
  )
}