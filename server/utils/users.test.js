const expect = require('expect');
const expects = require('chai').expect;

const {Users} = require('./users');

describe ('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Monica',
      room: 'Yoga'
    }, {
      id: '2',
      name: 'Joey',
      room: 'Zumba'
    }, {
      id: '3',
      name: 'Simon',
      room: 'Yoga'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '122',
      name: 'Andrew',
      room: 'Office'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove user with given id', () => {
    var userRemoved = users.removeUser('3');
    expect(userRemoved).toEqual({
      id: '3',
      name: 'Simon',
      room: 'Yoga'
    });
    // expects(users.users).to.not.include(userRemoved);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userRemove = users.removeUser('67');
    expects(userRemove).to.not.exist;
    expect(users.users.length).toBe(3);
    //expects(users.users).to.not.include(userRemoved);
  });

  it('should find user by id', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user).toEqual(users.users[1]);
  })

  it('should not find user', () => {
    var user = users.getUser('76');

    expects(user).to.not.exist;
  })

  it ('should return names for yoga', () => {
    var userList = users.getUserList('Yoga');

    expect(userList).toEqual(['Monica', 'Simon']);
  });

  it ('should return names for zumba', () => {
    var userList = users.getUserList('Zumba');

    expect(userList).toEqual(['Joey']);
  });

  it('should return name if present', () => {
    var user = users.getUserName('Joey');

    expect(user.name).toEqual('Joey');
  });

  it('should not return name if not present', () => {
    var user = users.getUserName('Jill');

    expects(user).to.not.exist;
  });
  it('should return room list', () => {
    var rooms = users.getRoomList();

    expect(rooms.length).toBe(2);
    expects(rooms).to.include('Yoga', 'Zumba');
  })
})
