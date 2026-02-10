import { Box, Button, PasswordInput, Stack, Text, Alert,Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/axios.js";


export default function ResetPassword() {
  const { resetToken } = useParams();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: { newPassword: "" },
    validate: {
      newPassword: (v) =>
        v.length >= 6 ? null : "Minimum 6 characters",
    },
  });

  const handleSubmit = async (values) => {
    setError(null);
    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${resetToken}`,
        values
      );
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <Box mx="auto" sx={{ maxWidth: 560 , width: "100%"}} style={{maxWidth:420}} mt={80}>
        <Paper p="xl" radius="md" withBorder shadow="sm">
      <Text size="xl" fw={700} mb="md" style={{ letterSpacing: "-0.5px",fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic",
          fontWeight: 1000,
      }}>
        Reset Password
      </Text>

      {success && <Alert color="green">{success}</Alert>}
      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <PasswordInput
            label="New Password"
            required
            {...form.getInputProps("newPassword")}
          />

          <Button type="submit">Reset Password</Button>
        </Stack>
      </form>
      </Paper>
    </Box>
  );
}
