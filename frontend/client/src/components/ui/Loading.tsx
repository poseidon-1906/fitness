"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#020617]">
      {/* 1. Ambient Background Glows */}
      <div className="absolute h-64 w-64 rounded-full bg-green-500/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* 2. The Modernized Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer Ring Decoration */}
          <div className="absolute h-16 w-16 rounded-full border-2 border-dashed border-green-600/20 animate-[spin_10s_linear_infinite]" />
          
          {/* Main Icon with Motion */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="h-10 w-10 animate-spin text-green-600" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* 3. Subtle Typography & Progress indicator */}
        <div className="space-y-2 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium tracking-tight text-slate-900 dark:text-slate-100"
          >
            Setting things up
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-slate-500 dark:text-slate-400"
          >
            Optimizing your dashboard...
          </motion.p>
        </div>
      </div>

      {/* 4. Bottom Branding/Status (Optional) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-12 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600"
      >
        Secure Connection Active
      </motion.div>
    </div>
  );
};

export default Loading;