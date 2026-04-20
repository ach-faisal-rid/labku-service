import React from 'react';
import { Package, CheckCircle, Wrench, Archive } from 'lucide-react';

const EquipmentStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Equipment</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-500 opacity-50" />
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Aktif</p>
                        <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Perawatan</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
                    </div>
                    <Wrench className="w-8 h-8 text-yellow-500 opacity-50" />
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Tidak Aktif</p>
                        <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                    </div>
                    <Archive className="w-8 h-8 text-gray-500 opacity-50" />
                </div>
            </div>
        </div>
    );
};

export default EquipmentStats;
