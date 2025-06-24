
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Leaf, Stethoscope, Wine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const statusOptions = [
  {
    value: "clear-headed",
    label: "Clear-headed",
    icon: Brain,
    emoji: "🧠",
    description: "Feeling focused and clear",
    color: "hover:bg-sage-100 border-sage-200"
  },
  {
    value: "high",
    label: "High",
    icon: Leaf,
    emoji: "🌿",
    description: "Relaxed and elevated",
    color: "hover:bg-green-100 border-green-200"
  },
  {
    value: "hyper-focused",
    label: "Hyper-focused",
    icon: Stethoscope,
    emoji: "🎯",
    description: "In the zone, working on medication",
    color: "hover:bg-blue-100 border-blue-200"
  },
  {
    value: "drunk",
    label: "Drunk",
    icon: Wine,
    emoji: "🍷",
    description: "Had a few drinks",
    color: "hover:bg-orange-100 border-orange-200"
  }
];

export default function StatusSelector({ isVisible, onSelect, onClose, currentStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || "");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (selectedStatus) {
      onSelect(selectedStatus, note.trim() || null);
      setNote("");
      setSelectedStatus("");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-20 bg-white rounded-2xl p-6 shadow-2xl z-50 max-w-sm mx-auto max-h-[75vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-warm-gray-800">How are you feeling?</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {statusOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = selectedStatus === option.value;
                
                return (
                  <motion.button
                    key={option.value}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-sage-500 bg-sage-50' 
                        : `border-gray-200 ${option.color}`
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" role="img" aria-label={option.label}>
                          {option.emoji}
                        </span>
                        <IconComponent className="w-5 h-5 text-warm-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-warm-gray-800">{option.label}</p>
                        <p className="text-sm text-warm-gray-600">{option.description}</p>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 bg-sage-500 rounded-full" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="space-y-3">
              <Label htmlFor="note" className="text-sm font-medium text-warm-gray-700">
                Add a note (optional)
              </Label>
              <Textarea
                id="note"
                placeholder="What's on your mind? (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none h-20"
                maxLength={150}
              />
              <p className="text-xs text-warm-gray-500 text-right">
                {note.length}/150 characters
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedStatus}
                className="flex-1 bg-sage-600 hover:bg-sage-700"
              >
                Update Status
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
