const socket = io();

const connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count;
});

const statusMessage = document.getElementById('status-message');

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message;
});

const buttons = document.querySelectorAll('#choices button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText);
  });
}

const countA = document.getElementById('A');
const countB = document.getElementById('B');
const countC = document.getElementById('C');
const countD = document.getElementById('D');

socket.on('voteCount', (votes) => {
  countA.innerText = 'Votes: A: ' + votes.A;
  countB.innerText = 'Votes: B: ' + votes.B;
  countC.innerText = 'Votes: C: ' + votes.C;
  countD.innerText = 'Votes: D: ' + votes.D;
});

const userVote = document.getElementById('user-vote');

socket.on('userVote', (theVote) => {
  userVote.innerText = 'Your vote: ' + theVote;
});
