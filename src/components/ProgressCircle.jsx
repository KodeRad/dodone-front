import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={200}
        variant="determinate"
        value={100}
        color="secondary"
      />
      {/* Completed tasks */}
      <CircularProgress
        size={200}
        variant="determinate"
        value={value}
        color="strongBlue" // Use your desired color for remaining tasks
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
          color="primary"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProgressCircle({ doneTodos, totalTodos }) {
  const progressDone = (doneTodos / totalTodos) * 100;

  return <CircularProgressWithLabel value={progressDone} />;
}

// function CircularProgressWithLabel({ value1, value2 }) {
//   return (
//     <Box sx={{ position: "relative", display: "inline-flex" }}>
//       <CircularProgress size={300} variant="determinate" value={value1} />
//       <CircularProgress size={300} variant="determinate" value={value2} />
//       <Box
//         sx={{
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           position: "absolute",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Typography
//           fontSize={50}
//           variant="caption"
//           component="div"
//           color="text.secondary"
//         >
//           {`${Math.round(value1)}%`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default function ProgressCircle({ totalTodos, doneTodo }) {
//   const progress = (doneTodo / totalTodos) * 100;
//   const progressRemaining = 100 - progress;

//   return (
//     <CircularProgressWithLabel value1={progress} value2={progressRemaining} />
//   );
// }
