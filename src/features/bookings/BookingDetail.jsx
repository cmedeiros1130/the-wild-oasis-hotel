import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBookings";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckOut();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  // State for managing modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking(bookingId);
      handleCloseModal();
      navigate(-1);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <>
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
            <Button variation="danger" onClick={handleOpenModal}>
              Delete Booking
            </Button>
          </>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}
      </ButtonGroup>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ConfirmDelete
            resourceName="booking"
            onConfirm={handleDeleteBooking}
            disabled={isDeleting}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
}

export default BookingDetail;
