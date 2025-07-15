import React, { useEffect, useState } from 'react'
import { 
  Mail, 
  MessageCircle, 
  CheckCircle, 
  Search, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Calendar,
  Settings,
  LogOut,
  Bell,
  Plus
} from 'lucide-react'

interface DashboardProps {
  isDarkMode: boolean
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock user data
  const mockUser = {
    email: 'user@example.com',
    user_metadata: {
      full_name: 'John Doe',
      first_name: 'John',
      avatar_url: null
    }
  }

  useEffect(() => {
    // Simulate loading user profile
    setTimeout(() => {
      setUserProfile({
        name: 'John Doe',
        email: 'user@example.com'
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleSignOut = () => {
    alert('Sign out clicked - implement your logout logic here')
  }

  const stats = [
    {
      title: 'Total Emails Sent',
      value: '12,847',
      change: '+12%',
      icon: Mail,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'WhatsApp Messages',
      value: '3,421',
      change: '+8%',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Verified Emails',
      value: '8,932',
      change: '+15%',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Leads Scraped',
      value: '2,156',
      change: '+23%',
      icon: Search,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const recentActivity = [
    {
      action: 'Email Campaign Sent',
      details: 'Newsletter to 1,234 subscribers',
      time: '2 hours ago',
      status: 'success'
    },
    {
      action: 'Lead Scraping Completed',
      details: '156 new leads from LinkedIn',
      time: '4 hours ago',
      status: 'success'
    },
    {
      action: 'Email Verification',
      details: '892 emails verified',
      time: '6 hours ago',
      status: 'success'
    },
    {
      action: 'WhatsApp Campaign',
      details: 'Promotional message to 567 contacts',
      time: '1 day ago',
      status: 'pending'
    }
  ]

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-lg ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className={`ml-2 text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Chatriox
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={mockUser?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${mockUser?.email}&background=3b82f6&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {mockUser?.user_metadata?.full_name || mockUser?.email}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome back, {mockUser?.user_metadata?.first_name || 'User'}!
          </h1>
          <p className={`text-lg mt-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Here's what's happening with your marketing campaigns today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className={`lg:col-span-2 p-6 rounded-2xl border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Mail, label: 'Send Email', color: 'from-blue-500 to-blue-600' },
                { icon: MessageCircle, label: 'WhatsApp', color: 'from-green-500 to-green-600' },
                { icon: CheckCircle, label: 'Verify Emails', color: 'from-purple-500 to-purple-600' },
                { icon: Search, label: 'Scrape Leads', color: 'from-orange-500 to-orange-600' }
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => alert(`${action.label} clicked - implement your logic here`)}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 text-center ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700' 
                      : 'bg-white/50 border-gray-200 hover:bg-white hover:shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' 
                      ? 'bg-green-500' 
                      : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {activity.action}
                    </p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {activity.details}
                    </p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Campaign Performance
            </h2>
            <button 
              onClick={() => alert('View Details clicked - implement your logic here')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              View Details
            </button>
          </div>
          <div className="h-64 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <p className={`text-lg font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Chart visualization will be implemented here
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard