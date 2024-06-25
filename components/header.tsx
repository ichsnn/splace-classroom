"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";

import {
  faBars,
  faCaretDown,
  faChevronRight,
  faFileLines,
  faGear,
  faGraduationCap,
  faHouse,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
  AvatarIcon,
  DropdownSection,
  Divider,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { User } from "@/types";
import UsageGuide from "./auth/usageGuide";

const learnMore = [
  {
    title: "Guide for Students",
    icon: faFileLines,
    link: "/guide/student",
  },
  {
    title: "Guide for Lecturers",
    icon: faFileLines,
    link: "/guide/lecturer",
  },
  {
    title: "Slides for Lecturers",
    icon: faFileLines,
    link: "/guide/slides",
  },
  {
    title: "Usage Video",
    icon: faFileLines,
    link: "/guide/video",
  },
];

export const Header = ({ toggle }: any) => {
  const { data: session } = useSession();
  const userData = session?.user as User;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <NextUINavbar
      disableAnimation
      isBordered
      maxWidth="full"
      className="bg-white"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <FontAwesomeIcon icon={faBars} onClick={toggle} className="fa-lg" />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit text-lg">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
        <UsageGuide learnMore={learnMore} guide={true} />
      </NavbarContent>

      <NavbarContent as="div" justify="end" className="flex flex-row gap-4">
        {/* <ThemeSwitch /> */}
        <Button variant="light" href="mailto:lms@email.com">
          <span className="font-bold">Contact LMS:</span> lms@email.com
        </Button>
        <Divider orientation="vertical" className="h-8 mr-2" />
        {session == null ? (
          <NavbarItem className="flex gap-3">
            <Button
              as={Link}
              href="/auth/login"
              variant="flat"
              radius="sm"
              className="bg-dark-blue text-white font-bold"
            >
              Login
            </Button>
          </NavbarItem>
        ) : (
          <Dropdown
            radius="sm"
            backdrop={"blur"}
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: "p-0 border-small border-divider bg-background",
            }}
          >
            <DropdownTrigger>
              <div className="flex flex-row justify-center items-center gap-3">
                <Avatar
                  isBordered
                  as="button"
                  color="primary"
                  size="sm"
                  icon={<AvatarIcon />}
                  classNames={{
                    base: "bg-gradient-to-br from-[#00acdf] to-[#7879FF]",
                    icon: "text-black/80",
                  }}
                />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Custom item styles"
              disabledKeys={["profile"]}
              className="p-3"
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem
                  isReadOnly
                  key="profile"
                  className="opacity-100 h-14 gap-2"
                >
                  <p className="text-xs">Signed in as</p>
                  <p className="font-semibold">{userData?.username}</p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  startContent={<FontAwesomeIcon icon={faHouse} />}
                >
                  Dashboard
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Preferences" showDivider>
                <DropdownItem
                  key="Profile"
                  startContent={<FontAwesomeIcon icon={faUser} />}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="grades"
                  startContent={<FontAwesomeIcon icon={faGraduationCap} />}
                >
                  Grades
                </DropdownItem>
                <DropdownItem
                  key="preference"
                  startContent={<FontAwesomeIcon icon={faGear} />}
                >
                  Preference
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Log Out">
                <DropdownItem
                  key="delete"
                  className="text-white bg-danger h-10"
                  color="danger"
                  startContent={
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="rotate-180"
                    />
                  }
                  onClick={handleSignOut}
                >
                  Logout
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
