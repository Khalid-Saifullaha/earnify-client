import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import MenuItem from "./MenuItem";

const BuyerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Submission"
        address="manage-submission"
      />
      <MenuItem icon={BsFillHouseAddFill} label="Add Task" address="add-task" />
      <MenuItem icon={MdHomeWork} label="My Task’s" address="my-task" />
      <MenuItem
        icon={BiSolidPurchaseTag}
        label="Purchase Coin"
        address="purchase-coin"
      />
    </>
  );
};

export default BuyerMenu;
