import { Container, Paper, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import useAuthStore from "../store/authStore";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    // <Container size="xs" py="xl">
    //   <Paper radius="md" p="xl" withBorder>
    //     <Tabs value={activeTab} onChange={handleTabChange}>
    //       <Tabs.List grow mb="md">
    //         <Tabs.Tab value="login">Login</Tabs.Tab>
    //         <Tabs.Tab value="register">Register</Tabs.Tab>
    //       </Tabs.List>

    //       {activeTab === "login" ? (
    //         <LoginForm onRegisterClick={() => setActiveTab("register")} />
    //       ) : (
    //         <RegisterForm onLoginClick={() => setActiveTab("login")} />
    //       )}
    //     </Tabs>
    //   </Paper>
    // </Container>

//     <Container size="xs" py="xl">
//   <Paper
//     radius="md"
//     p="xl"
//     sx={{
//       backgroundColor: "rgba(255,255,255,0.15)",
//       backdropFilter: "blur(160px)",
//       WebkitBackdropFilter: "blur(160px)",
//       border: "1px solid rgba(255,255,255,0.3)",
//     }}
//   >
//     <Tabs value={activeTab} onChange={handleTabChange}>
//       <Tabs.List
//         grow
//         mb="md"
//         sx={{ backgroundColor: "transparent" }}
//       >
//         <Tabs.Tab value="login">Login</Tabs.Tab>
//         <Tabs.Tab value="register">Register</Tabs.Tab>
//       </Tabs.List>

//       {activeTab === "login" ? (
//         <LoginForm onRegisterClick={() => setActiveTab("register")} />
//       ) : (
//         <RegisterForm onLoginClick={() => setActiveTab("login")} />
//       )}
//     </Tabs>
//   </Paper>
// </Container>
    
   <Container size="xs" py="xl">
  <Paper
    radius="md"
    p="xl"
    sx={{
      backgroundColor: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(160px)",
      WebkitBackdropFilter: "blur(160px)",
      border: "1px solid rgba(255,255,255,0.3)",
    }}
    style={{background: "rgba(255, 255, 255, 0.18)", // very transparent
    backdropFilter: "blur(2px)",             // 🔥 LOW blur
    WebkitBackdropFilter: "blur(2px)",
    border: "1px solid rgba(255,255,255,0.25)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",}}
  >
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tabs.List
        grow
        mb="md"
        sx={{ backgroundColor: "transparent" }}
      >
        <Tabs.Tab value="login" c="dark.9" style={{fontSize: 19}}>Login</Tabs.Tab>
        <Tabs.Tab value="register" c="dark.9" style={{fontSize: 19}}>Register</Tabs.Tab>
      </Tabs.List>

      {activeTab === "login" ? (
        <LoginForm onRegisterClick={() => setActiveTab("register")} />
      ) : (
        <RegisterForm onLoginClick={() => setActiveTab("login")} />
      )}
    </Tabs>
  </Paper>
</Container>

  );
}
