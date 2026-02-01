import React from "react";
import { Table, Card, Text, Badge,useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
// export default function DueTasksTable({ summary }) {
//   const tasksDue = summary.tasksDueIn7Days;

//   return (
//     <Card shadow="sm" padding="lg" mb="md" withBorder>
//       <Text weight={500} mb="sm">Tasks Due in Next 7 Days</Text>
//       {tasksDue === 0 ? (
//         <Text>No tasks due in next 7 days</Text>
//       ) : (
//         <Table striped highlightOnHover>
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Project</th>
//               <th>Priority</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* We can map tasks if you pass detailed task data */}
//             <tr>
//               <td colSpan={3}>Dynamic tasks mapping here</td>
//             </tr>
//           </tbody>
//         </Table>
//       )}
//     </Card>
//   );
// }


export default function DueTasksTable({ tasks = [] }) {
  const theme = useMantineTheme();
  
//     <Card withBorder>
//       <Text fw={600} mb="sm">Tasks Due Soon</Text>

//       {!tasks.length ? (
//         <Text size="sm" c="dimmed">No tasks due</Text>
//       ) : (
//         <Table>
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Project</th>
//               <th>Priority</th>
//               <th>Due</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map(task => (
//               <tr key={task._id}>
//                 <td>{task.title}</td>
//                 <td>{task.project?.title}</td>
//                 <td>
//                   <Badge color={task.priority === "high" ? "red" : "blue"}>
//                     {task.priority}
//                   </Badge>
//                 </td>
//                 <td>
//                   <Badge color="orange">
//                     {new Date(task.endDate).toLocaleDateString()}
//                   </Badge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Card>
//   );

return (
  <Card withBorder radius="md" p="md" bg={theme.colors.yellow[0]}  >
    <Text fw={600} mb="sm" c="cyan.7" style={{ letterSpacing: "-0.5px",fontFamily: "'DM Serif Display', serif",
        fontStyle: "italic",
        fontWeight: 2000,
        fontSize:20
      }}>
      Tasks Due in 7 Days
    </Text>
    <Table striped highlightOnHover withTableBorder style={{border:`1px solid ${theme.colors.yellow[7]}`}}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Task</Table.Th>
          <Table.Th>Project</Table.Th>
          <Table.Th>Priority</Table.Th>
          <Table.Th>Due</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {tasks.map((task) => (
          <Table.Tr key={task._id}>
            <Table.Td>{task.title}</Table.Td>
            <Table.Td>{task.project?.name}</Table.Td>
            <Table.Td>
              <Badge
                color={
                  task.priority === "high"
                    ? "red"
                    : task.priority === "medium"
                    ? "blue"
                    : "gray"
                }
              >
                {task.priority.toUpperCase()}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Badge color="orange">
                {dayjs(task.endDate).format("DD/MM/YYYY")}
              </Badge>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
    </Card>
  );
}