import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import { makeStyles } from '@material-ui/core/styles';
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "welcome",
    description: "",
  },
  {
    label: "Your weather",
    description: "",
  },
  {
    label: "Birthday",
    description: "",
  },

  {
    label: "News arrivals",
    description: "",
  },

  {
    label: "Directors word",
    description: "",
  },

  {
    label: "WimTim",
    description: "",
  },
  {
    label: "ORIZON",
    description: "",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "0px",
    left: "4px"
  },
  label: {
    cursor: "pointer"
  }
}));

const Menu = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();
  const handleNext = (val) => {
    setActiveStep(val);
  };

  return (
    <div>
      <Box sx={{ maxWidth: 500, height: "100%" }} className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          flexDirection: "column-reverse",
          height: "100%",
          ".MuiStepConnector-line": { height: "100%" },
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{ ".MuiStepConnector-line": { height: "100%" } }}
          >
            <StepLabel
              onClick={() => handleNext(index)}
              sx={{
                ">*": {
                  color: "white",
                  height: "100%",
                  ".MuiStepConnector-line": {
                    height: "100%",
                  },
                },
              }}
            >
              <Typography variant="caption" color={"white"} className={classes.label}>
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
  );
};

export default Menu;
