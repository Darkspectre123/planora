import React from "react";
import { Card, Group, Text, Progress,useMantineTheme,Divider } from "@mantine/core";

export default function PersonalProductivity({ productivity }) {
  const { totalAssignedTasks, completedTasks, overdueTasks, completionRate } =
    productivity;

  const theme = useMantineTheme();  

  return (
    <Card shadow="sm" padding="lg" mb="md" withBorder bg={theme.colors.gray[2]}>
      <Text weight={500} mb="sm" style={{fontFamily:"'Lato', ans-serif", fontStyle:"italic",fontWeight:1100 , fontSize:"20px"}} >Personal Productivity</Text>
      <Divider/>
      <Group position="apart" mb="xs">
        <Text style={{fontFamily:"'Helvetica', ans-serif", fontStyle:"italic",fontWeight:700}} >Total Assigned Tasks:</Text>
        <Text>{totalAssignedTasks}</Text>
      </Group>
      <Group position="apart" mb="xs">
        <Text style={{fontFamily:"'Helvetica', ans-serif", fontStyle:"italic",fontWeight:700}}>Completed Tasks:</Text>
        <Text>{completedTasks}</Text>
      </Group>
      <Group position="apart" mb="xs">
        <Text style={{fontFamily:"'Helvetica', ans-serif", fontStyle:"italic",fontWeight:700}}>Overdue Tasks:</Text>
        <Text>{overdueTasks}</Text>
      </Group>
      <Group position="apart" mb="xs">
      <Text style={{fontFamily:"'Helvetica', ans-serif", fontStyle:"italic",fontWeight:700}}>Completion Rate: </Text>
      <Text>{completionRate} %</Text>
      </Group>
      <Progress value={completionRate} size="md" radius="xl" color="green" />
    </Card>
  );
}
