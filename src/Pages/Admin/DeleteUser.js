import React from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const DeleteUser = ({ delUser, setDelUser }) => {
    const [axiosSecure]=useAxiosSecure()

    const { email } = delUser
    //console.log(email)
    const handleDelete=email=>{
       if(email){
        axiosSecure.delete(`/user/delete/${email}`)
        .then(deleteRes=>{
            console.log(deleteRes.data)
            if(deleteRes.data.deletedCount>0){
                Swal.fire({
                    title: `${delUser.name} delete successfully `,
                    width: 500,
                    padding: '1em',
                    color: '#FFCB24',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `
                    rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
                  })
                
            }
        })
       }
           }

    
    return (
        <div className="">
            <input type="checkbox" id="userDelete" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                <label htmlFor="userDelete" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-red-500 text-lg">Warning!</h3>
                    <p className="py-4">Are you confirm to Delete it!</p>
                    <div className="modal-action ">
                        <label htmlFor="userDelete" onClick={()=>handleDelete(email)}
                        className="btn btn-accent ">Confirm !</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;