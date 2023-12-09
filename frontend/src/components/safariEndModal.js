import './modal.css'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function EndModal ({score}){
    const handleClick = () => {
        document.getElementById("exampleModalCenter").style.display= "none";
    }

    let modalbody = ""
    let modaltitle = ""
    modalbody = "Congratulations! Your Safari Score is " + score + "!"
    modaltitle = "Good job!"
    return(
        <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" id='modal-content'>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{modaltitle}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {modalbody}
                </div>
                <div className="modal-footer">
                    <button type="button" id="closebutton" className="btn btn-primary" data-dismiss="modal" onClick={handleClick}>Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}