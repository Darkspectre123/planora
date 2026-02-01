import React from 'react'
import { Box, Container,Image } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function ResetLayout() {
  return (
    

    <Box
    
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/bgreset.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
      <Container size="lg">

        <Outlet />
      </Container>
      
    </Box>
  );
  
}

