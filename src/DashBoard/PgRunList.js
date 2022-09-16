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
  const navigate = useNavigate()
 
  

     /* const [pgRunData, setPgRunData] = useState([])
    useEffect(() => {
        
            const url = `http://localhost:5000/pgRunAllList?email=${user.email}`
            console.log(url)
            fetch(url)
                .then(res => res.json())
            .then(data=> setPgRunData(data))

    }, [user])  */
 
      const { data:pgRunData, isLoading,refetch } = useQuery(
      ["list", user],
      () =>
        fetch(`http://localhost:5000/pgRunAllList?email=${user.email}`, {
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

  //let arr=[]
   const fuelConsume= pgRunData.map(( d,index) => {
      let start = d.pgStartTime?.split(":");
      let stop = d.pgStoptTime?.split(":");
      let startTime = new Date(0, 0, 0, start[0], start[1], 0);
      let stopTime = new Date(0, 0, 0, stop[0], stop[1], 0);
      let diff = stopTime.getTime() - startTime.getTime();
      // console.log(diff)
      const hours = Math.floor(diff / 3600000);
      //console.log(hours);
      diff = diff - hours * 1000 * 3600;
      const minutes = Math.floor(diff / 60000);
      //console.log(minutes);
      const duration = `${hours}:${minutes}`;
      const time = duration.split(":");
      const timeValue = parseInt(time[0], 10) + parseInt(time[1], 10) / 60;
      const consume = (timeValue * 3).toFixed(2);
     //arr[index] = consume
     return consume
     //arr.push(consume)
    // return [duration]
  
   })
 
    const totalConsume =fuelConsume.reduce(
     (previous, current) => previous +parseFloat(current),0); 

  
 //console.log(sum)
    return (
      <div>
        <div className="text-center text-primary text-2xl mt-4 mb-8">
          <h2>Your PG Run Record: {totalConsume.toFixed(2)}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full border-2 border-cyan-200">
            <thead>
              <tr>
                <th>SN</th>

                <th>Date</th>
                <th>Site ID</th>
                <th>PG No</th>
                <th>
                  <div>PG Start</div>
                  <div>Time</div>
                </th>
                <th>
                  <div>PG Stop</div>
                  <div>Time</div>
                </th>
                <th>Duration</th>
                <th>Consumption</th>
                <th>
                  {" "}
                  <div>Approval</div>
                  <div>Responsible</div>
                </th>
                <th>PG Runner</th>
                <th>
                  <div>Approval</div>
                  <div>Status</div>
                </th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {pgRunData.map((pgRun,index) => (
                <PgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                  refetch={refetch}
                  //fuelConsume={fuelConsume}
                ></PgRunRows>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PgRunList;