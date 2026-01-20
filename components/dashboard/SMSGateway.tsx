import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Send, RefreshCw, MessageSquare, AlertCircle, CheckCircle2, Wifi, Signal, Battery } from 'lucide-react';
import { SMSMessage } from '../../types';

interface SMSGatewayProps {
  messages: SMSMessage[];
  onSimulateSMS: (content: string, sender: string) => void;
}

const SMSGateway: React.FC<SMSGatewayProps> = ({ messages, onSimulateSMS }) => {
  const [inputContent, setInputContent] = useState('');
  const [senderNumber, setSenderNumber] = useState('+9198...');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;
    onSimulateSMS(inputContent, senderNumber);
    setInputContent('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Panel: The Console/Live Feed */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-slate-600" />
            <h2 className="font-bold text-slate-800">Live SMS Gateway Stream</h2>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full border border-green-100">
              <Signal className="w-3 h-3" /> Online
            </span>
            <span className="text-slate-400">Gateway ID: CT-GSM-04</span>
          </div>
        </div>

        {/* Messages Feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Wifi className="w-12 h-12 mb-2 opacity-20" />
              <p>No messages in buffer</p>
            </div>
          )}
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'Outgoing' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm border ${
                msg.type === 'Outgoing' 
                  ? 'bg-blue-600 text-white border-blue-600 rounded-br-none' 
                  : 'bg-white text-slate-800 border-slate-200 rounded-bl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1 opacity-80 text-xs">
                  <span className="font-mono">{msg.sender}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="font-mono text-sm leading-relaxed">{msg.content}</div>
                {msg.status === 'Processed' && msg.type === 'Incoming' && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full w-fit">
                    <CheckCircle2 className="w-3 h-3" /> Action Taken
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Simulation Tools */}
      <div className="w-96 flex flex-col gap-6">
        {/* Simulator Card */}
        <div className="bg-slate-900 text-slate-300 rounded-xl p-6 shadow-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-6 text-white border-b border-slate-700 pb-4">
            <RefreshCw className="w-5 h-5" />
            <h3 className="font-bold">Hardware Simulator</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Simulated Sender ID</label>
              <input 
                type="text" 
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase mb-1">SMS Payload</label>
              <textarea 
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder="Ex: NEED A+ BASTAR URGENT"
                className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              />
              <p className="text-[10px] text-slate-500 mt-2">
                Supported Commands:<br/>
                - NEED [GROUP] [LOCATION] [URGENCY]<br/>
                - YES [TICKET_ID]<br/>
                - STATUS [TICKET_ID]
              </p>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Inject Message
            </button>
          </form>
        </div>

        {/* Documentation / Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Gateway Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Signal Strength</span>
              <div className="flex gap-0.5">
                <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-1 h-3 bg-slate-300 rounded-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Queue Latency</span>
              <span className="text-sm font-mono font-bold text-slate-900">24ms</span>
            </div>
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Active Handlers</span>
              <span className="text-sm font-mono font-bold text-green-600">3/3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSGateway;