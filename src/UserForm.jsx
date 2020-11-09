import React from 'react'

function UserForm(props){
    return(
        <form onSubmit={props.submitForm}>
            <label>First Name:</label> <input type="text" name="firstName"/> <br />
            <label>Last Name:</label> <input type="text" name="lastName"/> <br />
            <label>Location:</label> <input type="text" name="userLocation"/><br />
            <label>Years as a User:</label> <input type="number" name="yearsAsAUser"/><br />
            <input type='submit' value="Add User"/>
        </form>
    )
}

export default UserForm