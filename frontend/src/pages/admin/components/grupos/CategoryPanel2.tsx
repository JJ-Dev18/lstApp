import React from 'react';
import { Box } from '@chakra-ui/react';
import DragDropContextComponent from './DragDropContextComponent';

interface CategoryPanelProps {
  categoryId: number;
}

const CategoryPanel2: React.FC<CategoryPanelProps> = ({ categoryId }) => {
  return (
    <Box>
      <DragDropContextComponent categoryId={categoryId} />
    </Box>
  );
};

export default CategoryPanel2;
