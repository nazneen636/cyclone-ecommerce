import axios from "axios";
import React, { useEffect, useState } from "react";

const AllBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchBanner = async () => {
      try {
        setLoading(true);
        const response = await api.get("/banner/all-banner", {
          signal: controller.signal,
        });
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

  return (
    <div>
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input
                    id="table-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                  />
                  <label for="table-checkbox" class="sr-only">
                    Table checkbox
                  </label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                image
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Products Name
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Description
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Url
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                TargetType
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Priority
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                StartDate
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                EndDate
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                isActive
              </th>
              <th scope="col" class="px-6 py-3  font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((item) => (
              <tr
                key={item.id}
                class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
              >
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="table-checkbox-2"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                    />
                    <label for="table-checkbox-2" class="sr-only">
                      Table checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {item.title}
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">Yes</td>
                <td class="px-6 py-4">Yes</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">3.0 lb.</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">3.0 lb.</td>
                <td class="flex items-center px-6 py-4">
                  <a href="#" class="font-medium text-fg-brand hover:underline">
                    Edit
                  </a>
                  <a
                    href="#"
                    class="font-medium text-danger hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBanner;
