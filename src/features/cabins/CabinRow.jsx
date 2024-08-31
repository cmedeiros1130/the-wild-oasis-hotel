import styled from "styled-components";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

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

const Price = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <Stacked>
        <div>Fits up to {maxCapacity} guests</div>
      </Stacked>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Menus.Menu>
        <Menus.Toggle id={cabinId} />
        <Menus.List id={cabinId}>
          <Menus.Button
            icon={<HiArrowDownOnSquare />}
            onClick={handleDuplicate}
            disabled={isCreating}
          >
            Duplicate
          </Menus.Button>
          <Menus.Button icon={<HiTrash />} onClick={handleOpenModal}>
            Delete cabin
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ConfirmDelete
            resourceName="cabin"
            disabled={isDeleting}
            onConfirm={() => deleteCabin(cabinId)}
          />
        </Modal>
      )}
    </Table.Row>
  );
}

export default CabinRow;
