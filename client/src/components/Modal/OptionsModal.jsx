import React from "react";
import ReactModal from "react-modal";

const SignIn = props => {

    return (
        <ReactModal
            isOpen={props.showModal}
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
            onRequestClose={() => { props.handleCloseModal() }}
        >
            <div className="modal-content optionBox">
                <div className="modal-body">
                    <form className="options" onSubmit={props.handleSignIn}>
                        <div className="modal-header">
                            <strong>Options</strong>
                        </div>
                        <div className="modal-body">
                            {/* props.menuparameters.map */}
                            <div className="row">
                                <div className="col-10 text-right">
                                    <div className="optionsList">
                                        <label>
                                            {/* return (<li className='child'> */}
                                            Option{/* id=param.name value=param.name */}

                                            {/* </li> */}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <input type="checkbox" disabled />
                                </div>
                            </div>
                            {/* end map */}
                            <div className="row">
                                <div className="col-10 form-group text-right">
                                    <div className="clientView">
                                        <label>
                                            Client View
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2 form-group">
                                    {props.view === "admin" ? <input type="checkbox" id="viewCheck" onClick={props.checkBoxModal} />
                                        :
                                        <input type="checkbox" id="viewCheck" checked onClick={props.checkBoxModal} />
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 text-right">
                                    {/* <a id="site" href="#">App</a> */}
                                </div>
                                <div className="col-2 form-group"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    );
};

export default SignIn;