import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WorkstreamTimeline = () => {
  // Define workstreams
  const workstreams = [
    "Interface Development",
    "AI Integration",
    "Infrastructure & Security"
  ];

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>AIREN Project Workstreams</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Phase Headers */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold">Phase 1</h3>
              <p className="text-sm text-blue-800">Jan - Jun 2025</p>
            </div>
            <div className="bg-emerald-100 p-4 rounded-lg">
              <h3 className="font-semibold">Phase 2</h3>
              <p className="text-sm text-emerald-800">Jul - Dec 2025</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold">Phase 3</h3>
              <p className="text-sm text-purple-800">2026 onwards</p>
            </div>
          </div>

          {/* Workstream Lanes */}
          {workstreams.map((stream, idx) => (
            <div key={idx} className="mb-8">
              <div className="font-medium mb-2 text-gray-700">{stream}</div>
              <div className="grid grid-cols-3 gap-4">
                {/* Phase 1 */}
                <div className="relative bg-blue-50 p-4 rounded-lg min-h-[200px] border-l-4 border-blue-400">
                  {idx === 0 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Consumer UI v1</div>
                      <div className="bg-white p-2 rounded shadow-sm">Expert & Admin UI Core</div>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Model Design</div>
                      <div className="bg-white p-2 rounded shadow-sm">Initial Integration</div>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Security Framework</div>
                      <div className="bg-white p-2 rounded shadow-sm">Dev Environment</div>
                    </div>
                  )}
                </div>

                {/* Phase 2 */}
                <div className="relative bg-emerald-50 p-4 rounded-lg min-h-[200px] border-l-4 border-emerald-400">
                  {idx === 0 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Expert UI v1</div>
                      <div className="bg-white p-2 rounded shadow-sm">Admin UI v1</div>
                      <div className="bg-white p-2 rounded shadow-sm">Consumer UI 2.0</div>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Full AI Integration</div>
                      <div className="bg-white p-2 rounded shadow-sm">Performance Testing</div>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Scalability Testing</div>
                      <div className="bg-white p-2 rounded shadow-sm">Security Hardening</div>
                    </div>
                  )}
                </div>

                {/* Phase 3 */}
                <div className="relative bg-purple-50 p-4 rounded-lg min-h-[200px] border-l-4 border-purple-400">
                  {idx === 0 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Continuous UI Updates</div>
                      <div className="bg-white p-2 rounded shadow-sm">Feature Enhancements</div>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">AI Model Updates</div>
                      <div className="bg-white p-2 rounded shadow-sm">Performance Optimization</div>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded shadow-sm">Infrastructure Scaling</div>
                      <div className="bg-white p-2 rounded shadow-sm">Security Monitoring</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkstreamTimeline;