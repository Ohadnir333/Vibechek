
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Brain, Leaf, Stethoscope, Wine, MessageCircle } from "lucide-react";

const statusConfig = {
  "clear-headed": {
    icon: Brain,
    label: "Clear-headed",
    color: "bg-sage-100 text-sage-700 border-sage-200",
    bgGradient: "from-sage-50 to-sage-100",
    emoji: "🧠"
  },
  "high": {
    icon: Leaf,
    label: "High",
    color: "bg-green-100 text-green-700 border-green-200",
    bgGradient: "from-green-50 to-green-100",
    emoji: "🌿"
  },
  "hyper-focused": {
    icon: Stethoscope,
    label: "Hyper-focused",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    bgGradient: "from-blue-50 to-blue-100",
    emoji: "🎯"
  },
  "drunk": {
    icon: Wine,
    label: "Drunk",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    bgGradient: "from-orange-50 to-orange-100",
    emoji: "🍷"
  }
};

export default function StatusCard({ userStatus, displayName, onStatusChange }) {
  const config = userStatus ? statusConfig[userStatus.status] : statusConfig["clear-headed"];
  const IconComponent = config.icon;
  
  const lastUpdated = userStatus?.updated_at ? format(new Date(userStatus.updated_at), "MMM d, h:mm a") : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${config.bgGradient} rounded-2xl p-6 border-2 ${config.color.split(' ').pop()} shadow-sm`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-warm-gray-600 mb-1">{displayName}</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label={config.label}>
              {config.emoji}
            </span>
            <div>
              <p className="text-lg font-semibold text-warm-gray-800">{userStatus ? config.label : "No status yet"}</p>
              {lastUpdated && (
                <p className="text-xs text-warm-gray-500">Updated {lastUpdated}</p>
              )}
            </div>
          </div>
        </div>
        <div className={`p-2 rounded-full ${config.color}`}>
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {userStatus?.note && (
        <div className="mb-4 p-3 bg-white/60 rounded-lg border border-white/20">
          <div className="flex items-start gap-2">
            <MessageCircle className="w-4 h-4 text-warm-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-warm-gray-700 italic">"{userStatus.note}"</p>
          </div>
        </div>
      )}

      {onStatusChange && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onStatusChange}
          className="w-full mt-4 py-3 px-4 bg-white/80 hover:bg-white text-warm-gray-700 font-medium rounded-xl border border-sage-200 hover:border-sage-300 transition-all"
        >
          Change Status
        </motion.button>
      )}
    </motion.div>
  );
}
