import { Box, List, ListItem, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Box
        as="footer"
        position="relative"
        bottom="0px"
        borderTop="solid 2px main.bg.sec"
        background="main.bg.sec"
        p="1rem 0.75rem"
        marginTop="2rem"
      >
        <Box
          margin="auto"
          display="flex"
          width="90%"
          alignItems="flex-start"
          justifyContent="space-between"
          color="#334155"
        >
          <Box>
            <Text>Company</Text>
            <Text>About Us</Text>
          </Box>

          <div>
            <Text>Careers</Text>
            <Text>Social</Text>
          </div>

          <div>
            <Text>Support</Text>
            <Text>Contact Us</Text>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
