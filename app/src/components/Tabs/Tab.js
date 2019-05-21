import React from 'react';

// props title, website, category


function Tab(props) {
    //console.log(props);
    return (
        <div className="tab-container">
            <div className="tab">
                <img src={props.tab.favicon} alt='something'/>
                <h3>{props.tab.title}</h3>
                <p>{props.tab.website}</p>
                <button>Edit</button>
            </div>
        </div>
    )
}

export default Tab;