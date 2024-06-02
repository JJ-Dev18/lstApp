import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Textarea, useToast } from '@chakra-ui/react';
import instance from '../../../api/axios';

const FeedbackForm: React.FC = () => {
  const [comments, setComments] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     if(comments != ''){
         await instance.post('/feedback', { comments });
         toast({
           title: 'Feedback enviado.',
           description: 'Gracias por tu feedback!',
           status: 'success',
           duration: 5000,
           isClosable: true,
         });
         setComments('');
     }
    } catch (error) {
      toast({
        title: 'Error enviando feedback.',
        description: 'Inténtalo de nuevo más tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="comments" isRequired>
          <FormLabel>Comentarios</FormLabel>
          <Textarea value={comments} onChange={(e) => setComments(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Enviar Feedback
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;
