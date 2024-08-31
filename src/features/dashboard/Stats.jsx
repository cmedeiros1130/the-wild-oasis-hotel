import {
  BanknotesIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numbDays, cabinsCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numbDays * cabinsCount);
  console.log(confirmedStays);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<BriefcaseIcon />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<BanknotesIcon />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<CalendarDaysIcon />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<ChartBarIcon />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
