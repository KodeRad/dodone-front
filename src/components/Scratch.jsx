function CircularProgressWithLabel({ value1, value2 }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* Completed tasks */}
      <CircularProgress
        size={300}
        variant="determinate"
        value={value1}
        color="primary" // Use your desired color for completed tasks
      />
      {/* Remaining tasks */}
      <CircularProgress
        size={300}
        variant="determinate"
        value={value2}
        color="secondary" // Use your desired color for remaining tasks
        sx={{ position: "absolute" }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={50}
          variant="caption"
          component="div"
          color="text.primary"
        >
          {`${Math.round(value1)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProgressCircle({ totalTodos, doneTodos }) {
  const progressDone = (doneTodos / totalTodos) * 100;
  // console.log(progressDone);
  const progressRemaining = 100 - progressDone;

  return (
    <CircularProgressWithLabel
      value1={progressDone}
      value2={progressRemaining}
    />
  );
}
