  <button
    onClick={() => setActiveTab('chat')}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
      activeTab === 'chat'
        ? 'bg-white/20 text-white shadow-lg backdrop-blur-md'
        : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
    }`}
  >
    <MessageSquare className="w-5 h-5" />
    <span className="text-sm font-medium">Chat</span>
  </button>
  <button
    onClick={() => setActiveTab('files')}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
      activeTab === 'files'
        ? 'bg-white/20 text-white shadow-lg backdrop-blur-md'
        : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
    }`}
  >
    <FileText className="w-5 h-5" />
    <span className="text-sm font-medium">Files</span>
  </button>
  <button
    onClick={() => setActiveTab('settings')}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
      activeTab === 'settings'
        ? 'bg-white/20 text-white shadow-lg backdrop-blur-md'
        : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
    }`}
  >
    <Settings className="w-5 h-5" />
    <span className="text-sm font-medium">Settings</span>
  </button> 