import React from "react";
import { Skeleton, Stack } from "@mantine/core";

export default function DashboardSkeleton() {
  return (
    <Stack spacing="md" p="md">
      <Skeleton height={40} width="50%" radius="md" />
      <Skeleton height={200} radius="md" />
      <Skeleton height={200} radius="md" />
      <Skeleton height={300} radius="md" />
    </Stack>
  );
}
