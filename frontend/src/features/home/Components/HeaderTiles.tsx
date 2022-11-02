import { Box, Flex, Text } from "@chakra-ui/react";
import { Tile } from "features";

const HeaderTiles = () => {
  return (
    <>
      <Box marginTop="4.5rem" as="section">
        <Box
          maxWidth={{
            mmd: "50rem",
          }}
          margin="auto"
          p="0rem 2rem"
        >
          <Flex
            marginTop={{
              ssm: "2rem",
              sm: "2.4rem",
              md: "2.7rem",
            }}
            gap="1.5rem"
            justifyContent="space-evenly"
            alignItems="center"
            flexDirection={{ ssm: "column", mdlg: "row" }}
          >
            <span data-testid="header-cards-one">
              <Tile
                iconName="people"
                headingTitle="Knowledge sharing"
                comment="Use code, apps, and templates collectively. Learn from each other and bake-in best practices"
                key="people card"
              />
            </span>
            <span data-testid="header-cards-two">
              <Tile
                iconName="npm"
                headingTitle="Supercharged with npm"
                comment="Use private packages, or any of the 1M+ public ones, to build powerful apps quickly."
                key="npm card"
              />
            </span>
            <span data-testid="header-cards-three">
              <Tile
                iconName="flash"
                headingTitle="Optimized for React"
                comment="Custom environments built specifically for React, HTML/CSS, Javascript, CPP, TSX and many more."
                key="flash card"
              />
            </span>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default HeaderTiles;
