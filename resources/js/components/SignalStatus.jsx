import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export default function SignalStatus() {
    const [latency, setLatency] = useState(80);
    const [status, setStatus] = useState('Kuat');

    useEffect(() => {
        // Simulate network monitoring
        const interval = setInterval(() => {
            const newLatency = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
            setLatency(newLatency);
            
            if (newLatency < 100) setStatus('Kuat');
            else if (newLatency < 200) setStatus('Sedang');
            else setStatus('Lemah');
        }, 8000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#333333] text-white rounded-full text-xs font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-default select-none border border-white/5">
            <div className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors duration-500",
                status === 'Kuat' ? 'bg-[#10b981] shadow-[0_0_8px_#10b981]' : 
                status === 'Sedang' ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 
                'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
            )} />
            <span className="tracking-tight whitespace-nowrap">
                Sinyal: <span className={cn(
                    status === 'Kuat' ? 'text-emerald-400' : 
                    status === 'Sedang' ? 'text-amber-400' : 
                    'text-rose-400'
                )}>{status}</span> ({latency}ms)
            </span>
        </div>
    );
}
