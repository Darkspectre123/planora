import React from "react";
import { Grid, Card, Text, Group, Badge , useMantineTheme} from "@mantine/core";

export default function StatsCards({ summary }) {
  const theme = useMantineTheme();
  const stats = [
    { label: "Total Projects", value: summary.totalProjects },
    { label: "Total Tasks", value: summary.totalTasks },
    { label: "Completed Tasks", value: summary.completedTasks },
    { label: "Overdue Tasks", value: summary.overdueTasks },
    { label: "Tasks Due in 7 Days", value: summary.tasksDueIn7Days },
  ];

  return (
    <Grid mb="md" >
      {stats.map((stat, i) => (
        <Grid.Col key={i} xs={12} sm={6} md={2.4} bg={theme.colors.lime[0]}>
          <Card shadow="sm" padding="lg" withBorder  bg={theme.colors.gray[1]}>
            <Group position="apart" mb="xs"   >
              <Text fw={500} weight={500} style={{ letterSpacing: "-0.5px",fontFamily: "'DM Serif Display', serif",
        fontStyle: "italic",
        fontWeight: 2000,
        fontSize:18
      }}>{stat.label}</Text>
              <Badge color="lime">{stat.value}</Badge>
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
