import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import ViewIssues from './siteIssues/ViewIssues';
import OnCallPlanSite from './DgServiceIssue/OnCallPlanSite';

const OnCallHomePage = () => {

    return (
        <div className='card bg-slate-400 px-2 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-2 w-full' >
                <div className='py-4'>
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className='card-actions justify-end'>
                                <Link to="/OnCall/AddIssues" className=" btn btn-outline btn-secondary">
                                    <PlusCircleIcon className='w-6 h-6 ' />
                                  &nbsp; Add Issue
                                </Link>
                            </div> 
                            <div className="divider mt-[-5px]"></div>
                            <ViewIssues/>
                        </div>
                    </div>
                    {/* 2nd side  part  */}
                </div>
                <div className='py-4'>
                    <div className="card w-full bg-base-100 shadow-xl ">
                        <div className="card-body">
                            <OnCallPlanSite/>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OnCallHomePage;