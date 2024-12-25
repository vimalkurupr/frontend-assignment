import { useEffect, useState } from 'react';
import './Table.css';

const RECORDS_PER_PAGE = 5;

const Table = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);

    const totalPages = Math.ceil(data.length / RECORDS_PER_PAGE);
    const handleInputChange = (e) => {
        const pageNumber = Number(e.target.value)
        if(pageNumber > 0 && pageNumber <= totalPages){
            setCurrentPage(pageNumber);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json")
        .then(response => response.json())
        .then(data => {
            setData(data);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsError(true);
            setIsLoading(false);
            console.log('Error while fetching data: ', error)
        })
    }, []);

    const currentRecords = data.slice(
        (currentPage - 1) * RECORDS_PER_PAGE,
        currentPage * RECORDS_PER_PAGE
    );

    if(isLoading) {
        return <div className="statusMessage">Loading...</div>
    }
    if(isError) {
        return <div className="statusMessage">Error while fetching records</div>
    }
    return(
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage funded</th>
                        <th>Amount pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((project) => (
                        <tr key={project["s.no"]}>
                            <td>{project["s.no"]}</td>
                            <td>{project["percentage.funded"]}</td>
                            <td>{project["amt.pledged"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="footer">
                <button
                  id="previous-button"
                  onClick={()=>handlePageChange(currentPage-1)}
                  disabled={currentPage === 1}
                >
                    Previous
                </button>
                Page
                <input
                  id="input-field"
                  className="inputField"
                  type="number"
                  value={currentPage}
                  onChange={handleInputChange}
                  min="1"
                  max={totalPages}
                />
                of {totalPages}
                <button
                  id="next-button"
                  onClick={()=>handlePageChange(currentPage+1)}
                  disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Table;