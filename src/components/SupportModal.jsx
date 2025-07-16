import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SupportModal({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation("SupportModal");
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("Average");

  const handleSubmit = () => {
    if (!summary.trim()) return;
    onSubmit({ summary, priority });
    setSummary("");
    setPriority("Average");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Dialog.Panel className="w-full max-w-lg rounded-md bg-white dark:bg-neutral-900 p-6 shadow-xl">
              <Dialog.Title className="text-xl font-semibold mb-4">
                {t("supportModal.title")}
              </Dialog.Title>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("supportModal.summary")}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2 bg-neutral-50 dark:bg-neutral-800 dark:text-white"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder={t("supportModal.summaryPlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("supportModal.priority")}
                  </label>
                  <select
                    className="w-full rounded-md border px-3 py-2 bg-neutral-50 dark:bg-neutral-800 dark:text-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">{t("priority.high")}</option>
                    <option value="Average">{t("priority.average")}</option>
                    <option value="Low">{t("priority.low")}</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-neutral-200 text-sm hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    {t("supportModal.submit")}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
