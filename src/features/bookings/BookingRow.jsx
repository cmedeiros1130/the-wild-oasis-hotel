import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBookings";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const [isModalOpen, setModalOpen] = useState(false);

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleOpenModal = () => {
    console.log("Opening delete modal for booking ID:", bookingId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing delete modal for booking ID:", bookingId);
    setModalOpen(false);
  };

  const handleDeleteBooking = async () => {
    console.log(`Attempting to delete booking: ${bookingId}`);
    try {
      await deleteBooking(bookingId); // Use mutate function directly
      console.log(`Booking ${bookingId} deleted successfully.`);
      handleCloseModal(); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See details
          </Menus.Button>
          {status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Menus.Button>
          )}
          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
            >
              Check out
            </Menus.Button>
          )}
          <Menus.Button icon={<HiTrash />} onClick={handleOpenModal}>
            Delete booking
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={handleDeleteBooking}
          />
        </Modal>
      )}
    </Table.Row>
  );
}

export default BookingRow;
