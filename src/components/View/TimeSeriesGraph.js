import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
} from "recharts";
// import { gaming as data } from "./data";
//Drop down list
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

import { database } from "../../util/firebase";

const useStyles = makeStyles({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: 5,
    width: 320,
  },
  chart: {
    width: "320px",
  },
  form: {
    width: "160px",
    marginBottom: "30px",
  },
});

const TimeSeriesGraph = ({ dataType }) => {
  const classes = useStyles();

  let timeRangeDefault = 24;
  let yAxisLabel;
  let domainMin, domainMax;
  switch (dataType) {
    case "Nutrient Content":
      timeRangeDefault = 7;
      domainMin = 0;
      domainMax = 3;
      yAxisLabel = "EC Content in mS/cm";
      break;
    case "Ambient Temperature":
      yAxisLabel = "Ambient Temperature in degree celsius";
      domainMin = 20;
      domainMax = 50;
      break;
    case "Ambient Humidity":
      yAxisLabel = "Ambient Humidity in percentage %";
      domainMin = 0;
      domainMax = 100;
      break;
    case "LightIntensity":
      yAxisLabel = "Light Intensity in Lux";
      domainMin = 0;
      domainMax = 100000;
      break;
    case "PH":
      yAxisLabel = "PH Value";
      domainMin = 0;
      domainMax = 14;
      break;
    default:
      yAxisLabel = "Error";
      domainMin = 20;
      domainMax = 50;
  }

  const [timeRange, setTimeRange] = useState(timeRangeDefault);
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [graphData, setGraphData] = useState([]);

  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };

  useEffect(() => {
    let data1 = [];
    const getHourlyData = async () => {
      let startTime = new Date();
      startTime.setHours(startTime.getHours() - 24);
      let data = await database().ref()
        .where("createdAt", ">", startTime)
        .get();
      data.forEach((doc) => {
        // Gets the hour from the id name
        const hour = doc.id.slice(-2);
        let item = Object();
        item.argument = hour;
        item.value = doc.data()[dataType];
        data1.push(item);
      });
      setGraphData(data1);
    };

    const getDailyData = async () => {
      let startTime = new Date();
      startTime.setDate(startTime.getDay() - 7);

      let collection;
      if (dataType === "Nutrient Content") {
        collection = "ecTimeSeries";
      } else {
        collection = "timeSeriesDataDaily";
      }

      let data = await database.collection(collection)
        .where("createdAt", ">", startTime)
        .get();
      data.forEach((doc) => {
        // Gets the day from the id name
        const hour = doc.id.substr(0, 2);
        let item = Object();
        item.argument = hour;
        item.value = doc.data()[dataType];
        data1.push(item);
      });
      setGraphData(data1);
    };

    if (timeRange === 24) {
      getHourlyData();
      setXAxisLabel("Time in 24 hours");
    } else if (timeRange === 7) {
      getDailyData();
      setXAxisLabel("Days of the month");
    }
  }, [timeRange, dataType]);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" align="center">
        Graph of {dataType}
      </Typography>
      <LineChart width={300} height={500} data={graphData} syncId="anyId">
        <Line type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="argument">
          <Label value={xAxisLabel} offset={0} position="insideBottom" />
        </XAxis>
        <YAxis
          domain={[domainMin, domainMax]}
          interval={0}
          allowDecimals={false}
        >
          <Label
            value={yAxisLabel}
            offset={5}
            position="insideLeft"
            angle={-90}
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />
      </LineChart>

      <FormControl className={classes.form}>
        <InputLabel id="demo-simple-select-label">
          Select timeRange range
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeRange}
          onChange={handleChange}
        >
          {dataType !== "Nutrient Content" ? (
            <MenuItem value={24}>Past 24 hours</MenuItem>
          ) : null}
          <MenuItem value={7}>Past 7 days</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default TimeSeriesGraph;
