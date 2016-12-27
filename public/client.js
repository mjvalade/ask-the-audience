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

const countVotesA = document.getElementById('A');
const countVotesB = document.getElementById('B');
const countVotesC = document.getElementById('C');
const countVotesD = document.getElementById('D');

socket.on('voteCount', (votes) => {
  countVotesA.innerText = 'Votes: A: ' + votes.A;
  countVotesB.innerText = 'Votes: B: ' + votes.B;
  countVotesC.innerText = 'Votes: C: ' + votes.C;
  countVotesD.innerText = 'Votes: D: ' + votes.D;
});

const userVote = document.getElementById('user-vote');

socket.on('userVote', (theVote) => {
  userVote.innerText = 'Your vote: ' + theVote;
});
