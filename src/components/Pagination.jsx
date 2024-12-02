import { useEffect, useState } from "react";
import './Pagination.css'

const Pagination = () => {
    const [itemsData, setItemsData] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)


    const itemsPerPagination = Math.ceil(itemsData.length/itemsPerPage)

    const paginationArr = [...Array(itemsPerPagination + 1).keys()].slice(1)

    const indexOfLastPageItem = currentPage * itemsPerPage
    const indexOfFirstPageItem = indexOfLastPageItem - itemsPerPage

    const visibleData = itemsData.slice(indexOfFirstPageItem, indexOfLastPageItem)
    

    const handlePrevious = () => {
        if (currentPage !== 1){
            setCurrentPage(currentPage -1)
        }
    }

    const handleNext = () => {
        if (currentPage !== itemsPerPagination){
            setCurrentPage(currentPage +1)
        }
    }

    const fetchItemsData = async() => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json()
            setItemsData(data)
        }
        catch(error){
            console.log('error message is' + error)
        }
    }

    useEffect(()=>{
        fetchItemsData()
    }, [])
    return (
        <>
        <div>
            Pagination
        </div>
        <select id='choices' value={itemsPerPage} onChange={(e)=> setItemsPerPage(e.target.value)}>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='25'>25</option>
        </select>
        <div style={{padding: '40px'}}>
            {visibleData?.map((item)=> <p key={item?.id}>{item.title}</p>)}
        </div>
        
        <div>
            <button onClick={handlePrevious}>Prev</button>
            {paginationArr?.map((page)=> <button key={page} style={{margin: '10px'}} className={currentPage === page? 'active': ''} onClick={()=> setCurrentPage(page)}>{page}</button>)}
            <button onClick={handleNext}>Next</button>
        </div>
        </>
    )
}

export default Pagination