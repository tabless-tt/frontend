import React from 'react';
// props title, website, catagory
function Tab(props) {
    console.log(props);
    return (
        <div className="tab-container">
            <div className="tab">
                <h3>{props.tab.title}</h3>
                <p>{props.tab.website}</p>
            </div>
        </div>
    )
}

export default Tab;