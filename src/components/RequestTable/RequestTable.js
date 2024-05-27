import React from 'react'
import './RequestTable.css'

function RequestTable({allReq , reqPopup}){

    // console.log("Data is",allReq)
    // const [requests,setRequests] = useState([]);
    return (
        <div className='RequestTable'>
            <div className='RequestTablePopup'>
                <table className='table-style'>
                    <button className='close-btn' >
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px" , width:"20px"}} alt='cancel-icon'/>  
                    </button>
                    {/* <thead>
                        <tr>
                            <th>Issue ID</th>
                            <th>ISBN</th>
                            <th>Reader ID</th>
                            <th>Issue Approver ID</th>
                            <th>Issue Status</th>
                            <th>Issue Date</th>
                            <th>Expected Return Date</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        <tr>
                            <th>Issue ID</th>
                            <th>ISBN</th>
                            <th>Reader ID</th>
                            <th>Issue Approver ID</th>
                            <th>Issue Status</th>
                            <th>Issue Date</th>
                            <th>Expected Return Date</th>
                        </tr>
                        {
                            // console.log("Data is",allReq)
                            allReq.map((data) => {
                                return (
                                    <tr>
                                        <td>{data.issue_id}</td>
                                        <td>{data.isbn}</td>
                                        <td>{data.reader_id}</td>
                                        <td>{data.issue_approver_id}</td>
                                        <td>{data.issue_status}</td>
                                        <td>{data.issue_date}</td>
                                        <td>{data.expected_return_date}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RequestTable