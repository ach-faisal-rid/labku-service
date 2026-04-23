import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const EquipmentQRCodeModal = ({ isOpen, onClose, equipment }) => {
    const qrRef = useRef();
    const [copied, setCopied] = React.useState(false);

    if (!isOpen || !equipment) return null;

    const qrValue = `${window.location.origin}/laboratorium/equipment?search=${equipment.code}`;

    const downloadQRCode = () => {
        const svg = qrRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = 1000;
            canvas.height = 1000;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 1000, 1000);
            
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = `QR_${equipment.code}_${equipment.name}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
            toast.success('QR Code berhasil diunduh');
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const svg = qrRef.current.querySelector('svg').outerHTML;
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print QR Code - ${equipment.name}</title>
                    <style>
                        body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
                        .container { text-align: center; border: 2px solid #eee; padding: 40px; border-radius: 20px; }
                        svg { width: 300px; height: 300px; }
                        h1 { margin-top: 20px; font-size: 24px; }
                        p { color: #666; margin-top: 5px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        ${svg}
                        <h1>${equipment.name}</h1>
                        <p>ID: ${equipment.code}</p>
                    </div>
                    <script>
                        window.onload = () => {
                            window.print();
                            window.onafterprint = () => window.close();
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(qrValue);
        setCopied(true);
        toast.success('Link berhasil disalin');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">QR Code Equipment</h3>
                        <p className="text-xs text-gray-500">Scan untuk melihat detail alat</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center">
                    <div 
                        ref={qrRef}
                        className="p-6 bg-white rounded-3xl border-4 border-gray-50 shadow-inner mb-6 transition-transform hover:scale-105 duration-300"
                    >
                        <QRCodeSVG 
                            value={qrValue}
                            size={200}
                            level="H"
                            includeMargin={false}
                        />
                    </div>

                    <div className="text-center mb-8">
                        <h4 className="font-bold text-gray-900 text-xl">{equipment.name}</h4>
                        <code className="text-sm text-blue-600 font-mono mt-1 block px-3 py-1 bg-blue-50 rounded-full">
                            {equipment.code}
                        </code>
                    </div>

                    {/* Quick Link */}
                    <div className="w-full flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-8">
                        <input 
                            type="text" 
                            readOnly 
                            value={qrValue}
                            className="bg-transparent text-xs text-gray-500 flex-1 outline-none truncate"
                        />
                        <button 
                            onClick={handleCopy}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Salin Link"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <button
                            onClick={downloadQRCode}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
                        >
                            <Download size={18} />
                            Unduh PNG
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                        >
                            <Printer size={18} />
                            Cetak
                        </button>
                    </div>
                </div>

                {/* Footer Tip */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        Labku Management System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EquipmentQRCodeModal;
