import React from 'react';

const Navbtn = props => {
    return (
        <div className="nav-item text-light">
            <a {...props} className="nav-link underline">{props.name}</a>
        </div>
    )
}

export default Navbtn;