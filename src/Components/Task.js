import React from 'react';
import { Card, CardContent } from '@mui/material';

const Task = ({ title }) => {
  return (
    <Card style={{ width: '30vw', marginBottom: '10px' }}>
      <CardContent>
        <h3>{title}</h3>
      </CardContent>
    </Card>
  );
};

export default Task;
