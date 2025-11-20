import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  image: z.any(),
  targetUrl: z.string().url(),
  targetType: z.string(),
  isActive: z.boolean(),
  priority: z.number(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export default function CreateBanner() {
  const [imagePreview, setImagePreview] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBanner = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/banner/all-banner",
          { signal: controller.signal }
        );
        setBanners(response.data.data || []);
        console.log(banners, "ok");
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError(err.response?.data || err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
    return () => {
      controller.abort();
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
      targetUrl: "",
      targetType: "",
      isActive: false,
      priority: null,
      startDate: "",
      endDate: "",
    },
  });

  async function onSubmit(values) {
    console.log("Final Banner Payload:", values);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("targetUrl", values.targetUrl);
      formData.append("targetType", values.targetType);
      formData.append("isActive", values.isActive);
      formData.append("priority", values.priority);
      if (values.startDate) formData.append("startDate", values.startDate);
      if (values.endDate) formData.append("endDate", values.endDate);
      formData.append("image", values.image);
      const response = await axios.post(
        "http://localhost:4000/api/v1/banner/create-banner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Final Banner Payload:", response?.data);
    } catch (err) {
      console.log("Banner create failed:", err.response?.data || err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    field.onChange(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="mt-2 w-40 h-24 object-cover rounded"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target URL */}
        <FormField
          control={form.control}
          name="targetUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter target URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Type */}
        <FormField
          control={form.control}
          name="targetType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="product / category / brand / external"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Priority"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* isActive */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 -my-8">
              <FormLabel>Is Active</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date (optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date (optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
