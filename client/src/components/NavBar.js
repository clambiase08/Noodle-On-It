import React from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

export default function NavBar({ collections, user }) {
  const { isOpen, onToggle } = useDisclosure();
  const userCollections = collections.map((collection) => {
    return {
      label: `${collection.name}`,
      href: `/collections/${collection.id}`,
    };
  });

  const NAV_ITEMS = [
    ...(user
      ? [
          {
            label: "Your Collections",
            href: "/collections",
            children: userCollections,
          },
        ]
      : []),
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Add Recipe",
      href: user ? "/add-recipe" : "/signup",
    },
  ];

  return (
    <>
      <Box as="header" position="fixed" top={0} w="100%" zIndex={2}>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <NavLink to="/">
              <Text
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                color={useColorModeValue("orange.400", "white")}
                fontWeight={"bold"}
                fontSize={"20"}
              >
                Noodle On It
              </Text>
            </NavLink>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav navItems={NAV_ITEMS} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {user ? (
              <NavLink to="/logout">
                <Button
                  as={"a"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"orange.400"}
                  href={"#"}
                  _hover={{
                    bg: "orange.300",
                  }}
                >
                  Logout
                </Button>
              </NavLink>
            ) : (
              <>
                <NavLink to="/login">
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    verticalAlign={"bottom"}
                    fontWeight={400}
                    variant={"link"}
                    href={"#"}
                  >
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button
                    as={"a"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"orange.400"}
                    href={"#"}
                    _hover={{
                      bg: "orange.300",
                    }}
                  >
                    Sign Up
                  </Button>
                </NavLink>
              </>
            )}
          </Stack>
        </Flex>
        <Collapse in={isOpen} animateOpacity></Collapse>
      </Box>
    </>
  );
}

const DesktopNav = ({ navItems }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NavLink
                to={navItem.href ?? "#"}
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </NavLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("orange.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "orange.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"orange.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};
