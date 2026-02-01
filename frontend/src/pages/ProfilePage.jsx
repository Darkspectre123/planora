import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
  FileInput,
  Button
} from "@mantine/core";
import {
  IconBriefcase,
  IconCalendar,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { useAuthStore } from "../store";
// import axios from "axios";
import { formatDate } from "../utils/dateUtils";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  if (!user) {
    return (
      <Container size="md" py="xl">
        <Paper p="xl" radius="md" withBorder>
          <Title order={3} align="center" mb="md">
            Authentication Required
          </Title>
          <Text align="center" color="dimmed">
            You must be logged in to view your profile.
          </Text>
        </Paper>
      </Container>
    );
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (user.fullName) {
      return user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return user.username?.charAt(0).toUpperCase() || "U";
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);

      const res = await axiosInstance.put(
        "/users/profile/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update user in store
      setUser(res.data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

    return (
    <Container size="md" py="xl" >
      <Title order={2} mb="xl">
        My Profile
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {/* Profile Card */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack align="center" spacing="md">
            <Avatar
              src={user.avatar?.url}
              size={120}
              radius={120}
              color="blue"
              mb="md"
            >
              {getInitials()}
            </Avatar>

            <Title order={3}>{user.fullName || "User"}</Title>
            <Text size="lg" c="dimmed">
              @{user.username}
            </Text>

            <Badge size="lg" color="blue" variant="filled">
              {user.role || "Member"}
            </Badge>

            <Text size="sm" c="dimmed" align="center" mt="xs">
              Member since {formatDate(user.createdAt)}
            </Text>

            {/* Upload Input */}
            <FileInput
              label="Upload Avatar"
              placeholder="Choose image"
              accept="image/png,image/jpeg,image/jpg"
              value={file}
              onChange={setFile}
            />

            <Button onClick={handleUpload} loading={loading}>
              Upload
            </Button>

          </Stack>
        </Card>

        {/* User Details */}
        {/* <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={3} mb="xl">
            Account Information
          </Title>

          <Stack spacing="lg">
            <Group>
              <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
                <IconUser size={18} />
              </ThemeIcon>
              <Box>
                <Text size="sm" c="dimmed">
                  Username
                </Text>
                <Text weight={500}>{user.username}</Text>
              </Box>
            </Group>

            <Divider />

            <Group>
              <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
                <IconMail size={18} />
              </ThemeIcon>
              <Box>
                <Text size="sm" c="dimmed">
                  Email
                </Text>
                <Text weight={500}>{user.email}</Text>
              </Box>
            </Group>

            <Divider />

            <Group>
              <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
                <IconBriefcase size={18} />
              </ThemeIcon>
              <Box>
                <Text size="sm" c="dimmed">
                  Role
                </Text>
                <Text weight={500}>{user.role || "Member"}</Text>
              </Box>
            </Group>

            <Divider />

            <Group>
              <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
                <IconCalendar size={18} />
              </ThemeIcon>
              <Box>
                <Text size="sm" c="dimmed">
                  Account Created
                </Text>
                <Text weight={500}>{formatDate(user.createdAt)}</Text>
              </Box>
            </Group>

            <Button
              variant="outline"
              color="white"
              bg={theme.colors.blue[6]}
              onClick={() => navigate("/profile/change-password")}
            >
              Change Password
            </Button>
          </Stack>
        </Card> */}

        <Card
  shadow="sm"
  padding="xl"
  radius="md"
  withBorder
  style={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
  }}
>
  <Title order={3} mb="xl">
    Account Information
  </Title>

  {/* CONTENT */}
  <Stack spacing="lg" style={{ flex: 1 }}>
    <Group>
      <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
        <IconUser size={18} />
      </ThemeIcon>
      <Box>
        <Text size="sm" c="dimmed">
          Username
        </Text>
        <Text fw={500}>{user.username}</Text>
      </Box>
    </Group>

    <Divider />

    <Group>
      <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
        <IconMail size={18} />
      </ThemeIcon>
      <Box>
        <Text size="sm" c="dimmed">
          Email
        </Text>
        <Text fw={500}>{user.email}</Text>
      </Box>
    </Group>

    <Divider />

    <Group>
      <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
        <IconBriefcase size={18} />
      </ThemeIcon>
      <Box>
        <Text size="sm" c="dimmed">
          Role
        </Text>
        <Text fw={500}>{user.role || "Member"}</Text>
      </Box>
    </Group>

    <Divider />

    <Group>
      <ThemeIcon size="lg" radius="md" color={theme.primaryColor}>
        <IconCalendar size={18} />
      </ThemeIcon>
      <Box>
        <Text size="sm" c="dimmed">
          Account Created
        </Text>
        <Text fw={500}>{formatDate(user.createdAt)}</Text>
      </Box>
    </Group>
  </Stack>

  {/* 🔽 BUTTON AT BOTTOM OF CARD */}
  <Button
    mt="xl"
    radius="md"
    bg={theme.colors.blue[6]}
    color="white"
    onClick={() => navigate("/profile/change-password")}
  >
    Change Password
  </Button>
</Card>

      </SimpleGrid>
    </Container>

);


}
