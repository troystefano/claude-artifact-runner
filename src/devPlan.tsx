/**************************************************************
 * COMPLETE CODE WITH Layer COMPONENT DEFINED
 *
 * The "Layer is not defined" error happens because <Layer>
 * was referenced but never actually defined (or it was
 * commented out). Below is your full code with the Layer
 * component UNCOMMENTED and everything else intact.
 *
 * Copy & paste this entire file to fix the error.
 **************************************************************/

import React from 'react';
import {
  Book,
  Server,
  Users,
  Settings,
  Database,
  Brain,
  Code,
  Layout,
  Activity,
  BarChart
} from 'lucide-react';

/****************************************************
 * Improved Arrow Aesthetics
 *
 * Arrow tips have been shortened from 8 to 6 to look
 * more refined. No other structural changes were made.
 ****************************************************/

const DirectionalArrow = ({ direction = "right" }) => (
  <div className={`flex items-center justify-center h-12 ${direction === "down" ? "my-2" : "mx-4"}`}>
    <svg
      width={direction === "down" ? "24" : "40"}
      height={direction === "down" ? "40" : "24"}
      viewBox={direction === "down" ? "0 0 24 40" : "0 0 40 24"}
      className="text-blue-400"
    >
      {direction === "down" ? (
        /* DOWN ARROW (Shortened tips from 8 to 6) */
        <path
          d="M12 0v32l-6-6m6 6l6-6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      ) : (
        /* RIGHT ARROW (Shortened tips from 8 to 6) */
        <path
          d="M0 12h32l-6-6m6 6l-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      )}
    </svg>
  </div>
);

const BidirectionalArrow = () => (
  <div className="flex items-center justify-center mx-4">
    <svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      className="text-blue-400"
    >
      <path
        d="M4 12h32
           M4 12l6-6
           M4 12l6 6
           M36 12l-6-6
           M36 12l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  </div>
);

/**************************************************************
 * Layer Component
 *
 * This was commented out previously. Uncommenting or defining
 * it resolves the "Layer is not defined" error. Adjust styling
 * as desired.
 **************************************************************/
const Layer = ({ title, children, className }) => (
  <div className={`w-full p-6 rounded-xl bg-white shadow-lg ${className}`}>
    <h2 className="text-lg font-bold text-gray-800 text-center mb-4 flex items-center justify-center gap-2">
      {title}
    </h2>
    {children}
  </div>
);

/**************************************************************
 * WorkflowBox Components
 *
 * Two variations:
 * 1) WorkflowBoxOption1 with built-in Tailwind shadow-xl
 * 2) WorkflowBoxOption2 with custom multi-directional shadow
 **************************************************************/
const WorkflowBox = ({
  title,
  subtitle,
  info,
  icon: Icon,
  className,
}) => (
  <div
    className={`
      p-4
      rounded-lg
      shadow-xl               /* Enhanced built-in Tailwind shadow */
      border border-gray-200  /* Subtle border for extra contrast */
      bg-white
      ${className}
    `}
  >
    <div className="flex items-center gap-2 mb-3">
      {Icon && <Icon size={20} className="text-blue-600" />}
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
    {info && (
      <div className="text-xs bg-blue-50 p-2 rounded-lg">
        <BarChart size={14} className="inline-block mr-1 text-blue-600" />
        <span className="text-gray-600">{info}</span>
      </div>
    )}
  </div>
);

const WorkflowBoxOption2 = ({
  title,
  subtitle,
  info,
  icon: Icon,
  className,
}) => (
  <div
    className={`
      p-4
      rounded-lg
      shadow-top-bottom       /* Custom multi-directional shadow class */
      border border-gray-200  /* Subtle border for extra contrast */
      bg-white
      ${className}
    `}
  >
    <div className="flex items-center gap-2 mb-3">
      {Icon && <Icon size={20} className="text-blue-600" />}
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
    {info && (
      <div className="text-xs bg-blue-50 p-2 rounded-lg">
        <BarChart size={14} className="inline-block mr-1 text-blue-600" />
        <span className="text-gray-600">{info}</span>
      </div>
    )}
  </div>
);

/**************************************************************
 * WorkflowVisualization Component
 *
 * Demonstrates how everything fits together. Uses <Layer> to
 * group different parts of the workflow. <DirectionalArrow>
 * and <BidirectionalArrow> show the flow between boxes.
 **************************************************************/
const WorkflowVisualization = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-4 bg-gray-50">
      {/* Foundation Layer */}
      <Layer title="Foundation Layer">
        <div className="flex items-center justify-between">
          <WorkflowBox 
            title="Catholic-Informed AI Ethics"
            subtitle="Ethical Framework & Guidelines"
            info="Integrates Catholic Social Teaching into AI frameworks"
            icon={Book}
            className="flex-1"
          />
          <DirectionalArrow />
          <WorkflowBox 
            title="Architecture & Requirements"
            subtitle="System Design & Planning"
            info="Defines system architecture and roadmap"
            icon={Settings}
            className="flex-1"
          />
        </div>
      </Layer>

      <DirectionalArrow direction="down" />

      {/* Infrastructure Layer */}
      <Layer title="Infrastructure Layer">
        <div className="flex items-center justify-between">
          <WorkflowBox 
            title="Data Infrastructure"
            subtitle="Data Engineering & Storage"
            info="Establishes data workflows and security"
            icon={Database}
            className="flex-1"
          />
          <DirectionalArrow />
          <WorkflowBox 
            title="LLM Engineering"
            subtitle="AI Integration"
            info="Implements RAG pipelines and AI features"
            icon={Brain}
            className="flex-1"
          />
          <DirectionalArrow />
          <WorkflowBox 
            title="Software Engineering"
            subtitle="Backend / APIs"
            info="Develops core platform services"
            icon={Code}
            className="flex-1"
          />
        </div>
      </Layer>

      <DirectionalArrow direction="down" />

      {/* Interface Layer */}
      <Layer title="Interface Development Layer">
        <div className="flex items-center justify-between">
          <WorkflowBox 
            title="Consumer-User Interface"
            subtitle="Public Portal"
            info="Public-facing platform features"
            icon={Layout}
            className="flex-1"
          />
          <BidirectionalArrow />
          <WorkflowBox 
            title="Admin Dashboard"
            subtitle="System Management"
            info="Centralized control center"
            icon={Server}
            className="flex-1"
          />
          <BidirectionalArrow />
          <WorkflowBox 
            title="Expert Reviewer Interface"
            subtitle="Specialized Tools"
            info="Advanced review and collaboration"
            icon={Users}
            className="flex-1"
          />
        </div>
      </Layer>

      <DirectionalArrow direction="down" />

      {/* Testing and Deployment Layer */}
      <Layer title="Testing and Deployment Layer">
        <div className="flex items-center justify-center">
          <WorkflowBox 
            title="Testing"
            subtitle="Validation & Security"
            info="Comprehensive testing and validation"
            icon={Activity}
            className="flex-1"
          />
          <DirectionalArrow />
          <WorkflowBox 
            title="Deployment & Monitoring"
            subtitle="Operations & Support"
            info="Infrastructure and system monitoring"
            icon={BarChart}
            className="flex-1"
          />
        </div>
      </Layer>
    </div>
  );
};

export default WorkflowVisualization;
