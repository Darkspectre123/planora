import React, { useEffect } from "react";
import { Grid, Container, Title, Divider,useMantineTheme } from "@mantine/core";
import useDashboardStore from "../store/dashboardStore";
import StatsCards from "../components/dashboard/StatsCards";
import TaskTrendChart from "../components/dashboard/TaskTrendChart";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";
import ProjectHealthTable from "../components/dashboard/ProjectHealthTable";
import DueTasksTable from "../components/dashboard/DueTasksTable";
import DueProjectsTable from "../components/dashboard/DueProjectsTable";
import PersonalProductivity from "../components/dashboard/PersonalProductivity";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

export default function Dashboard() {
  const theme=useMantineTheme();
  const {
    summary,
    analytics,
    productivity,
    loading,
    dueTasks,
  dueProjects,
    fetchSummary,
    fetchAnalytics,
    fetchProductivity,
    fetchDueTasks,
    fetchDueProjects,
  } = useDashboardStore();

  useEffect(() => {
    fetchSummary();
    fetchAnalytics();
    fetchProductivity();
    fetchDueTasks();
  fetchDueProjects();
  }, []);

  if (loading || !summary || !analytics || !productivity) {
    return <DashboardSkeleton />;
  }

  return (
    <Container size="xl" py="md">
      <Title order={2} mb="md" fw={700} style={{fontFamily:"'Arial',sans-serif",fontStyle:"italic", fontSize:"30px"}} c="indigo.8">CSIR-CIMFR Planora Dashboard</Title>

      <StatsCards summary={summary} />

      <Divider my="md" />

      <Grid>
        <Grid.Col md={6}>
          <TaskTrendChart analytics={analytics} />
        </Grid.Col>
        <Grid.Col md={6}>
          <TaskStatusChart analytics={analytics} />
        </Grid.Col>
      </Grid>

      <Divider my="md" />

      <PersonalProductivity productivity={productivity} />

      <Divider my="md" />

      <ProjectHealthTable projects={summary.projectHealth || []} />

      <Divider my="md" />

      <DueTasksTable tasks={dueTasks} />
      <Divider my="md" />
      <DueProjectsTable projects={dueProjects} />

    </Container>
  );
}
