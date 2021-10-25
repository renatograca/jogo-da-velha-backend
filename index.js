const express = require('express');

const app = express();
const port = 3000;

const tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogador = 0;
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', (client) => {
  console.log('conectou');
  client.emit('start', { jogador });
  jogador += 1;
  client.on('event', ({ chave, jogador }) => {
    if (jogador === 0) {
      tabuleiro[chave] = 'x';
      client.emit('tabuleiro', tabuleiro);
    }
    if (jogador === 1) {
      tabuleiro[chave] = 'o';
      client.emit('tabuleiro', tabuleiro);
    }
  });
  client.on('disconnect', () => { /* … */ });
});

app.get('/play', (req, res) => res.status(200).json(tabuleiro));

server.listen(3001);

app.get('/', (req, res) => res.send('Hello World!'));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
