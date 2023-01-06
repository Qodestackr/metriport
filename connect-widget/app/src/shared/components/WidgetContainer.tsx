import {
  Box,
  Image,
  Text,
  useColorModeValue,
  Flex,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import Constants from "../../shared/constants";
import { getCustomColor } from "../localStorage/custom-color";

type WidgetContainerProps = {
  children: JSX.Element;
};

const WidgetContainer = ({ children }: WidgetContainerProps) => {
  const [searchParams] = useSearchParams();

  const color = searchParams.get(Constants.CUSTOM_COLOR_PARAM);

  const customColor = getCustomColor(color);

  const decidePrimaryColor = `${
    customColor ? customColor : Constants.PRIMARY_COLOR
  } !important`;

  const decideHollowColor = `${useColorModeValue(
    "white",
    "grey.700"
  )} !important`;

  const theme = extendTheme({
    breakpoints: Constants.BREAKPOINTS,
    styles: { global: () => ({ body: { bg: "" } }) },
    components: {
      Button: {
        baseStyle: {
          color: "white",
          backgroundColor: decidePrimaryColor,
          _hover: {
            backgroundColor: `${
              customColor ? customColor : Constants.HOVER_COLOR
            } !important`,
            ...(customColor ? { opacity: 0.8 } : undefined),
          },
        },
        variants: {
          hollow: {
            color: decidePrimaryColor,
            borderColor: decidePrimaryColor,
            backgroundColor: decideHollowColor,
            _hover: {
              backgroundColor: decideHollowColor,
            },
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        height={"100vh"}
        mx={{ base: 5, md: 16, lg: 10 }}
        align="center"
        justify="center"
        css={{
          backgroundImage: useColorModeValue("gray.100", "gray.900"),
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          bg={useColorModeValue("white", "gray.700")}
          borderRadius="lg"
          width={{ base: 500 }}
          color={useColorModeValue("gray.700", "whiteAlpha.900")}
          shadow="base"
        >
          <Flex
            bg={useColorModeValue("gray.200", "gray.800")}
            p={1}
            borderTopRadius={"lg"}
            justify={"center"}
            align={"center"}
          >
            <Text mr={2}>Powered by</Text>
            <Image width={150} src={"logo.png"}></Image>
          </Flex>
          <Box
            px={8}
            py={6}
            height={{
              base: "100%",
              xs: "80vh",
              sm: "100%",
              md: "100%",
              lg: "100%",
            }}
            overflowY={"scroll"}
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default WidgetContainer;