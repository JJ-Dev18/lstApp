import  { useState } from 'react';
import { Input, Button, Box, Text } from '@chakra-ui/react';
import instance from '../../api/axios';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    try {
      const res = await instance.post('/chat', { message });
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question..."
      />
      <Button onClick={handleSendMessage}>Send</Button>
      {response && <Text mt="4">{response}</Text>}
    </Box>
  );
};

export default ChatComponent;
