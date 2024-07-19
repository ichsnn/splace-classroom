import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSettingsStore } from "@/utils/useSettingsStore";

const UsageGuide = ({ learnMore, guide }: any) => {
  const { settings } = useSettingsStore();

  return (
    <Dropdown>
      <DropdownTrigger>
        {guide ? (
          <Button
            variant="light"
            endContent={<FontAwesomeIcon icon={faAngleDown} />}
          >
            LMS Usage Guide
          </Button>
        ) : (
          <Button className="border-white border-2 bg-transparent text-white font-semibold">
            Learn More
          </Button>
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection title="Check Module" showDivider>
          {learnMore.map((item: any, index: number) => (
            <DropdownItem
              key={index}
              startContent={<FontAwesomeIcon icon={item.icon} />}
            >
              {item.title}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection title="Need Help?">
          <DropdownItem
            startContent={<FontAwesomeIcon icon={faEnvelope} />}
            href={`mailto:${settings.contact_us[0].email}`}
          >
            {settings.contact_us[0].email}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UsageGuide;
