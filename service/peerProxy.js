const { WebSocketServer } = require('ws');
const uuid = require('uuid').v4;

let connections = [];

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', (ws) => {
    const connection = { id: uuid(), alive: true, ws: ws };
    connections.push(connection);

    console.log(`New WebSocket connection: ${connection.id}, Total: ${connections.length}`);

    ws.on('message', function message(data) {
      try {
        const msg = JSON.parse(data);
        console.log('Received WebSocket message:', msg);
        
        connections.forEach((c) => {
          if (c.id !== connection.id && c.ws.readyState === 1) {
            c.ws.send(JSON.stringify(msg));
          }
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      const pos = connections.findIndex((o) => o.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
        console.log(`WebSocket closed: ${connection.id}, Remaining: ${connections.length}`);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        console.log(`Terminating dead connection: ${c.id}`);
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

function broadcastMessage(message) {
  console.log(`Broadcasting to ${connections.length} connections:`, message);
  
  let successCount = 0;
  connections.forEach((c) => {
    if (c.ws.readyState === 1) {
      try {
        c.ws.send(JSON.stringify(message));
        successCount++;
      } catch (error) {
        console.error(`Failed to send to connection ${c.id}:`, error);
      }
    }
  });
  
  console.log(`Successfully broadcast to ${successCount}/${connections.length} connections`);
}

module.exports = { peerProxy, broadcastMessage };