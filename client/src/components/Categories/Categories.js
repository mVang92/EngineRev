import React from "react";

const Categories = () => {
    return (
        <div id="categories" className="row removeMobileDisplay">
            <div className="col-md-2 logDetailsMobileDisplay">
                <label><strong>Date</strong></label>
            </div>
            <div className="col-md-2 logDetailsMobileDisplay">
                <label><strong>Mileage</strong></label>
            </div>
            <div className="col-md-3 logDetailsMobileDisplay">
                <label><strong>Service</strong></label>
            </div>
            <div className="col-md-3 logDetailsMobileDisplay">
                <label><strong>Comments</strong></label>
            </div>
            <div className="col-md-2 logDetailsMobileDisplay hideWhilePrinting">
                <label><strong>Actions</strong></label>
            </div>
        </div>
    )
}

export default Categories;
