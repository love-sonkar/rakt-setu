import React from 'react';
import { MapPin, Navigation, Plus, Minus, User, Building2 } from 'lucide-react';

interface MapMarker {
  id: string;
  type: 'donor' | 'hospital' | 'request';
  lat: number; // For simulation, these can be % relative to container
  lng: number;
  label: string;
  subLabel?: string;
  color?: string;
}

interface MapViewProps {
  markers?: MapMarker[];
  centerLabel?: string;
  interactive?: boolean;
  onLocationSelect?: (location: string) => void;
  height?: string;
}

const MapView: React.FC<MapViewProps> = ({ 
  markers = [], 
  centerLabel = "Central Raipur", 
  interactive = false,
  onLocationSelect,
  height = "h-96" 
}) => {
  return (
    <div className={`relative w-full ${height} bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group`}>
      {/* Map Background Pattern (Simulating Streets) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* River Simulation */}
      <div className="absolute top-0 right-1/4 w-24 h-full bg-blue-200/20 skew-x-12 blur-xl pointer-events-none"></div>

      {/* Controls */}
      <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-20">
        <button className="p-2 bg-white rounded-lg shadow-md text-slate-600 hover:bg-slate-50 border border-slate-200" title="Zoom In">
          <Plus className="w-4 h-4" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-md text-slate-600 hover:bg-slate-50 border border-slate-200" title="Zoom Out">
          <Minus className="w-4 h-4" />
        </button>
        <button 
          className="p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 border border-blue-700"
          title="Recenter"
          onClick={() => onLocationSelect && onLocationSelect(centerLabel)}
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Markers */}
      {markers.map((marker) => (
        <div 
          key={marker.id}
          className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer hover:z-50 transition-all duration-300 hover:scale-110 group/marker"
          style={{ left: `${marker.lng}%`, top: `${marker.lat}%` }}
        >
          <div className="relative flex flex-col items-center">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover/marker:opacity-100 transition-opacity bg-slate-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50 pointer-events-none">
              <div className="font-bold">{marker.label}</div>
              {marker.subLabel && <div className="text-slate-300 text-[10px]">{marker.subLabel}</div>}
            </div>
            
            {/* Pin Icon */}
            <div className={`p-2 rounded-full shadow-lg border-2 border-white ${marker.color || 'bg-red-500 text-white'}`}>
               {marker.type === 'donor' && <User className="w-4 h-4" />}
               {marker.type === 'hospital' && <Building2 className="w-4 h-4" />}
               {marker.type === 'request' && <MapPin className="w-4 h-4" />}
            </div>
            {/* Pulse Effect */}
            <div className={`absolute w-full h-full rounded-full animate-ping opacity-20 ${marker.color ? marker.color.replace('text-', 'bg-') : 'bg-red-500'}`}></div>
            {/* Stem */}
            <div className="w-0.5 h-3 bg-slate-400/50 mt-[-2px]"></div>
            <div className="w-4 h-1 bg-black/20 blur-sm rounded-full"></div>
          </div>
        </div>
      ))}

      {/* Center Label/Watermark */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-500 pointer-events-none border border-slate-200">
        Map data © RaktSetu 2024
      </div>
      
      {interactive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900/10 p-4 rounded-full">
            <MapPin className="w-8 h-8 text-slate-900/50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;