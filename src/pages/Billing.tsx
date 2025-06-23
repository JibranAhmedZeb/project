import React from 'react';
import { CreditCard, Download, Calendar, TrendingUp } from 'lucide-react';

const Billing: React.FC = () => {
  const invoices = [
    { id: 'INV-001', date: '2025-01-15', amount: '$29.00', status: 'Paid' },
    { id: 'INV-002', date: '2024-12-15', amount: '$29.00', status: 'Paid' },
    { id: 'INV-003', date: '2024-11-15', amount: '$29.00', status: 'Paid' },
  ];

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Billing & <span className="gradient-text">Usage</span>
          </h1>
          <p className="text-xl text-gray-300">
            Manage your subscription and view usage statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <CreditCard className="w-6 h-6 text-primary-400" />
                <span>Current Plan</span>
              </h2>
              
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Free Plan</h3>
                    <p className="text-gray-400">Perfect for getting started</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$0</div>
                    <div className="text-gray-400">per month</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Credits per month</span>
                    <span className="text-white">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">API access</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Basic support</span>
                    <span className="text-green-400">✓</span>
                  </div>
                </div>
                
                <button className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* Invoices */}
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Invoice History</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-gray-300">Invoice</th>
                      <th className="text-left py-3 text-gray-300">Date</th>
                      <th className="text-left py-3 text-gray-300">Amount</th>
                      <th className="text-left py-3 text-gray-300">Status</th>
                      <th className="text-left py-3 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-800">
                        <td className="py-4 text-white font-medium">{invoice.id}</td>
                        <td className="py-4 text-gray-300">{invoice.date}</td>
                        <td className="py-4 text-white">{invoice.amount}</td>
                        <td className="py-4">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-primary-400 hover:text-primary-300 flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-secondary-400" />
                <span>This Month</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Credits Used</span>
                    <span className="text-white">25 / 100</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">API Requests</span>
                    <span className="text-white">147</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-green-400">98.6%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-accent-400" />
                <span>Next Billing</span>
              </h3>
              
              <div className="text-center">
                <p className="text-gray-400 mb-2">Your plan renews on</p>
                <p className="text-2xl font-bold text-white">Free Forever</p>
                <p className="text-gray-400 text-sm mt-2">No billing required</p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
              <div className="text-center py-4">
                <CreditCard className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No payment method on file</p>
                <button className="gradient-bg text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;