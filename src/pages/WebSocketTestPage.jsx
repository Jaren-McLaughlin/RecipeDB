import React, { useState, useCallback } from 'react';
import { Container, Paper, Typography, Box, Button, Alert, Chip, TextField } from '@mui/material';
import { useWebSocket } from '../hooks/useWebSocket';

function WebSocketTestPage() {
  const [messages, setMessages] = useState([]);
  const [testText, setTestText] = useState('Test message');
  
  const handleWebSocketMessage = useCallback((data) => {
    console.log('✓ Message received:', data);
    setMessages(prev => [...prev, { 
      ...data, 
      timestamp: new Date().toISOString(),
      received: true 
    }]);
  }, []);
  
  const { isConnected, sendMessage } = useWebSocket(handleWebSocketMessage);
  
  const handleTestMessage = () => {
    const msg = {
      type: 'test',
      message: testText,
      timestamp: new Date().toISOString()
    };
    
    const sent = sendMessage(msg);
    console.log('Sending test message:', msg, 'Success:', sent);
    
    setMessages(prev => [...prev, { ...msg, received: false, sent }]);
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        WebSocket Test Page
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Status:
          </Typography>
          <Chip 
            label={isConnected ? 'Connected' : 'Disconnected'}
            color={isConnected ? 'success' : 'error'}
          />
        </Box>
        
        <TextField
          fullWidth
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          label="Test Message"
          sx={{ mb: 2 }}
        />
        
        <Button 
          variant="contained" 
          onClick={handleTestMessage}
          disabled={!isConnected}
        >
          Send Test Message
        </Button>
        
        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
          Note: You'll only receive messages from OTHER tabs/windows
        </Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Messages: {messages.length}
        </Typography>
        
        {messages.length === 0 ? (
          <Alert severity="info">
            No messages yet. Open another tab and send a test message, or create a recipe!
          </Alert>
        ) : (
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {messages.map((msg, index) => (
              <Alert 
                key={index} 
                severity={msg.received ? 'success' : 'info'} 
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">
                  <strong>{msg.received ? '📥 RECEIVED' : '📤 SENT'}</strong><br/>
                  <strong>Type:</strong> {msg.type}<br/>
                  {msg.userName && <><strong>User:</strong> {msg.userName}<br/></>}
                  {msg.recipeName && <><strong>Recipe:</strong> {msg.recipeName}<br/></>}
                  {msg.message && <><strong>Message:</strong> {msg.message}<br/></>}
                  <strong>Time:</strong> {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </Alert>
            ))}
          </Box>
        )}
      </Paper>
      
      <Paper sx={{ p: 3, mt: 3, bgcolor: 'warning.light' }}>
        <Typography variant="h6" gutterBottom>
          Debug - Check Your Backend Terminal
        </Typography>
        <Typography variant="body2" component="div">
          When you click "Send Test Message", your backend terminal should show:
          <pre style={{background: '#000', color: '#0f0', padding: 10, marginTop: 10}}>
Received WebSocket message: {`{ type: 'test', message: '...', timestamp: '...' }`}<br/>
Broadcasting to 2 connections: {`{ type: 'test', ... }`}<br/>
Successfully broadcast to 1/2 connections
          </pre>
          
          If you DON'T see this, check service/index.js imported broadcastMessage at top.
        </Typography>
      </Paper>
    </Container>
  );
}

export default WebSocketTestPage;