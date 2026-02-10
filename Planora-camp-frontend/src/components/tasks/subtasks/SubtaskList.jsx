import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Collapse,
  Group,
  Modal,
  Paper,
  Progress,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Select } from "@mantine/core";

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskStore } from "../../../store";
import { TaskStatusEnum } from "../../../utils/constants";
import { getStatusColor } from "../../../utils/taskStatusUtils";

/**
 * Subtask list component for displaying and managing subtasks
 * @param {Object} props - Component props
 * @param {Object} props.task - Parent task object
 * @param {Array} props.subtasks - Array of subtasks to display
 */

const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "low":
      return "green";
    case "medium":
      return "yellow";
    case "high":
      return "red";
    default:
      return "gray";
  }
};

export default function SubtaskList({ task }) {
  const theme = useMantineTheme();
  const { projectId } = useParams();
  const {
    subtasks,
    toggleSubtaskCompletion,
    createSubtask,
    updateSubtask,
    deleteSubtask,
    isLoading,
  } = useTaskStore();


  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState(null);
  const [opened, { toggle }] = useDisclosure(true);

  const addForm = useForm({
    initialValues: {
      title: "",
      
    },
    validate: {
      title: (value) => (value.trim().length < 1 ? "Title is required" : null),
    },
  });

  const editForm = useForm({
    initialValues: {
      title: "",
      priority: "medium",
      startDate: "",
      endDate: "",
    },
    validate: {
      title: (value) => (value.trim().length < 1 ? "Title is required" : null),
      endDate: (v, values) =>
        values.startDate && v < values.startDate
          ? "End date must be after start date"
          : null,
    },
  });

  const handleToggleCompletion = async (subtaskId, isCompleted) => {
    try {
      await toggleSubtaskCompletion(projectId, subtaskId, isCompleted);
    } catch (error) {
      console.error("Failed to toggle subtask completion:", error);
    }
  };

  const handleAddSubtask = async (values) => {
    try {
      await createSubtask(projectId, task._id, values);
      addForm.reset();
      setAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add subtask:", error);
    }
  };

  const openEditModal = (subtask) => {
    setSelectedSubtask(subtask);
    editForm.setValues({
      title: subtask.title,
      priority: subtask.priority || "medium",
      startDate: subtask.startDate || "",
      endDate: subtask.endDate || "",
    });
    setEditModalOpen(true);
  };

  const openDeleteModal = (subtask) => {
    setSelectedSubtask(subtask);
    setDeleteModalOpen(true);
  };

  const handleEditSubtask = async (values) => {
    if (!selectedSubtask) return;

    try {
      await updateSubtask(projectId, selectedSubtask._id, {
        title: values.title,
        isCompleted: selectedSubtask.isCompleted,
        priority: values.priority,
        startDate: values.startDate,
        endDate: values.endDate,
      });
      setEditModalOpen(false);
      setSelectedSubtask(null);
    } catch (error) {
      console.error("Failed to update subtask:", error);
    }
  };

  const handleDeleteSubtask = async () => {
    if (!selectedSubtask) return;

    try {
      await deleteSubtask(projectId, selectedSubtask._id);
      setDeleteModalOpen(false);
      setSelectedSubtask(null);
    } catch (error) {
      console.error("Failed to delete subtask:", error);
    }
  };

  const completedCount = subtasks.filter((st) => st.isCompleted).length;
  const progress =
    subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0;

  return (
    <>
      <Paper p="md" withBorder mb="md" radius="md" shadow="xs">
        <Group position="apart" mb="md">
          <Group spacing="xs">
            <Title order={5}>Subtasks</Title>
            <ActionIcon
              size="sm"
              onClick={toggle}
              color="gray"
              variant="subtle"
            >
              {opened ? (
                <IconChevronUp size={16} />
              ) : (
                <IconChevronDown size={16} />
              )}
            </ActionIcon>
          </Group>
          <Group>
            <Badge
              color={getStatusColor(task.status)}
              size="md"
              variant="light"
              radius="sm"
            >
              {completedCount}/{subtasks.length} completed
            </Badge>
            <Button
              size="xs"
              leftIcon={<IconPlus size={14} />}
              onClick={() => setAddModalOpen(true)}
              variant="light"
              radius="md"
            >
              Add
            </Button>
          </Group>
        </Group>

        {subtasks.length > 0 && (
          <Progress
            value={progress}
            size="sm"
            mb="md"
            color={getStatusColor(task.status)}
            radius="xl"
            striped={task.status === TaskStatusEnum.IN_PROGRESS}
            animate={task.status === TaskStatusEnum.IN_PROGRESS}
          />
        )}

        <Collapse in={opened}>
          {subtasks.length === 0 ? (
            <Text c="dimmed" size="sm" ta="center" py="md">
              No subtasks yet
            </Text>
          ) : (
            <Stack spacing="xs">
              {subtasks.map((subtask) => (
                <Box
                  key={subtask._id}
                  p="xs"
                  style={{
                    borderRadius: theme.radius.sm,
                    backgroundColor: subtask.isCompleted
                      ? theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0]
                      : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <Group position="apart">
                    <Group>
                      <Checkbox
                        checked={subtask.isCompleted}
                        onChange={() =>
                          handleToggleCompletion(
                            subtask._id,
                            subtask.isCompleted
                          )
                        }
                        color={getStatusColor(task.status)}
                      />
                      {/* <Checkbox
                        checked={subtask.isCompleted}
                        onChange={() =>
                          handleToggleCompletion(
                            subtask._id,
                            !subtask.isCompleted   // ✅ TOGGLE
                          )
                        }
                        color={getStatusColor(task.status)}
                      /> */}
                      <Text
                        style={{
                          textDecoration: subtask.isCompleted
                            ? "line-through"
                            : "none",
                          opacity: subtask.isCompleted ? 0.7 : 1,
                        }}
                      >
                        {/* {subtask.title} */}
                        {subtask.title}{" "}
                        {subtask.priority && (
                          <Badge
                            size="xs"
                            color={getPriorityColor(subtask.priority)}
                            ml={5}
                            variant="light"
                          >
                            {subtask.priority}
                          </Badge>
                        )}
                      </Text>
                    </Group>
                    <Group spacing={5}>
                      <Tooltip label="Edit Subtask">
                        <ActionIcon
                          size="sm"
                          color="blue"
                          variant="subtle"
                          onClick={() => openEditModal(subtask)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete Subtask">
                        <ActionIcon
                          size="sm"
                          color="red"
                          variant="subtle"
                          onClick={() => openDeleteModal(subtask)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Group>
                </Box>
              ))}
            </Stack>
          )}
        </Collapse>
      </Paper>

      {/* Add Subtask Modal */}
      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Subtask"
        centered
        size="md"
      >
        <form onSubmit={addForm.onSubmit(handleAddSubtask)}>
          <Stack>
            <TextInput
              label="Subtask Title"
              placeholder="Enter subtask title"
              required
              {...addForm.getInputProps("title")}
              data-autofocus
            />

            
  {/* Start Date */}
  <TextInput
    type="date"
    label="Start Date"
    placeholder="Select start date"
    {...addForm.getInputProps("startDate")}
  />

  {/* End Date */}
  <TextInput
    type="date"
    label="End Date"
    placeholder="Select end date"
    {...addForm.getInputProps("endDate")}
  />

  {/* Priority */}
  <Select
    label="Priority"
    placeholder="Select priority"
    data={[
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ]}
    {...addForm.getInputProps("priority")}
  />

            <Group position="right">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={isLoading}>
                Add Subtask
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Edit Subtask Modal */}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Subtask"
        centered
        size="md"
      >
        <form onSubmit={editForm.onSubmit(handleEditSubtask)}>
          <Stack>
            <TextInput
              label="Subtask Title"
              placeholder="Enter subtask title"
              required
              {...editForm.getInputProps("title")}
              data-autofocus
            />

              <TextInput
    type="date"
    label="Start Date"
    placeholder="Select start date"
    {...editForm.getInputProps("startDate")}
  />

  <TextInput
    type="date"
    label="End Date"
    placeholder="Select end date"
    {...editForm.getInputProps("endDate")}
  />

  <Select
    label="Priority"
    placeholder="Select priority"
    data={[
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ]}
    {...editForm.getInputProps("priority")}
  />

            <Group position="right">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={isLoading}>
                Update Subtask
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Delete Subtask Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Subtask"
        centered
        size="sm"
      >
        <Stack>
          <Text>
            Are you sure you want to delete this subtask? This action cannot be
            undone.
          </Text>
          <Group position="right">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteSubtask}
              loading={isLoading}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
