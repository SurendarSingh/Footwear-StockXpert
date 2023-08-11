import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function ProfileDetails() {
  return (
    <div className="px-4 sm:px-0">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Full Name
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            Margot Foster
          </dd>
        </div>
      </dl>
    </div>
  );
}
