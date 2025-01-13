import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Shield, Brain, Wrench } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, features }) => (
  <Card className="bg-white shadow-lg h-full">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const ServicesShowcase = () => {
  const services = [
    {
      icon: Cloud,
      title: "Infrastructure",
      features: [
        "Cloud Hosting",
        "Content Delivery Network",
        "Auto-scaling",
        "Load Balancing",
      ],
    },
    {
      icon: Shield,
      title: "Security",
      features: [
        "End-to-end Encryption",
        "Automatic Updates",
        "Compliance Management",
      ],
    },
    {
      icon: Brain,
      title: "AI Management",
      features: [
        "Best-Model Selection",
        "Usage Optimization",
        "Performance Tracking",
      ],
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      features: [
        "System Maintenance",
        "Performance Tuning",
        "24/7 Tech Support",
      ],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Included Services at a Glance
        </h2>
        <p className="text-lg text-gray-600">
          Comprehensive solutions to power your success
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesShowcase;
