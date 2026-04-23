import React from 'react';
import { createPortal } from 'react-dom';
import { usePage } from '@inertiajs/react';

const ServiceReceipt = React.forwardRef(({ device }, ref) => {
    const { settings = {} } = usePage().props;
    
    if (!device) return null;

    const totalCost = (parseFloat(device.estimated_cost) || 0) + (device.has_warranty ? (parseFloat(device.warranty_cost) || 0) : 0);
    
    // Dynamic settings from database
    const storeName = settings.store_name || 'LABKU';
    const storeAddress = settings.store_address || 'Jl. Perintis Kemerdekaan No. 123';
    const storePhone = settings.store_phone || '0812-3456-7890';
    const storeEmail = settings.store_email || 'service@labku.id';
    const receiptWidth = settings.receipt_width || '80'; // 58 or 80
    const receiptFooter = settings.receipt_footer || 'Kepuasan Anda Prioritas Kami';

    const content = (
        <div ref={ref} className={`service-receipt-portal-container width-${receiptWidth}`}>
            <div className="receipt-paper">
                {/* Header */}
                <div className="receipt-header">
                    <div className="brand-logo">
                        <span className="brand-name">{storeName}</span>
                        <span className="brand-tagline">PROFESSIONAL SERVICE CENTER</span>
                    </div>
                    <div className="store-info">
                        <p className="address">{storeAddress}</p>
                        <p className="contact">WhatsApp: {storePhone}</p>
                        {storeEmail && <p className="email">{storeEmail}</p>}
                    </div>
                </div>

                <div className="divider-dashed" />

                {/* Ticket Info */}
                <div className="receipt-row ticket-info">
                    <div className="col">
                        <span className="label">NO. SERVICE</span>
                        <span className="value tracking-tight">#SVC-{device.id.toString().padStart(5, '0')}</span>
                    </div>
                    <div className="col items-end">
                        <span className="label">TANGGAL</span>
                        <span className="value">{new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                </div>

                <div className="divider-solid" />

                {/* Customer Details */}
                <div className="receipt-section">
                    <div className="section-title">PELANGGAN</div>
                    <div className="customer-card">
                        <span className="customer-name">{device.customer?.name || 'UMUM'}</span>
                        <span className="customer-phone">{device.customer?.phone || '-'}</span>
                    </div>
                </div>

                {/* Device Details */}
                <div className="receipt-section device-box bg-gray-50 border border-gray-200">
                    <div className="section-title">DETAIL PERANGKAT</div>
                    <div className="device-info">
                        <span className="device-model uppercase">{device.brand} {device.model}</span>
                        <div className="divider-thin" />
                        <div className="complaint-box">
                            <span className="label-inline">KELUHAN:</span>
                            <p className="complaint-text italic text-gray-700">"{device.complaint || 'Cek unit keseluruhan'}"</p>
                        </div>
                        {device.technician_note && (
                            <div className="technician-note-box mt-2 pt-2 border-t border-dashed border-gray-300">
                                <span className="label-inline">CATATAN TEKNISI:</span>
                                <p className="complaint-text text-blue-800 font-medium">{device.technician_note}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment Breakdown */}
                <div className="receipt-costs">
                    <div className="cost-row">
                        <span className="cost-label">Biaya Jasa</span>
                        <span className="cost-value font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(device.estimated_cost || 0)}</span>
                    </div>
                    
                    {device.has_warranty && (
                        <div className="cost-row warranty-item bg-emerald-50 border border-emerald-100">
                            <div className="warranty-details">
                                <span className="font-bold text-emerald-800">Biaya Garansi</span>
                                {device.warranty_note && <span className="warranty-note text-[8px] text-emerald-600 italic">({device.warranty_note})</span>}
                            </div>
                            <span className="font-bold text-emerald-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(device.warranty_cost || 0)}</span>
                        </div>
                    )}

                    <div className="divider-dashed-heavy" />

                    <div className="total-row">
                        <span className="total-label">ESTIMASI TOTAL</span>
                        <span className="total-value text-blue-700">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCost)}
                        </span>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="receipt-footer">
                    <div className="terms-box border border-gray-200 p-2 rounded">
                        <p className="footer-title">PERHATIAN / TERMS:</p>
                        <ul>
                            <li>Unit yang tidak diambil lebih dari 30 hari di luar tanggung jawab kami.</li>
                            <li>Garansi hanya berlaku untuk bagian yang diservis/diganti.</li>
                            {device.cancellation_agreement && (
                                <li className="font-bold italic mt-1 text-[7px] border-t border-gray-100 pt-1">
                                    Pesanan dapat dibatalkan jika customer tidak setuju dengan biaya final setelah pengecekan lebih lanjut. Unit akan dikembalikan tanpa pengerjaan.
                                </li>
                            )}
                        </ul>
                    </div>
                    
                    <div className="thank-you">
                        <p className="main font-black">TERIMA KASIH</p>
                        <p className="sub text-gray-500 font-medium italic">{receiptFooter}</p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media screen {
                    .service-receipt-portal-container {
                        display: none;
                    }
                }
                @media print {
                    @page {
                        margin: 0;
                        size: ${receiptWidth}mm auto;
                    }
                    
                    #app, .app-shell, body > *:not(.service-receipt-portal-container) {
                        display: none !important;
                    }
                    
                    body, html {
                        background: white !important;
                        color: black !important;
                        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }

                    .service-receipt-portal-container {
                        display: block !important;
                        width: ${receiptWidth}mm;
                        margin: 0 auto;
                        padding: 8mm 4mm;
                    }
                    
                    .service-receipt-portal-container.width-58 {
                        width: 58mm;
                        padding: 5mm 2mm;
                    }

                    .receipt-paper { background: white; }
                    
                    .receipt-header { text-align: center; margin-bottom: 12px; }
                    .brand-name { font-size: 20px; font-weight: 900; letter-spacing: -1px; display: block; }
                    .width-58 .brand-name { font-size: 16px; }
                    .brand-tagline { font-size: 7px; font-weight: 700; letter-spacing: 1px; color: #444; text-transform: uppercase; display: block; margin-top: -2px; }
                    .store-info { margin-top: 6px; font-size: 7px; color: #666; line-height: 1.3; }
                    
                    .divider-dashed { border-top: 1px dashed #000; margin: 8px 0; }
                    .divider-solid { border-top: 1px solid #000; margin: 8px 0; }
                    .divider-thin { border-top: 0.5px solid #ddd; margin: 3px 0; }
                    .divider-dashed-heavy { border-top: 2px dashed #000; margin: 10px 0; }

                    .receipt-row { display: flex; justify-content: space-between; }
                    .col { display: flex; flex-direction: column; }
                    .items-end { align-items: flex-end; }
                    
                    .section-title { font-size: 7px; font-weight: 800; color: #888; margin-bottom: 3px; text-transform: uppercase; }
                    .customer-card { display: flex; flex-direction: column; }
                    .customer-name { font-size: 12px; font-weight: 900; }
                    .customer-phone { font-size: 8px; }

                    .device-box { padding: 4px; border-radius: 4px; margin-top: 8px; }
                    .label-inline { font-size: 7px; font-weight: bold; color: #666; margin-right: 4px; }
                    .complaint-text { font-size: 9px; margin: 0; line-height: 1.2; }

                    .receipt-costs { margin-top: 12px; }
                    .cost-row { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 3px; }
                    .total-row { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
                    .total-label { font-size: 9px; font-weight: 900; }
                    .total-value { font-size: 16px; font-weight: 900; }
                    .width-58 .total-value { font-size: 14px; }

                    .receipt-footer { margin-top: 15px; }
                    .terms-box { font-size: 6px; color: #555; line-height: 1.3; }
                    .terms-box ul { padding-left: 8px; margin: 2px 0 0; }
                    
                    .thank-you { text-align: center; margin-top: 15px; }
                    .thank-you .main { font-size: 10px; margin: 0; }
                    .thank-you .sub { font-size: 7px; margin: 2px 0; }
                }
            `}} />
        </div>
    );

    return createPortal(content, document.body);
});

ServiceReceipt.displayName = 'ServiceReceipt';

export default ServiceReceipt;
