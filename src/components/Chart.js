import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';

export default function Chart({ data }) {
  const RADIAN = Math.PI / 180;
  const COLORS = ['#003399', '#ff0066', '#ccff33', '#33ccff'];
  console.log(data)
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  const chartDescription = [];  

  const fb = data.filter((item) => item.Answer === "Facebook");
  const insta = data.filter((item) => item.Answer === "Instagram");
  const snap = data.filter((item) => item.Answer === "Snapchat");
  const linkedin = data.filter((item) => item.Answer === "Linkedin");

  const faceBookCount = fb.reduce((acc, item) => acc + +item.Count, 0);
  const instaCount = insta.reduce((acc, item) => acc + +item.Count, 0);
  const snapCount = snap.reduce((acc, item) => acc + +item.Count, 0);
  const linkedinCount = linkedin.reduce((acc, item) => acc + +item.Count, 0);

  const fbObj = {
    name: 'Facebook',
    value: faceBookCount
  }
  const instaObj = {
    name: 'Instagram',
    value: instaCount
  }
  const snapObj = {
    name: 'Snapchat',
    value: snapCount
  }
  const linkedinObj = {
    name: 'Linkedin',
    value: linkedinCount
  }

  chartDescription.push(
    fbObj,
    instaObj,
    snapObj,
    linkedinObj
  );


  return (
    <>
      <PieChart width={300} height={300}>
        <Pie
          data={chartDescription}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {chartDescription.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {chartDescription.map((entry, index) => {
          return (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} key={index}>
              <span style={{ backgroundColor: COLORS[index % COLORS.length], width: 10, height: 10, borderRadius: '50%' }} />
              {entry.name}
              <span style={{ color: COLORS[index % COLORS.length] }}>{entry.value}</span>
            </div>
          )
        })}
      </div>
    </>

  )
}