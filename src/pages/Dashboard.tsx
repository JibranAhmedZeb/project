import React from 'react';
import { BarChart3, TrendingUp, Zap, Clock, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useRequests } from '../hooks/useRequests';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { requests } = useRequests();

  const stats = [
    {
      title: 'Total Requests',
      value: requests.length.toString(),
      change: '+12%',
      icon: BarChart3,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/10',
    },
    {
      title: 'Credits Used',
      value: '247',
      change: '+8%',
      icon: Zap,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-500/10',
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '+2%',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-15%',
      icon: Clock,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10',
    },
  ];

  const recentRequests = requests.slice(0, 5);

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, <span className="gradient-text">{user?.email?.split('@')[0]}</span>
          </h1>
          <p className="text-xl text-gray-300">
            Here's what's happening with your AI requests today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="glass-effect rounded-2xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recent Requests</h3>
            <div className="space-y-4">
              {recentRequests.length > 0 ? (
                recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                    <div className="flex-1">
                      <p className="text-white font-medium truncate">
                        {request.input_text.substring(0, 50)}...
                      </p>
                      <p className="text-gray-400 text-sm">{request.engine}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : request.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {request.status}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(request.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No requests yet. Start by using the playground!</p>
                </div>
              )}
            </div>
          </div>

          {/* Usage Chart Placeholder */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Usage Over Time</h3>
            <div className="h-64 bg-dark-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Chart visualization coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 glass-effect rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-primary-500/20 border border-primary-500/30 rounded-lg text-primary-300 hover:bg-primary-500/30 transition-colors">
              <Zap className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">New Request</span>
            </button>
            <button className="p-4 bg-secondary-500/20 border border-secondary-500/30 rounded-lg text-secondary-300 hover:bg-secondary-500/30 transition-colors">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">View Workflows</span>
            </button>
            <button className="p-4 bg-accent-500/20 border border-accent-500/30 rounded-lg text-accent-300 hover:bg-accent-500/30 transition-colors">
              <DollarSign className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">Upgrade Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;