import { useState, useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Replace with your ElevenLabs Agent ID once provided
const AGENT_ID = "REPLACE_WITH_AGENT_ID";

interface VoiceAgentProps {
  variant?: "button" | "inline" | "icon";
  className?: string;
}

const VoiceAgent = ({ variant = "button", className = "" }: VoiceAgentProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log("Connected to World Changers AI Agent"),
    onDisconnect: () => console.log("Disconnected from AI Agent"),
    onError: (error) => console.error("Voice Agent Error:", error),
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isActive = conversation.status === "connected";

  if (variant === "icon") {
    return (
      <button
        onClick={isActive ? stopConversation : startConversation}
        disabled={isConnecting}
        className={`relative flex items-center gap-2 group ${className}`}
        title={isActive ? "End AI call" : "Talk to our AI Agent"}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isActive ? "bg-destructive/10 animate-pulse" : "bg-accent/10"
        }`}>
          {isActive ? (
            <MicOff className="w-4 h-4 text-destructive" />
          ) : (
            <Phone className="w-4 h-4 text-accent" />
          )}
        </div>
        <div>
          <span className="text-xs text-muted-foreground block">
            {isActive ? "End Call" : "Talk to AI Agent"}
          </span>
          <span className="font-semibold text-sm text-foreground">
            {isActive ? (conversation.isSpeaking ? "Agent speaking..." : "Listening...") : "Call Now"}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border shadow-card"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <Mic className="w-8 h-8 text-primary" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
            </div>
            <div className="text-center">
              <p className="font-heading font-semibold text-foreground">
                {conversation.isSpeaking ? "Agent is speaking..." : "Listening to you..."}
              </p>
              <p className="text-sm text-muted-foreground mt-1">World Changers AI Receptionist</p>
            </div>
            <Button
              onClick={stopConversation}
              variant="destructive"
              size="lg"
              className="w-full"
            >
              <MicOff className="w-4 h-4 mr-2" /> End Call
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="inactive"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Button
              onClick={startConversation}
              disabled={isConnecting}
              size="lg"
              className="bg-hero-gradient text-primary-foreground hover:opacity-90 w-full"
            >
              <Phone className="w-5 h-5 mr-2" />
              {isConnecting ? "Connecting..." : "Talk to Our AI Agent"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceAgent;
