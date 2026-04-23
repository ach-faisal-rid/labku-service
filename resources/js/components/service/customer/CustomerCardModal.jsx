import React from 'react';
import { X, Printer, User, Shield, Calendar, MapPin, Building } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const CustomerCardModal = ({ isOpen, onClose, customer }) => {
    if (!isOpen || !customer) return null;

    const handlePrint = () => {
        window.print();
    };

    const membershipColors = {
        Bronze: 'from-orange-400 to-orange-600',
        Silver: 'from-gray-400 to-gray-600',
        Gold: 'from-yellow-400 to-yellow-600',
        Platinum: 'from-blue-400 to-blue-600'
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Kartu Digital Pelanggan
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Card Preview Area */}
                <div className="p-8 bg-gray-50 flex justify-center overflow-hidden">
                    <div id="printable-card" className={`relative w-[400px] h-[240px] rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${membershipColors[customer.membership_status || 'Bronze']} p-6 text-white`}>
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

                        <div className="relative h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold tracking-widest uppercase">Labku Service</span>
                                        <span className="text-[10px] opacity-80 uppercase tracking-tighter">Professional Service Center</span>
                                    </div>
                                </div>
                                <div className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md border border-white/30 text-[10px] font-bold uppercase tracking-widest">
                                    {customer.membership_status || 'Bronze'} Member
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold tracking-tight leading-none uppercase">{customer.name}</h4>
                                    <p className="text-[10px] opacity-90 flex items-center gap-1">
                                        <MapPin size={10} /> {customer.address ? customer.address.substring(0, 30) + '...' : 'No Address'}
                                    </p>
                                    <div className="pt-2">
                                        <p className="text-[10px] opacity-70 uppercase font-bold tracking-widest">Customer ID</p>
                                        <p className="text-sm font-mono tracking-widest">{customer.customer_code}</p>
                                    </div>
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-inner">
                                    <QRCodeSVG value={customer.customer_code} size={60} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-white border-t border-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        <Printer size={18} />
                        Cetak Kartu
                    </button>
                </div>
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-card, #printable-card * {
                        visibility: visible;
                    }
                    #printable-card {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        box-shadow: none !important;
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>
        </div>
    );
};

export default CustomerCardModal;
