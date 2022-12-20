import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultipleSelectCheckmarks from "./components/Select.js";
import TypeDescription from "./components/TypeDescription";
import Chart from "./components/Chart.js";

function App() {
  const [data, setData] = useState([]);
  const [segmentType, setSegmentType] = useState([]);
  const [segmentDescription, setSegmentDescription] = useState([]);

  


  const fetchData = async () => {
    try {
      const response = await axios.get("https://picnic-back-end-production.up.railway.app/");
      setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userSegment = [];
  data.map((user) => {
    if (!userSegment.includes(user["Segment Type"])) {
      userSegment.push(user["Segment Type"]);
    }
  });

  const filteredSegmentType = data.filter((element) =>
    segmentType.includes(element["Segment Type"])
  );

  const segmentDescriptions = [];
  [...filteredSegmentType].map((user) => {
    if (!segmentDescriptions.includes(user["Segment Description"])) {
      segmentDescriptions.push(user["Segment Description"]);
    }
  });
  const filteredSegmentDescriptions = filteredSegmentType.filter((element) =>
  segmentDescription.includes(element["Segment Description"])
);



  
  console.log(filteredSegmentDescriptions);


  let dataForChart;

  if (segmentDescription.length > 0) {
    dataForChart = filteredSegmentDescriptions;
  } else if (segmentType.length > 0) {
    dataForChart = filteredSegmentType;
  } else {
    dataForChart = data;
  }


  return (
    <MainDiv>
      <MultipleSelectCheckmarks
        segmentType={segmentType}
        setSegmentType={setSegmentType}
        selectOptions={userSegment}
      />
      <TypeDescription
        segmentDescription={segmentDescription}
        setSegmentDescription={setSegmentDescription}
        selectOptions={segmentDescriptions}
      />
      <ChartDiv>
        <Chart data={dataForChart}/>
      </ChartDiv>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  margin-top: 50px;
  margin-left: 50px;
`;


const ChartDiv = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  top: 150px;
  left: 40%;
`
export default App;
