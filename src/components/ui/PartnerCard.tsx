/*******************************************************
 * PartnerCard.tsx
 *
 * Replace your existing PartnerCard definition with this
 * exact code. This version embeds the Spotlight directly
 * inside each PartnerCard, so a glow effect will follow
 * the mouse when hovering over any partner card.
 *******************************************************/
import React from "react";
import { ArrowRight } from "lucide-react";
// Import your existing Spotlight component. Update the path
// if your spotlight code is located elsewhere:
import { Spotlight } from "@/components/ui/spotlight";

type PartnerCardProps = {
  title: string;
  description: string;
  primary?: boolean;
};

export const PartnerCard = ({ title, description, primary }: PartnerCardProps) => {
  return (
    /* 
      "relative" & "overflow-hidden" are crucial so that the
      spotlight glow is contained within each card.
    */
    <div
      className={`relative overflow-hidden p-8 rounded-xl ${
        primary ? "bg-slate-900 text-white" : "bg-white"
      } hover:shadow-lg transition-all group border ${
        primary ? "border-slate-800" : "border-slate-200"
      }`}
    >
      {/*
        Spotlight glow effect:
        - className can override the default gradient colors:
          from-purple-800 via-purple-600 to-purple-400
        - size determines the diameter of the glow circle in px
      */}
      <Spotlight
        className="from-purple-800 via-purple-600 to-purple-400"
        size={80}
      />

      {/*
        Card content:
        - Title
        - Description
        - Link with arrow icon
      */}
      <h3
        className={`text-2xl font-semibold mb-4 ${
          primary ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mb-6 ${
          primary ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {description}
      </p>
      <a
        href="#"
        className={`flex items-center space-x-2 group ${
          primary
            ? "text-blue-300 hover:text-blue-200"
            : "text-blue-600 hover:text-blue-700"
        }`}
      >
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};
