import BankInfo from "@/components/modules/BankInfo";
import PersonalInfo from "@/components/modules/PersonalInfo";
import UserInfo from "@/components/modules/UserInfo";

function Page() {
  return (
    <div>
      <UserInfo />
      <PersonalInfo />
      <BankInfo />
    </div>
  );
}

export default Page;
