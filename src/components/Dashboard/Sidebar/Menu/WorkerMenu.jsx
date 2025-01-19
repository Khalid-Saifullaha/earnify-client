import { BsFingerprint } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import MenuItem from "./MenuItem";

const WorkerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Submission"
        address="my-submission"
      />
      <MenuItem icon={CiBoxList} label="Task List" address="task-list" />
    </>
  );
};

export default WorkerMenu;
