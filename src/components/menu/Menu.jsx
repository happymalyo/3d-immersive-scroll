import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import { makeStyles } from '@material-ui/core/styles';
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import annotations from '../../constants/annotations.json';
import Typography from "@mui/material/Typography";

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

const Menu = ({gotoAnnotation}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();

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
        {annotations.map((step, index) => (
          <Step
            key={step.title}
            sx={{ ".MuiStepConnector-line": { height: "100%" } }}
          >
            <StepLabel
              onClick={() => {
                gotoAnnotation(index);
                setActiveStep(index);
              }}
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
                {step.title}
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
