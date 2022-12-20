import "./styles.css";
import React, { useState } from "react";
import { Box, Paper, Slider, Typography, Divider, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Chart } from "react-google-charts";

export const optionsPieChart = {
  title: "Pie Chart"
};

export const optionsBarChart = {
  chart: {
    title: "Bar Chart",
    subtitle: "Total Thinking vs Feeling"
  }
};

const marks = [
  {
    value: 0,
    label: "Low"
  },
  {
    value: 100,
    label: "High"
  }
];

function valuetext(value) {
  return `${value}°C`;
}

const App = () => {
  const [difficulty, setDifficulty] = useState(50);
  const [risk, setRisk] = useState(50);
  const [reward, setReward] = useState(50);
  const [scarcity, setScarcity] = useState(50);
  const [perception, setPerception] = useState(50);
  const [feeling, setFeeling] = useState(50);
  const [score, setScore] = useState(0);
  const [totalThinking, setTotalThinking] = useState(0);
  const [totalFeeling, setTotalFeeling] = useState(0);
  const [loading, setLoading] = useState(false);

  const dataBarChart = [
    ["Thinking Vs Feeling", "Thinking", "Feeling"],
    ["Result", totalThinking, totalFeeling]
  ];

  const dataPieChart = [
    ["Factor", "Score"],
    ["Difficulty", difficulty],
    ["Risk", risk],
    ["Reward", reward],
    ["Scarcity", scarcity],
    ["Perception", perception],
    ["Feeling", feeling]
  ];

  const calculate = () => {
    setLoading(true);
    let totalScore =
      ((difficulty + risk + reward + scarcity - perception - feeling) / 400) *
      100;
    setScore(totalScore);
    let totalThinking = difficulty + risk + reward + scarcity;
    setTotalThinking(totalThinking);
    let totalFeeling = perception + feeling;
    setTotalFeeling(totalFeeling);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ backgroundColor: "#bdbdbd", p: 2 }}>
      <Typography variant="h4" sx={textCenter}>
        Decision Making Calculator
      </Typography>
      <Box sx={container}>
        <Paper elevation={8} sx={wrapper}>
          <Typography variant="h5" sx={textCenter}>
            Metrics
          </Typography>
          <Divider sx={spacingTopBottom} />
          <Box sx={boxWrapper}>
            <Typography sx={subtitle}>Difficulty</Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={difficulty}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </Box>
          <Divider sx={spacingTopBottom} />
          <Box sx={boxWrapper}>
            <Typography sx={subtitle}>Risk</Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={risk}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(e) => setRisk(e.target.value)}
            />
          </Box>
          <Divider sx={spacingTopBottom} />
          <Box sx={boxWrapper}>
            <Typography sx={subtitle}>Reward</Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={reward}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(e) => setReward(e.target.value)}
            />
          </Box>
          <Divider sx={spacingTopBottom} />
          <Box sx={boxWrapper}>
            <Typography sx={subtitle}>Scarcity</Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={scarcity}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(e) => setScarcity(e.target.value)}
            />
          </Box>
          <Divider sx={spacingTopBottom} />
          <Box sx={boxWrapper}>
            <Typography sx={subtitle}>Perception</Typography>
            <Slider
              color="error"
              aria-label="Custom marks"
              defaultValue={perception}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(e) => setPerception(e.target.value)}
            />
          </Box>
          <Divider sx={spacingTopBottom} />
          <Box sx={boxWrapper}>
            <Typography sx={subtitle}>Feeling</Typography>
            <Slider
              color="error"
              aria-label="Custom marks"
              defaultValue={feeling}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(e) => setFeeling(e.target.value)}
            />
          </Box>
          <Box sx={submitButton}>
            {loading === true ? (
              <LoadingButton loading variant="outlined">
                Calculate
              </LoadingButton>
            ) : (
              <Button variant="contained" onClick={calculate}>
                Calculate
              </Button>
            )}
          </Box>
        </Paper>
        <Paper elevation={8} sx={secondWrapper}>
          <Box sx={scoreBox}>
            <Typography
              color="white"
              variant="h5"
              sx={[textCenter, spacingTop]}
            >
              Score
            </Typography>
            {score >= 70 ? (
              <>
                <Typography
                  variant="h3"
                  sx={[textCenter, spacingTop, textColorGreen]}
                >
                  {score}
                </Typography>
                <Typography
                  variant="h5"
                  sx={[textCenter, spacingTop, textColorGreen, textUnderline]}
                >
                  Do It.
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h3"
                  sx={[textCenter, spacingTop, textColorRed, textUnderline]}
                >
                  {score}
                </Typography>
                <Typography
                  variant="h5"
                  sx={[textCenter, spacingTop, textColorRed]}
                >
                  Don't Do It.
                </Typography>
              </>
            )}
          </Box>
          <Box sx={containerChart}>
            <Chart
              chartType="PieChart"
              data={dataPieChart}
              options={optionsPieChart}
              width={"100%"}
              height={"200px"}
            />
          </Box>
          <Divider sx={spacingTopBottom} />
          <Box sx={containerChart}>
            <Chart
              chartType="Bar"
              width="100%"
              height="200px"
              data={dataBarChart}
              options={optionsBarChart}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default App;

const container = {
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  },
  mt: 3
};

const wrapper = {
  padding: 5,
  flex: 1
};

const boxWrapper = {
  display: "flex",
  flexDirection: "column"
};

const subtitle = {
  fontWeight: "700"
};

const textCenter = {
  textAlign: "center",
  fontWeight: "700"
};

const spacingTopBottom = {
  mt: 2,
  mb: 2
};

const spacingTop = {
  mt: 2
};

const scoreBox = {
  backgroundColor: "black",
  pt: 1,
  pb: 1
};

const secondWrapper = {
  flex: 1,
  ml: {
    sm: 4
  },
  mt: {
    sm: 0,
    xs: 4
  }
};

const textColorGreen = {
  color: "green"
};

const textColorRed = {
  color: "red"
};

const textUnderline = {
  textDecoration: "underline"
};

const submitButton = {
  display: "flex",
  justifyContent: "center",
  mt: 4
};

const containerChart = {
  p: 1
};
