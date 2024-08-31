import ButtonIcon from "../../ui/ButtonIcon";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useLogout } from "../cabins/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <ArrowRightOnRectangleIcon /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
