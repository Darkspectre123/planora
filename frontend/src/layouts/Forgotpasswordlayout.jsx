import { Box, Container, Group, Image, Text, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
export default function Forgotpasswordlayout() {
    return (
        <Box style={{ minHeight: "100vh", 
        width: "100vw", backgroundImage: "url('/csir.jpg')",
         backgroundSize: "cover", 
         backgroundPosition: "center", 
         display: "flex", alignItems: "center", 
         justifyContent: "center", }} >
            <Box style={{ position: "absolute",
             top: 20,
              left: 20,
               zIndex: 10,
             }} >
                 <Group spacing="sm" align="center"> 
                    <Image src="/images/csir-logo.png" 
                    alt="CSIR Logo"
                     width={100}
                      height={100} 
                      fit="contain" />
                       <Box>
                         <Text size="lg"
                          fw={700}
                           c="blue.9" 
                           style={{ whiteSpace: "nowrap", lineHeight: 1.2, marginBottom: 0 }} > 
                           CSIR – Central Institute of Fuel and Mining Research 
                        </Text>
                        <Text size="sm" c="blue.4" style={{ whiteSpace: "nowrap", lineHeight: 1.1, marginTop: 0 }} > 
                            Council of Scientific and Industrial Research
                        </Text>
                      </Box> 
                </Group>
                 </Box> 
                 <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", paddingTop: 140, }} > 
                    <Outlet /> 
                </Box> 
        </Box>);
}
