
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { UserStatus } from "@/api/entities";
import { motion } from "framer-motion";
import { LogOut, Heart, Clock, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
      
      const history = await UserStatus.filter(
        { user_email: user.email },
        "-updated_at",
        10
      );
      setStatusHistory(history);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await User.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const statusEmojis = {
    "clear-headed": "🧠",
    "high": "🌿",
    "hyper-focused": "🎯",
    "drunk": "🍷"
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-warm-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-sage-200">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-sage-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">{currentUser?.full_name?.[0] || "?"}</span>
            </div>
            <CardTitle className="text-xl text-warm-gray-800">
              {currentUser?.full_name || "User"}
            </CardTitle>
            <p className="text-sm text-warm-gray-600">{currentUser?.email}</p>
          </CardHeader>
        </Card>

        {/* Recent Status History */}
        <Card className="bg-white/80 backdrop-blur-sm border-sage-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warm-gray-800">
              <Clock className="w-5 h-5" />
              Recent Status Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statusHistory.length > 0 ? (
              <div className="space-y-3">
                {statusHistory.slice(0, 5).map((status, index) => (
                  <motion.div
                    key={status.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {statusEmojis[status.status]}
                      </span>
                      <div>
                        <p className="font-medium text-warm-gray-800 capitalize">
                          {status.status.replace('-', ' ')}
                        </p>
                        <p className="text-xs text-warm-gray-500">
                          {format(new Date(status.updated_at), "MMM d, h:mm a")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-warm-gray-500 text-center py-4">
                No status updates yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-sage-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warm-gray-800">
              <Brain className="w-5 h-5" />
              About VibeCheck
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warm-gray-600 text-sm leading-relaxed">
              Because explaining your mental state is exhausting. This app lets you and your friend say "I'm cooked," "I'm laser-focused," or "I had one too many" — without typing a single word. Just tap your vibe and go. It's like mood telepathy, but with buttons. Finally, emotional intelligence for the lazy.
            </p>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
}
