import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { DateInput } from "@mantine/dates";
import { Select } from "@mantine/core";


/**
 * Subtask form modal component
 * @param {Object} props - Component props
 * @param {boolean} props.opened - Whether the modal is open
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @param {Object} [props.initialValues] - Initial values for the form
 * @param {boolean} [props.isLoading] - Whether the form is loading
 * @param {string} [props.title="Add Subtask"] - Modal title
 * @param {string} [props.submitText="Add Subtask"] - Submit button text
 */
export default function SubtaskFormModal({
  opened,
  onClose,
  onSubmit,
  // initialValues = { title: "" },
  initialValues = {
  title: "",
  startDate: "",
  endDate: "",
  priority: "medium",
},

  isLoading = false,
  title = "Add Subtask",
  submitText = "Add Subtask",
}) {
  // const form = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     title: initialValues.title || "",
  //   },
  //   validate: {
  //     title: (value) => (value.trim().length < 1 ? "Title is required" : null),
  //   },
  // });
  const form = useForm({
  mode: "uncontrolled",
  initialValues: {
    title: initialValues.title || "",
    startDate: initialValues.startDate || null,
    endDate: initialValues.endDate || null,
    priority: initialValues.priority || "medium",
  },
  validate: {
    title: (value) => (!value.trim() ? "Title is required" : null),
    endDate: (value, values) =>
      values.startDate && value < values.startDate
        ? "End date must be after start date"
        : null,
  },
});


  return (
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        onClose();
      }}
      title={title}
      size="md"
      centered
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="md">
          <TextInput
            label="Subtask Title"
            placeholder="Enter subtask title"
            required
            key={form.key("title")}
            {...form.getInputProps("title")}
            data-autofocus
          />
          <DateInput
  label="Start Date"
  placeholder="Pick start date"
  {...form.getInputProps("startDate")}
/>

<DateInput
  label="End Date"
  placeholder="Pick end date"
  {...form.getInputProps("endDate")}
/>

<Select
  label="Priority"
  data={[
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ]}
  {...form.getInputProps("priority")}
/>

          <Button type="submit" loading={isLoading} fullWidth mt="md">
            {submitText}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
