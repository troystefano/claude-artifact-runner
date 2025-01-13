import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const monthlyData = [
  // Monthly data from analysis
  {"month":"Jan 2025","pm":608.33,"ui":1042.59,"fse":5246.02,"bse":6788.01,"caie":15024.71,"consData":166.67,"consSecur":166.67,"consGraph":54.00,"total":29097.00},
  {"month":"Feb 2025","pm":470.83,"ui":857.51,"fse":4963.10,"bse":4898.87,"caie":9653.38,"consData":166.67,"consSecur":166.67,"consGraph":54.00,"total":21231.03},
  {"month":"Mar 2025","pm":434.58,"ui":736.37,"fse":4945.61,"bse":10260.27,"caie":8807.96,"consData":166.67,"consSecur":166.67,"consGraph":64.20,"total":25582.33},
  {"month":"Apr 2025","pm":334.58,"ui":887.80,"fse":7129.24,"bse":8878.15,"caie":7732.35,"consData":133.33,"consSecur":166.67,"consGraph":82.20,"total":25344.32},
  {"month":"May 2025","pm":274.58,"ui":314.07,"fse":3219.03,"bse":1948.98,"caie":5387.72,"consData":133.33,"consSecur":166.67,"consGraph":18.00,"total":11462.37},
  {"month":"Jun 2025","pm":274.58,"ui":28.04,"fse":665.77,"bse":2171.55,"caie":7364.71,"consData":133.33,"consSecur":166.67,"consGraph":0,"total":10804.65},
  {"month":"Jul 2025","pm":274.58,"ui":28.04,"fse":494.30,"bse":1613.87,"caie":7274.96,"consData":0,"consSecur":166.67,"consGraph":0,"total":9852.42},
  {"month":"Aug 2025","pm":274.58,"ui":28.04,"fse":189.78,"bse":734.83,"caie":2293.57,"consData":0,"consSecur":166.67,"consGraph":0,"total":3687.47},
  {"month":"Sep 2025","pm":270.83,"ui":28.04,"fse":185.92,"bse":421.83,"caie":1208.54,"consData":0,"consSecur":166.67,"consGraph":0,"total":2281.82},
  {"month":"Oct 2025","pm":270.83,"ui":28.04,"fse":185.92,"bse":421.83,"caie":1208.54,"consData":0,"consSecur":166.67,"consGraph":0,"total":2281.82},
  {"month":"Nov 2025","pm":270.83,"ui":28.04,"fse":185.92,"bse":421.83,"caie":1208.54,"consData":0,"consSecur":166.67,"consGraph":0,"total":2281.82},
  {"month":"Dec 2025","pm":270.83,"ui":28.04,"fse":185.92,"bse":421.83,"caie":1208.54,"consData":0,"consSecur":166.67,"consGraph":0,"total":2281.82}
];

const totalsByRole = {
  "pm": 4380,
  "ui": 4536.02,
  "fse": 30348.57,
  "bse": 45761.13,
  "caie": 91016.58,
  "consData": 1180,
  "consSecur": 2000,
  "consGraph": 272.4
};

const COLORS = [
  '#2563eb', // blue-600
  '#db2777', // pink-600
  '#16a34a', // green-600
  '#ca8a04', // yellow-600
  '#9333ea', // purple-600
  '#dc2626', // red-600
  '#0891b2', // cyan-600
  '#c2410c'  // orange-600
];

const roleNames = {
  pm: 'Project Manager',
  ui: 'UX/UI Designer',
  fse: 'Frontend Engineer',
  bse: 'Backend Engineer',
  caie: 'Chief AI Engineer',
  consData: 'Data Consultant',
  consSecur: 'Security Consultant',
  consGraph: 'Graphics Consultant'
};

const BudgetDashboard = () => {
  const totalBudget = Object.values(totalsByRole).reduce((a, b) => a + b, 0);
  const pieData = Object.entries(totalsByRole).map(([key, value]) => ({
    name: roleNames[key],
    value: value
  }));

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} stackOffset="normal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                {Object.keys(roleNames).map((key, index) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={roleNames[key]}
                    stackId="1"
                    fill={COLORS[index]}
                    stroke={COLORS[index]}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({name, percent}) => `${name} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">Total Budget:</div>
                <div>${totalBudget.toFixed(2)}</div>
                <div className="font-semibold">Peak Monthly Spend:</div>
                <div>${Math.max(...monthlyData.map(d => d.total)).toFixed(2)}</div>
                <div className="font-semibold">Average Monthly Spend:</div>
                <div>${(totalBudget / 12).toFixed(2)}</div>
                <div className="font-semibold">Project Duration:</div>
                <div>12 months</div>
              </div>

              <div className="mt-6">
                <div className="font-semibold mb-2">Budget Breakdown by Role:</div>
                <div className="space-y-2">
                  {Object.entries(totalsByRole)
                    .sort(([,a], [,b]) => b - a)
                    .map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4">
                      <div>{roleNames[key]}:</div>
                      <div>${value.toFixed(2)} ({((value/totalBudget) * 100).toFixed(1)}%)</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetDashboard;