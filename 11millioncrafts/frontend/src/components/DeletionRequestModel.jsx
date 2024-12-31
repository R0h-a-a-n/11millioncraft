import React, { useState } from "react";

const DeletionRequestModal = ({ isOpen, onClose, onSubmit, skuCode }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reason);
    setReason("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-transparent to-slate-50 p-8 rounded-xl  max-w-md w-full mx-4 space-y-6 border border-purple-100">
        <h2 className="text-2xl font-semibold text-white bg-clip-text">
          Request Product Deletion
        </h2>
        <form onSubmit={handleSubmit} className="bg-transparent space-y-6">
          <div>
            <label className="block text-lg text-slate-900 font-medium text-black bold mb-2">
              Reason for deletion
            </label>
            <textarea
              className="w-full min-h-[120px] rounded-lg border-purple-200 bg-white/90 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-slate-600 to-slate-400 rounded-lg hover:from-green-600 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeletionRequestModal;
