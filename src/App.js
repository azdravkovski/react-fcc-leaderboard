import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      category: 'alltime',
      campers: [],
      asc: true
    };
  }

  getCampers(str) {
    fetch(`https://fcctop100.herokuapp.com/api/fccusers/top/${str}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          category: str,
          campers: data,
          asc: true
        });
        // console.log(this.state);
      })
      .catch(error => console.log(`There was an error: ${error}`))
  }

  handleSort(str) {
    if (this.state.category === str) {
      this.setState({
        campers: this.state.campers.reverse(),
        asc: this.state.asc ? false : true 
      });
    } else {
      this.getCampers(str);
    }
  }

  toggleCaret(str) {
    if (this.state.category === str) {
      if (this.state.asc) {
        return <i className='fa fa-caret-down'></i>
      } else {
        return <i className='fa fa-caret-up'></i>
      }
    }
  }

  componentDidMount() {
    this.getCampers('alltime');
  }

  render() {
    const users = this.state.campers;
    const userList = users.map((user, index) => 
     <tr key={user.username}>
      <td>{index + 1}</td>
      <td><a href={`https://freecodecamp.org/${user.username}`}><img src={user.img} />{user.username}</a></td>
      <td>{user.recent}</td>
      <td>{user.alltime}</td>
     </tr> 
    );

    return (
      <div className='container'>
        <h1 className='text-center'><a href='https://freecodecamp.org'>FCC</a> Camper Leaderboard</h1>
        <p className='text-center'>Made with 💪 by <a href='https://www.github.com/azdravkovski'>Aleksandar Zdravkovski</a></p>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>#</th>
              <th>Camper</th>
              <th onClick={this.handleSort.bind(this, 'recent')}>Last 30 Days {this.toggleCaret('recent')}</th>
              <th onClick={this.handleSort.bind(this, 'alltime')}>All Time {this.toggleCaret('alltime')}</th>
            </tr>
          </thead>
          <tbody>
            {userList}
          </tbody>
        </table>
      </div>
    );
  }
}