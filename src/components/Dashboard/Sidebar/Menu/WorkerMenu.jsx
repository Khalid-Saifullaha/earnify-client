import { BsFingerprint } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import MenuItem from "./MenuItem";

const WorkerMenu = () => {
  return (
    <>
      <MenuItem icon={IoHome} label="My Home" address="my-home" />
      <MenuItem
        icon={BsFingerprint}
        label="My Submission"
        address="my-submission"
      />
      <MenuItem icon={CiBoxList} label="Task List" address="task-list" />
      <MenuItem icon={CiBoxList} label="Withdraw" address="WithdrawalInfo" />
    </>
  );
};

export default WorkerMenu;
