import { CustomDropdown } from "@/components/common/CustomDropdown";
import { CustomNavigation } from "@/components/common/CustomNavigation";
export default function Home() {
  const menuItems = [
    {
      label: "Item 1",
    },
    {
      label: "Item 2",
    },
  ];

  return (
    <div className="p-4 space-x-4">
      <CustomNavigation />
      <CustomDropdown
        triggerLabel="Open Menu"
        items={menuItems}
        variant="default"
      />
      <CustomDropdown
        triggerLabel="Destructive Menu"
        items={menuItems}
        variant="destructive"
      />
    </div>
  );
}
