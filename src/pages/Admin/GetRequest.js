import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import RequestTable from '../../components/RequestTable/RequestTable';

function GetRequest({reqPopup}){

    const [allReq, setAllReq] = useState([{
        issue_id: 0,
        isbn: "",
        reader_id: 0,
        issue_approver_id: 0,
        issue_status: "",
        issue_date: "",
        expected_return_date: ""
    }]);

    async function handleRequest(){

        await axios.get("http://localhost:8080/admin/all-requests").then((response) => {
            setAllReq(response.data.data)
        });

    };

    useEffect(() => {
        handleRequest();
    },[]);

    // console.log("requests fetched",allReq);

    return (
        <div className='GetRequest'>
                <RequestTable allReq={allReq} reqPopup={reqPopup}/>      
        </div>
    )
}

export default GetRequest;