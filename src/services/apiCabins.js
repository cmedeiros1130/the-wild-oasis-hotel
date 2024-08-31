import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = newCabin.image
    ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    : null;

  const imagePath = hasImagePath
    ? newCabin.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  console.log("Image Path:", imagePath); // Log imagePath to debug

  //1. CREATE/EDIT Cabin
  let query = supabase.from("cabins");
  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  console.log("Cabin data after insert/update:", data); // Log data after insertion/updating

  //2. Upload Image (only if image is provided)

  if (hasImagePath) return data;

  if (newCabin.image && imageName) {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("cabins-images")
      .upload(imageName, newCabin.image);

    console.log("Image Upload Result:", storageData, storageError); // Log the result of image upload

    //3. Delete the cabin if there was an error uploading image
    if (storageError) {
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded. Cabin was not created"
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
