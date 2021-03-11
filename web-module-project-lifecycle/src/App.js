import logo from './def_prof_pic.jpg';
import './App.css';
import React from "react";
import axios from 'axios';
class App extends React.Component {

  state={
    username: '',
    followers: '',
    pic: '',
  }

  componentDidMount(){
    // axios
    //   .get('https://api.github.com/users/natepace')
    //   .then(res => {
    //     this.setState({
    //      username:  res.data.login,
    //      followers: res.data.followers,
    //      pic: res.data.avatar_url,
    //     })
    //   })
    this.setState({
      username: 'Coder McGee',
      title: 'Coder McGee',
      followers: 0,
      pic: `${logo}`,
      bio: 'loves code and hates angular',
      following: 0,
      repos: 0,
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then(res => {
        console.log(res.data.public_repos)
        this.setState({
          username: res.data.login,
          followers: res.data.followers,
          pic: res.data.avatar_url,
          title: res.data.name,
          bio: res.data.bio,
          following: res.data.following,
          repos: res.data.public_repos,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChanges = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  render (){
  return (
    <div className="App">
        <h1>Find a Github User</h1>
        <p>Type a github username below!</p>
        <form onSubmit ={this.handleSubmit}>
          <input placeholder="ex: 'natepace'"
          onChange={this.handleChanges}
          value={this.state.login}

          />
          <button>get git!</button>
        </form>
        <div className="usercard">
            <h1>{this.state.title}</h1>
            
            <img 
              src={this.state.pic}
            />
            <p>{this.state.title}'s bio: {this.state.bio} </p>
            <p>No. of followers: {this.state.followers}</p>
            <p>No. of following: {this.state.following}</p>
            <p>No. of public repos: {this.state.repos} </p>
        </div>
    </div>
  );
}
}

export default App;
