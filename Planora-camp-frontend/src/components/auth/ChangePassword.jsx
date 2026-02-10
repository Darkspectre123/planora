import { Box, Button, PasswordInput, Stack, Text, Alert,useMantineTheme, } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axiosInstance from "../../api/axios.js";

export default function ChangePassword() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validate: {
      newPassword: (v) =>
        v.length >= 6 ? null : "Minimum 6 characters",
    },
  });

  const handleSubmit = async (values) => {
    setError(null);
    try {
      const res = await axiosInstance.post("/auth/change-password", values);
      setSuccess(res.data.message);
      form.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <Box mx="auto" sx={{ maxWidth: 400 }}>
      <Text size="lg" fw={600} mb="md" c="indigo.5" style={{fontFamily: "Great Vibes, cursive"}}>
        Change Password
      </Text>

      {success && <Alert color="green">{success}</Alert>}
      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <PasswordInput
            label="Old Password"
            required
            {...form.getInputProps("oldPassword")}
            style={{fontFamily: "Montserrat, sans-serif"}}
            
          />

          <PasswordInput
            label="New Password"
            required
            {...form.getInputProps("newPassword")}
          />

          <Button type="submit">Update Password</Button>
        </Stack>
      </form>
    </Box>
  );
}
