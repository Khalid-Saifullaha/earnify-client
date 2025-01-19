import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
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
      <MenuItem icon={FaTasks} label="My Task’s" address="my-task" />
      <MenuItem
        icon={BiSolidPurchaseTag}
        label="Purchase Coin"
        address="purchase-coin"
      />
      <MenuItem
        icon={BsClockHistory}
        label="Payment History"
        address="payment-history"
      />
    </>
  );
};

export default BuyerMenu;
