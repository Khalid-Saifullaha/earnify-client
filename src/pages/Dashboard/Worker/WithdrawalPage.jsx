import { useState } from "react";
import WithdrawalInfo from "./WithdrawalInfo";
import WithdrawalForm from "./WithdrawalForm";

function WithdrawalPage({ email }) {
  const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);

  return (
    <div>
      <h2>Withdrawal</h2>
      <WithdrawalInfo email={email} />
      <WithdrawalForm email={email} />
    </div>
  );
}

export default WithdrawalPage;
