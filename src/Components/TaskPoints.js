import { CardContent, Checkbox, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";

export const TaskPoints = ({ task, taskFuncs, setTaskCompleted }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPoints, setEditedPoints] = useState(task.points);
  const [checkedPoints, setCheckedPoints] = useState(task.points_completed);

  // these can get updated when requesting breakdown, but state won't pick this up so we do it manually
  useEffect(() => {
    setEditedPoints(task.points);
    setCheckedPoints(task.points_completed);
  }, [task]);

  
  const handlePointCheckboxChange = (index, event) => {
    // event.stopPropagation();
    if (checkedPoints.every(c => c === true)) { // they're all true right now, so we're about to turn one off!
      setTaskCompleted(false);
    }

    const newChecked = checkedPoints.map((val, i) => {
      if (i === index) { return !val }
      else             { return  val }
    });

    setCheckedPoints(newChecked);
    task.points_completed = newChecked;
    taskFuncs.patchTask(task, {points_completed: task.points_completed});

    if (newChecked.every(c => c === true)) {
      setTaskCompleted(true);
    }
  };

  const handlePointClick = (index) => {
    setEditingIndex(index);
  };

  const handlePointKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      handlePointBlur();
    }
  };

  const handlePointChange = (index, newText) => {
    const updatedPoints = [...editedPoints];
    updatedPoints[index] = newText;
    setEditedPoints(updatedPoints);
  };

  const handlePointBlur = () => {
    const trimmedPoints = editedPoints.map(point => point.trim());
    setEditedPoints(trimmedPoints);
    setEditingIndex(null);
    console.log('Updated points:', editedPoints);
    taskFuncs.patchTask(task, {points : editedPoints});
  };


  return (
    <CardContent>
      {editedPoints.map((point, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', textDecoration: checkedPoints[index] ? 'line-through' : 'none', }}>
          <Checkbox
            checked={checkedPoints[index]}
            onChange={(event) => handlePointCheckboxChange(index, event)}
          />
          {editingIndex === index ? (
            <TextField
              fullWidth
              value={point}
              onChange={(e) => handlePointChange(index, e.target.value)}
              onClick={() => handlePointClick(index)}
              onKeyDown={(e) => handlePointKeyDown(index, e)}
              onBlur={handlePointBlur}
              autoFocus
            />
          ) : (
            <Typography variant="body1" onClick={() => handlePointClick(index)}>
              {point}
            </Typography>
          )}
        </div>
      ))}
    </CardContent>
  )
}
