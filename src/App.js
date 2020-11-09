import './App.css'
import React from 'react'
import UserDisplay from './UserDisplay'
import FilterControls from './FilterControls'
import UserForm from  './UserForm'


const userAPI = 'http://localhost:3001/users'
const addUserAPI = 'http://localhost:3001/addUser'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      locations: [],
      allUsers: [],
      addingUser: false,
      addUserResponse: '',
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  async getData(){
    const response = await fetch(userAPI)

    const json = await response.json()
    let locations = [];
    await json.forEach(element => {
      if (!locations.includes(element.location)) {
        locations.push(element.location);
      }
    });
    this.setState({allUsers: json, users: json, locations: locations.sort()})
  }
  
  locationChange = (e) => {
    let location = e.target.value
    if(location === "Display All"){
      this.setState({users: this.state.allUsers})
    }
    else{
      let filteredUsers = this.state.allUsers.filter((user)=>user.location === location)
      this.setState({users: filteredUsers})
    }
  }

  addUser = () => {
    this.setState({addingUser: true,
                    addUserResponse: ''})
    
  }

  submitAddUser = (e) => {
     e.preventDefault();
    let [firstName, lastName, location, yearsAsAUser] = Array.from(e.target.elements).slice(0,4).map(element => element.value);
  
    let newUserID = this.state.allUsers[this.state.allUsers.length - 1].userID + 1;

    // https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          location: location,
          yearsAsAUser: yearsAsAUser,
          userID: newUserID,
        })
    };
    fetch(addUserAPI, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({addUserResponse: data, addingUser: false}))
        .then(() => this.getData())
  }

  render(){
    return (
      <div className="App-header">
        {this.state.addingUser ? 
          <UserForm submitForm={this.submitAddUser}/> :
          <div>
            <button onClick={this.addUser}>Add a New User</button>
            <span>{this.state.addUserResponse.message}</span>
            <FilterControls locations={this.state.locations} onLocationChange={this.locationChange}/>
            <UserDisplay userList={this.state.users}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
