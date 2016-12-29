/* globals describe, it */

const request = require('supertest');
const assert = require('chai').assert;
const app = require('../server');
const io = require('socket.io-client');
const socketURL = 'http://localhost:3000';
const _ = require('lodash');

describe('GET /', () => {
  it('responds with success', (done) =>{
    request(app)
      .get('/')
      .expect(200, done);
  });
});

let options = {
  transports: ['websocket'],
  'force new connection': true
};

describe("All user connections", () => {

  let user1 = io.connect(socketURL, options);
  let user2 = io.connect(socketURL, options);

  it('should count 1 if one user has connected', () => {

    user1.on('connection', () => {
      user1.emit('A user has connected', io.engine.clientsCount);
      io.engine.clientsCount.should.equal(1);
    });
  });

  it('should count 2 if two users are connected', () => {

    user2.on('connection', () => {
      user2.emit('A user has connected', io.engine.clientsCount);
      io.engine.clientsCount.should.equal(2);
    });
  });

  it('should count 1 after one user has disconnected', () => {

    user2.on('disconnect', (done) => {
      io.engine.clientsCount.should.equal(1);
      done();
    });
  });

  it('should count 0 when all users have disconnected', () => {

    user1.on('disconnect', (done) => {
      io.engine.clientsCount.should.equal(0);
      done();
    });
  });
});

describe("Message when user connected", () => {

  it('should display a message to the user when they connect', () => {
    let user1 = io.connect(socketURL, options);
    let message = "You're connected!";

    let connectMessage = (client, done) => {
      user1.on('statusMessage', (msg) => {
        message.should.equal(msg);
        user1.disconnect();
        done();
      });
    };

    user1.on('connection', () => {
      connectMessage(user1);
    });
  });
});

describe("Count number of users connected", () => {

  let user1 = io.connect(socketURL, options);
  let user2 = io.connect(socketURL, options);

  let userMessage = (count, client, done) => {
    let message = 'Connected Users: ' + count;
    client.on('usersConnected', (msg) => {
      message.should.equal(msg);
      client.disconnect();
      done();
    });
  };

  it('should display "Connected Users: 1"  when 1 user connected', () => {
    user1.on('connection', () => {
      userMessage(1, user1);
    });
  });

  it('should display "Connected Users: 2"  when 2 users connected', () => {
    user2.on('connection', () => {
      userMessage(2, user1);
      userMessage(2, user2);
    });
  });

  it('should display "Connected Users: 1" if 1 user has disconnected', () => {

    user1.on('connection', () => {
      userMessage(1, user1);
    });

    user2.on('connection', () => {
      userMessage(2, user2);
    });

    user2.on('disconnect', () => {
      userMessage(1, user1);
    });
  });
});

describe('User votes', () => {

  let user1 = io.connect(socketURL, options);

  let voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };

  let userMessage = (theVote, done) => {
    let message = 'Your vote: ' + theVote;
    user1.on('userVote', (msg) => {
      message.should.equal(msg);
      user1.disconnect();
      done();
    });
  };

  it('should display "Your vote: A" if user has selected "A"', () => {

    user1.on('connection', () => {
      let userVote =  _.filter(voteCount, 'A');
      assert.property(userMessage(userVote), 'A');
    });
  });

  it('should display "Your vote: B" if user has selected "B"', () => {

    user1.on('connection', () => {
      let userVote =  _.filter(voteCount, 'B');
      assert.property(userMessage(userVote), 'B');
    });
  });

  it('should display "Your vote: C" if user has selected "C"', () => {

    user1.on('connection', () => {
      let userVote =  _.filter(voteCount, 'C');
      assert.property(userMessage(userVote), 'C');
    });
  });

  it('should display "Your vote: D" if user has selected "D"', () => {

    user1.on('connection', () => {
      let userVote =  _.filter(voteCount, 'D');
      assert.property(userMessage(userVote), 'D');
    });
  });
});
