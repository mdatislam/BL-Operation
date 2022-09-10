import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../Pages/SharedPage/Loading';
import { useEffect } from 'react';
import PgRunRows from './PgRunRows';
import PgRunUpdate from './PgRunUpdate';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const PgRunList = () => {
    const [user] = useAuthState(auth)
    const navigate= useNavigate()
    /* const [pgRunData, setPgRunData] = useState([])
    useEffect(() => {
        
            const url = `http://localhost:5000/pgRunList?email=${user.email}`
            console.log(url)
            fetch(url)
                .then(res => res.json())
            .then(data=> setPgRunData(data))

    }, [user])
 */
    const { data:pgRunData, isLoading } = useQuery(
      ["list", user],
      () =>
        fetch(`http://localhost:5000/pgRunList?email=${user.email}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/Home");
          }
          return res.json();
        })
    );

    if (isLoading) {
      return <Loading />;
    }
   
    
    return (
      <div>
        <div className="text-center text-primary text-2xl">
          <h2>Your PG Run Record</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>SN</th>
                <th>Date</th>
                <th>Site ID</th>
                <th>PG No</th>
                <th>PG Start Time</th>
                <th>PG Stop Time</th>
                <th>
                  {" "}
                  <div>Approval</div>
                  <div>Responsible</div>
                </th>
                <th>PG Runner</th>
              </tr>
            </thead>
            <tbody>
              
             {
                            pgRunData.map((pgRun, index) => <PgRunRows
                                key={pgRun._id}
                                pgRun={pgRun}
                                index={index}
                                pgRunner={user.displayName}
                            ></PgRunRows>)
              }   
                       
                        
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PgRunList;