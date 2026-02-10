import React from "react";
import { Card, Text,useMantineTheme, } from "@mantine/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TaskTrendChart({ analytics }) {
  const theme = useMantineTheme();
  const data = analytics.trend.labels.map((label, i) => ({
    date: label,
    created: analytics.trend.created[i],
    completed: analytics.trend.completed[i],
  }));

  return (
    <Card shadow="sm" padding="lg" mb="md" withBorder bg={theme.colors.teal[0]}>
      <Text fw={600} weight={500} mb="sm" style={{ letterSpacing: "-0.5px",fontFamily: "'DM Serif Display', serif",
        fontStyle: "italic",
        fontWeight: 2000,
        fontSize:20
      }}>Task Trend (Last 7 Days)</Text>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="created" stroke="#4caf50" />
          <Line type="monotone" dataKey="completed" stroke="#2196f3" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
