import React from "react";
import { Table, Card, Text, Progress,useMantineTheme,Group } from "@mantine/core";
import dayjs from "dayjs";



export default function DueProjectsTable({ projects = [] }) {
  const theme = useMantineTheme();
  return (


    <Card withBorder radius="md" p="md" bg={theme.colors.grape[0]}  >
  <Text fw={600} mb="sm" c="grape.7" style={{ letterSpacing: "-0.5px",fontFamily: "'DM Serif Display', serif",
      fontStyle: "italic",
      fontWeight: 2000,
      fontSize:20
    }}>
    Projects Due in 7 Days
  </Text>
    <Table withTableBorder striped highlightOnHover style={{border:`1px solid ${theme.colors.violet[5]}`}} >
      
      <Table.Thead>  
        <Table.Tr>
          <Table.Th style={{fontFamily:"'Poppins',sans-serif", fontSize: 15 , fontWeight: 900 , fontStyle:"normal"}} >Project's Name</Table.Th>
          <Table.Th style={{fontFamily:"'Poppins',sans-serif", fontSize: 15 , fontWeight: 900 , fontStyle:"normal"}}  >Timeline & Progress</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {projects.map((p) => {
          // const total = dayjs(p.endDate).diff(dayjs(p.startDate), "day");
          // const done = dayjs().diff(dayjs(p.startDate), "day");
          // const percent = Math.min((done / total) * 100, 100);
          const percent =
            p.totalTasks === 0
              ? 0
              : Math.round((p.completedTasks / p.totalTasks) * 100);


          return (
            <Table.Tr key={p._id}  bg={theme.colors.white}>
              <Table.Td  bg={theme.colors.white}>{p.name}</Table.Td>
              <Table.Td  bg={theme.colors.white}>
                {/* <Progress value={percent} /> */}
                <Progress
                  value={percent}
                  radius="xl"
                  color={
                    percent === 100
                      ? "green"
                      : percent >= 50
                        ? "violet"
                        : "orange"
                  }
                />
                <Group>
                  <Text size="xs" mt={4} c="dimmed">
                  {p.completedTasks} / {p.totalTasks} tasks completed
                </Text>
                <Text size="xs" mt={4} c="dimmed">
                     {percent} %
                </Text>
                </Group>
                
                <Text size="xs" mt={4} >
                  {dayjs(p.startDate).format("DD/MM/YY")} →{" "}
                  {dayjs(p.endDate).format("DD/MM/YY")}
                </Text>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
    </Card>
  );
}
