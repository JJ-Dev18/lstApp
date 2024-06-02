// LikeButton.tsx
import React, { useEffect, useState } from 'react';
import { IconButton, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';


const MotionIconButton = motion(IconButton);
const MotionText = motion(Text);
const newSocket = io(import.meta.env.VITE_API_URL_SOCKET, {
    withCredentials: true,
    path: '/socket.io',
    transports: ['websocket'],
  
  });
const LikeButton: React.FC = () => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const textColor = useColorModeValue('gray.700', '#FFFFFF');

  useEffect(() => {
    if(newSocket){
        newSocket.on('likeCount', (count: number) => {
          setLikeCount(count);
        });
    
        return () => {
            newSocket.off('likeCount');
        };
    }
  }, [newSocket]);

  const handleLike = () => {
    if(newSocket){
        setLiked(true);
        newSocket.emit('like');
        setTimeout(() => setLiked(false), 500); // Reset animation state
    }
  };

  return (
    <VStack position="fixed" bottom='3%' right={5} zIndex={999}>
      <MotionIconButton
        aria-label="Like"
        icon={<FaHeart />}
        onClick={handleLike}
        colorScheme={liked ? "red" : "gray"}
        size="md"
        animate={{ scale: liked ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      <MotionText
        fontSize="xs"
        key={likeCount}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        color={textColor}
        transition={{ duration: 0.2 }}
      >
        {likeCount} Likes
      </MotionText>
    </VStack>
  );
};

export default LikeButton;
