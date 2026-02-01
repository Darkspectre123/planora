import { Card, Table, Badge, Progress, Text ,useMantineTheme, } from "@mantine/core";

export default function ProjectHealthTable({ projects = [] }) {
  if (!projects.length) {
    return (
      <Text size="sm" color="dimmed" align="center">
        No project health data available
      </Text>
    );
  }
  const theme = useMantineTheme();
  const getStatusColor = (status) => {
    switch (status) {
      case "Healthy":
        return "green";
      case "Critical":
        return "red";
      default:
        return "yellow";
    }
  };

  return (
    // <Card withBorder radius="md">
    //   <Table>
    //     <thead>
    //       <tr>
    //         <th>Project ID</th>
    //         <th>Health Score</th>
    //         <th>Status</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {projects.map((project) => (
    //         <tr key={project.projectId}>
    //           <td>
    //             <Text size="sm">{project.projectId}</Text>
    //           </td>

    //           <td>
    //             {project.healthScore !== null ? (
    //               <Progress
    //                 value={project.healthScore}
    //                 color={getStatusColor(project.status)}
    //                 size="sm"
    //               />
    //             ) : (
    //               <Text size="xs" color="dimmed">
    //                 Not calculated
    //               </Text>
    //             )}
    //           </td>

    //           <td>
    //             <Badge color={getStatusColor(project.status)} variant="light">
    //               {project.status}
    //             </Badge>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </Table>
    // </Card>

    <Card withBorder radius="md" p="md" bg={theme.colors.teal[0]} >
  <Text fw={600} mb="sm" style={{ letterSpacing: "-0.5px",fontFamily: "'DM Serif Display', serif",
        fontStyle: "italic",
        fontWeight: 2000,
        fontSize:20
      }}>
    Project Health Overview
  </Text>

  <Table
    verticalSpacing="md"
    horizontalSpacing="lg"
    striped
    highlightOnHover
    withTableBorder
  >
    <Table.Thead>
      <Table.Tr>
        <Table.Th style={{textAlign:"left"}}>Project</Table.Th>
        <Table.Th style={{ textAlign: "center" }}>
          Health Score
        </Table.Th>
        <Table.Th style={{ textAlign: "center" }}>
          Status
        </Table.Th>
      </Table.Tr>
    </Table.Thead>

    <Table.Tbody>
      {projects.map((project) => (
        <Table.Tr key={project._id}>
          {/* Project Name */}
          <Table.Td>
            <Text fw={600} size="sm" style={{textAlign:"left"}}>
              {project.name?.toUpperCase()}
            </Text>
          </Table.Td>

          {/* Health Score */}
          <td>
            {project.healthScore !== null ? (
              <Progress
                value={project.healthScore}
                color={getStatusColor(project.status)}
                size="sm"
                radius="xl"
              />
            ) : (
              <Text size="xs" c="dimmed" ta="center">
                Not calculated
              </Text>
            )}
          </td>

          {/* Status */}
          <td style={{ textAlign: "center" }}>
            <Badge
              color={getStatusColor(project.status)}
              variant="light"
              radius="sm"
            >
              {project.status.toUpperCase()}
            </Badge>
          </td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
</Card>

  );
}

