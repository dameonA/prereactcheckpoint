import React from 'react'

function UserDisplay(props){
    let userList = props.userList.map(each => (
      <tr key={`${each.userID}`}>
        <td>
          {each.firstName}
        </td>
        <td>
          {each.lastName}
        </td>
        <td>
          {each.location}
        </td>
        </tr>
    ))
    return(
      <table key="userList Table">
        <thead style={{fontWeight: "bold"}}>
          <tr key="userList Header">
            <td>
              First Name
            </td>
            <td>
              Last Name
            </td>
            <td>
              Location
            </td>
          </tr>
        </thead>
        <tbody>
          {userList}
        </tbody>
      </table>
    )
}

export default UserDisplay