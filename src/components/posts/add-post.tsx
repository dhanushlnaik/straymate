import { X } from "lucide-react";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useStateStore } from "~/store";
enum Category {
  CATS = "CATS",
  DOGS = "DOGS",
  OTHERS = "OTHERS",
}
import { api } from "~/utils/api";
const pets = [Category.CATS, Category.DOGS, Category.OTHERS];
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "~/lib/firebase";
import { toast } from "sonner";

const isFileUrl = (value: string) => {
  // You can customize this logic based on how you identify a file URL
  return value.startsWith("file://");
};

const formSchema = z.object({
  potid: z.string(),
  category: z.enum([Category.CATS, Category.DOGS, Category.OTHERS]),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  address: z.string(),
});

export default function AddPost() {
  const { data: session } = useSession();
  const user = session?.user;
  const { addEventOpen } = useStateStore();
  const setAddEventOpen = useStateStore((state) => state.setAddEventOpen);

  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const trackingid:string = uuidv4();

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const imageRef = ref(storage, "animals/" + file.name);

    try {
      const snapshot = await uploadBytesResumable(imageRef, file);
      console.log("Uploaded", snapshot.totalBytes, "bytes.");

      // Get download URL for the file
      const url = await getDownloadURL(snapshot.ref);
      console.log("File available at", url);

      // Return the download URL
      return url;
    } catch (error) {
      console.error("Upload failed", error);
      throw error; // Rethrow the error to handle it outside this function
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      potid: "",
      category: Category.CATS,
      name: "",
      description: "",
      image: "",
      address: "",
    },
  });

  const postDa = api.post.postanimal.useMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (image) {
        setUploading(true);

        // Upload image to Firebase Storage and get the download URL
        const imageUrl = await uploadImageToStorage(image);
        form.setValue("image", imageUrl);

        console.log(form.getValues());
        toast("Image Updated", {
          description: `${values.name} entry created in the database.`,
        });

      }

      postDa.mutate({
        name: values.name,
        category: values.category,
        description: values.description,
        image: values.image,
        address: values.address,
        potid : trackingid
      });
          
      console.log("Form submitted successfully", values);

      console.log("Done", values);
      
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {user && (
        <>
          <span
            className={`flex w-fit cursor-pointer items-center justify-center space-x-4 rounded-full bg-black p-4 text-lg text-white sm:text-xl md:px-4 md:py-2 md:text-2xl`}
            onClick={() => {
              setAddEventOpen();
            }}
          >
            <Plus /> <span className="hidden md:block">Add Post</span>
          </span>

          {addEventOpen && (
            <div className="fixed inset-0 z-50 bg-black/80">
              <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border bg-white p-4">
                <span
                  className="text-lightGray border-darkGray absolute right-4 top-4 cursor-pointer rounded-md p-[0.1rem] duration-300 hover:border"
                  onClick={() => {
                    setAddEventOpen();
                  }}
                >
                  <X />
                </span>
                <div className="flex flex-col gap-6">
                  <div style={{ padding: "20px" }}>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Name"
                                  {...field}
                                  style={{ padding: "10px" }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us a little bit about yourself"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  style={{ padding: "10px", fontSize: "16px" }}
                                >
                                  <option value="" disabled>
                                    Select Pet
                                  </option>
                                  {pets.map((place) => (
                                    <option key={place} value={place}>
                                      {place}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

<FormField
              control={form.control}
              name="image" // Update the name attribute to match the form schema
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              style={{ padding: "10px" }}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Submit"}
            </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
