// import { Box, Button, Text, TextInput, Stack, Alert } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { useState } from "react";
// import axiosInstance from "../../api/axios.js";



// export default function ForgotPassword() {
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);

//   const form = useForm({
//     initialValues: { email: "" },
//     validate: {
//       email: (value) =>
//         /^\S+@\S+$/.test(value) ? null : "Invalid email",
//     },
//   });

//   const handleSubmit = async (values) => {
//     setError(null);
//     setSuccess(null);
//     try {
//       const res = await axiosInstance.post("/auth/forgot-password", values);
//       setSuccess(res.data.message);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <Box mx="auto" sx={{ maxWidth: 400 }} mt={80}>
//       <Text size="xl" fw={700} mb="md">
//         Forgot Password
//       </Text>

//       {success && <Alert color="green">{success}</Alert>}
//       {error && <Alert color="red">{error}</Alert>}

//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <Stack>
//           <TextInput
//             label="Email"
//             placeholder="your@email.com"
//             required
//             {...form.getInputProps("email")}
//           />

//           <Button type="submit">Send Reset Link</Button>
//         </Stack>
//       </form>
//     </Box>
//   );
// }


import {
  Box,
  Text,
  Paper,
  Stack,
  TextInput,
  Button,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axiosInstance from "../../api/axios.js";


export default function ForgotPassword() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", values);
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box mx="auto" sx={{ maxWidth: 420 }} mt={80}>
      <Paper p="xl" radius="md" withBorder shadow="sm" style={{background: "rgba(255, 255, 255, 0.18)", // very transparent
    backdropFilter: "blur(2px)",             // 🔥 LOW blur
    WebkitBackdropFilter: "blur(2px)",
    border: "1px solid rgba(255,255,255,0.25)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",}}>
        <Text size="xl" weight={500} mb="md" align="center" style={{ letterSpacing: "-0.5px",fontFamily: "'Playfair Display', serif",
fontStyle: "italic",
fontWeight: 800,
 }}>
          Forgot Password
        </Text>

        {success && <Alert color="green" mb="md">{success}</Alert>}
        {error && <Alert color="red" mb="md">{error}</Alert>}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps("email")}
            />

            <Button type="submit" fullWidth>
              Send Reset Link
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
