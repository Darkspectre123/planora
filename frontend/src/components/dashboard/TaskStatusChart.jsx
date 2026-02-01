import React from "react";
import { Card, Text ,useMantineTheme,} from "@mantine/core";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { TaskStatusEnum } from "../../utils/constants";

export default function TaskStatusChart({ analytics }) {
  const theme = useMantineTheme();
  const data = [
    {
      name: "Todo",
      value: analytics.statusDistribution?.[TaskStatusEnum.TODO] || 0,
    },
    {
      name: "In Progress",
      value:
        analytics.statusDistribution?.[TaskStatusEnum.IN_PROGRESS] || 0,
    },
    {
      name: "Done",
      value: analytics.statusDistribution?.[TaskStatusEnum.DONE] || 0,
    },
  ];

  const COLORS = ["#ff9800", "#2196f3", "#4caf50"];

  return (
    <Card shadow="sm" padding="lg" mb="md" withBorder  bg={theme.colors.yellow[0]}>
      <Text fw={600} weight={500} mb="sm" style={{ letterSpacing: "-0.5px",fontFamily: "'DM Serif Display', serif",
        fontStyle: "italic",
        fontWeight: 2000,
        fontSize:20
      }}>Task Status Distribution</Text>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
