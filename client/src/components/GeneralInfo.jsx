import { Box, TextField, Typography } from "@mui/material";

const GeneralInfo = () => {
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "45%" },
        }}
      >
        <Typography variant="h7" sx={{ fontWeight: 545 }}>
          First Name:{" "}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          margin="normal"
          value={"Prathamesh"}
          disabled
        />

        <Typography variant="h7" sx={{ fontWeight: 545 }}>
          Last Name:{" "}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          margin="normal"
          value={"Theurkar"}
          disabled
        />

        <Typography variant="h7" sx={{ fontWeight: 545 }}>
          Email:{"  "}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          margin="normal"
          value={"prathamesh@gmail.com"}
          disabled
        />
      </Box>
    </>
  );
};

export default GeneralInfo;
