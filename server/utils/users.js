[{
  id: '',
  name: '',
  room: ''
}]

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.users.filter((user) => user.id === id)[0];
    if(!user) {
      return user;
    }
    //this.users = this.users.filter((user) => user.id !== id);  //in course
    var index = this.users.indexOf(user);
    var removedUser = this.users.splice(index, 1);
    console.log(removedUser[0]);
    return removedUser[0];
  }
  getUser (id) {
    var user = this.users.filter((user) => user.id === id);
    return user[0];
    }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
  getUserName (name) {
    var user = this.users.filter((user) => user.name === name);
    return user[0];
    }
  getRoomList () {
    var rooms = [...new Set(this.users.map(user => user.room ))];
    console.log(rooms);
    return rooms;
  }
}

module.exports = {Users};
//creating ES6 class
// class Person{
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age}`;
//   }
// }
// var me = new Person('Abc', 20);
// var description = me.getUserDescription();
// console.log(description);
