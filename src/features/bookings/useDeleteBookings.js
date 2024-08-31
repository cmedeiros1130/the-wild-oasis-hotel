import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation(
    deleteBookingApi,
    {
      onSuccess: () => {
        toast.success("Booking has been deleted");
        queryClient.invalidateQueries({
          queryKey: ["booking"],
        });
      },
      onError: (err) => {
        console.error(err);
        toast.error(err.message);
      },
    }
  );
  return { isDeleting, deleteBooking };
}
