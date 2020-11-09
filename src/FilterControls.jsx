import React from 'react'

function FilterControls(props){
    return(
        <div>
            <label>Location Filter: </label>
            <select onChange={props.onLocationChange}>
                <option key="All" name='All'>Display All</option>
                {props.locations.map((location)=><option key={location} name={location}>{location}</option>)}
            </select>
        </div>
    )
}

export default FilterControls