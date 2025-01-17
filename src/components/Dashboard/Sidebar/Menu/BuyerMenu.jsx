import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const BuyerMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label="Add Task" address="add-task" />
      <MenuItem icon={MdHomeWork} label="My Task’s" address="my-task" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      />
    </>
  );
};

export default BuyerMenu;
