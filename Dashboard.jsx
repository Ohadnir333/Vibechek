import React, { useState, useEffect } from "react";
import { UserStatus } from "@/api/entities";
import { User } from "@/api/entities";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

import StatusCard from "../components/StatusCard";
import StatusSelector from "../components/StatusSelector";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ohadStatus, setOhadStatus] = useState(null);
  const [yossiStatus, setYossiStatus] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null); // 'Ohad', 'Yossi', or null
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      
      // Fetch all statuses created by this user, sort by latest
      const allStatuses = await UserStatus.filter({ user_email: user.email }, "-updated_at");
      
      // Find the most recent status for each profile
      const latestOhadStatus = allStatuses.find(s => s.profile_name === 'Ohad') || null;
      const latestYossiStatus = allStatuses.find(s => s.profile_name === 'Yossi') || null;
      
      setOhadStatus(latestOhadStatus);
      setYossiStatus(latestYossiStatus);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleStatusUpdate = async (newStatus, note) => {
    if (!currentUser || !editingProfile) return;
    
    setIsUpdating(true);
    try {
      const statusData = {
        user_id: currentUser.id,
        user_email: currentUser.email,
        user_name: currentUser.full_name,
        profile_name: editingProfile,
        status: newStatus,
        note: note,
        updated_at: new Date().toISOString()
      };

      const existingStatus = editingProfile === 'Ohad' ? ohadStatus : yossiStatus;

      if (existingStatus) {
        await UserStatus.update(existingStatus.id, statusData);
      } else {
        await UserStatus.create(statusData);
      }
      
      setEditingProfile(null);
      await loadData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setIsUpdating(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-2 text-warm-gray-600">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const currentStatusForSelector = editingProfile === 'Ohad' ? ohadStatus : yossiStatus;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="space-y-6">
        <StatusCard
          userStatus={ohadStatus}
          displayName="Ohad"
          onStatusChange={() => setEditingProfile("Ohad")}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-sage-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-sage-50 px-4 py-1 text-sm text-warm-gray-500 rounded-full">
              &
            </span>
          </div>
        </div>
        
        <StatusCard
          userStatus={yossiStatus}
          displayName="Yossi"
          onStatusChange={() => setEditingProfile("Yossi")}
        />
      </div>

      <div className="mt-8 text-center">
        <Button
          variant="outline"
          onClick={loadData}
          disabled={isLoading}
          className="border-sage-200 hover:bg-sage-50 text-warm-gray-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <StatusSelector
        isVisible={!!editingProfile}
        onSelect={handleStatusUpdate}
        onClose={() => setEditingProfile(null)}
        currentStatus={currentStatusForSelector?.status}
      />
    </div>
  );
}