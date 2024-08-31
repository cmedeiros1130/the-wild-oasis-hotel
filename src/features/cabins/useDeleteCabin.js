import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation(
    deleteCabinApi,
    {
      onSuccess: () => {
        toast.success("Cabin has been deleted");
        queryClient.invalidateQueries({
          queryKey: ["cabins"], // Ensure this matches your query key for fetching cabins
        });
      },
      onError: (err) => {
        console.error(err);
        toast.error(
          err.message || "An error occurred while deleting the cabin"
        ); // Ensure error messages are properly handled and shown
      },
    }
  );
  return { isDeleting, deleteCabin };
}
