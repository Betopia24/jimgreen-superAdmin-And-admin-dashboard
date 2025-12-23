"use client";
import React, { useState } from "react";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? "bg-primary" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const SettingsPage: React.FC = () => {
  const [platformName, setPlatformName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [welcomeEmail, setWelcomeEmail] = useState(true);
  const [reportNotifications, setReportNotifications] = useState(true);
  const [paymentConfirmations, setPaymentConfirmations] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure platform settings and preferences
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <span className="text-xl">+</span>
            <span>Add New Plan</span>
          </button>
        </div>

        {/* Platform Configuration Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Platform Configuration
            </h2>
            <p className="text-sm text-gray-500">
              Basic platform settings and configuration
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Platform Name
              </label>
              <input
                type="text"
                placeholder="ChemLab Analytics"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Support Email
              </label>
              <input
                type="text"
                placeholder="ChemLab Analytics"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Email Templates Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Email Templates
            </h2>
            <p className="text-sm text-gray-500">
              Configure automated email notifications
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-medium text-gray-900">Welcome Email</h3>
                <p className="text-sm text-gray-500">
                  Send welcome email to new users
                </p>
              </div>
              <Toggle enabled={welcomeEmail} onChange={setWelcomeEmail} />
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-medium text-gray-900">
                  Report Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Email notifications for new reports
                </p>
              </div>
              <Toggle
                enabled={reportNotifications}
                onChange={setReportNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Payment Confirmations
                </h3>
                <p className="text-sm text-gray-500">
                  Email receipts for payments
                </p>
              </div>
              <Toggle
                enabled={paymentConfirmations}
                onChange={setPaymentConfirmations}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Notification Settings
            </h2>
            <p className="text-sm text-gray-500">
              Manage system notifications and alerts
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-medium text-gray-900">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <Toggle
                enabled={emailNotifications}
                onChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-medium text-gray-900">System Alerts</h3>
                <p className="text-sm text-gray-500">
                  Critical system alerts and errors
                </p>
              </div>
              <Toggle enabled={systemAlerts} onChange={setSystemAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Weekly Reports</h3>
                <p className="text-sm text-gray-500">Weekly summary reports</p>
              </div>
              <Toggle enabled={weeklyReports} onChange={setWeeklyReports} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
