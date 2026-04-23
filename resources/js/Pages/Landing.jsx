import React from 'react';
import { Head, Link } from '@inertiajs/react';
import SignalStatus from '../components/SignalStatus';

import {
    Smartphone,
    ShieldCheck,
    Zap,
    History,
    CreditCard,
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Award,
    Clock,
    Users,
    Wrench,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

const InstagramIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

const FacebookIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);

const TwitterIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
);

const Landing = ({ auth }) => {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-700 font-['Inter',_sans-serif]">
            <Head title="Pusat Service Gadget Professional" />

            {/* Custom CSS for animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            ` }} />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                                <Smartphone className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-slate-900">LABKU<span className="text-blue-600">SERVICE</span></span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Layanan</a>
                            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Tentang</a>
                            <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Kontak</a>
                            
                            <div className="hidden lg:block ml-4 scale-75 origin-right">
                                <SignalStatus />
                            </div>

                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 hover:shadow-xl active:scale-95"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-200 hover:shadow-xl active:scale-95"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-50"></div>
                    <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-purple-50 rounded-full blur-[80px] opacity-40"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6 animate-pulse shadow-sm">
                            <Zap size={14} className="text-blue-600" />
                            <span>Solusi Service Tercepat & Terpercaya</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                            Kembalikan Performa <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient">
                                Gadget Kesayangan Anda
                            </span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Kami hadir dengan teknisi ahli dan peralatan modern untuk menangani berbagai kerusakan perangkat Anda.
                            <span className="font-semibold text-blue-600"> Cepat, aman, dan bergaransi resmi.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/login"
                                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl shadow-blue-200 hover:shadow-2xl flex items-center justify-center gap-2 group transform hover:scale-105 duration-300"
                            >
                                Mulai Service Sekarang
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </Link>
                            <a
                                href="#features"
                                className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-black rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                            >
                                Lihat Layanan
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>Garansi Resmi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-blue-500" />
                                <span>Service Cepat</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award size={16} className="text-amber-500" />
                                <span>Teknisi Ahli</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Pelanggan Puas', value: '10,000+', icon: Users },
                            { label: 'Perangkat Selesai', value: '15,000+', icon: Smartphone },
                            { label: 'Teknisi Ahli', value: '25+', icon: Wrench },
                            { label: 'Tahun Pengalaman', value: '8+', icon: Award },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-3 group-hover:from-blue-100 group-hover:to-indigo-100 transition">
                                    <stat.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider mb-4">
                            LAYANAN KAMI
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Mengapa Memilih Kami?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Kami memberikan layanan terbaik dengan standar kualitas tertinggi
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: 'Garansi Resmi',
                                desc: 'Setiap perbaikan perangkat dilengkapi dengan garansi untuk memastikan ketenangan pikiran Anda.',
                                color: 'blue'
                            },
                            {
                                icon: Zap,
                                title: 'Pengerjaan Cepat',
                                desc: 'Kami mengerti betapa pentingnya gadget Anda. Sebagian besar kerusakan selesai di hari yang sama.',
                                color: 'amber'
                            },
                            {
                                icon: History,
                                title: 'Tracking Transparan',
                                desc: 'Pantau status pengerjaan perangkat Anda secara real-time melalui sistem tracking kami.',
                                color: 'indigo'
                            },
                            {
                                icon: CreditCard,
                                title: 'Biaya Terukur',
                                desc: 'Estimasi biaya diberikan di awal sebelum pengerjaan dimulai. Tidak ada biaya tersembunyi.',
                                color: 'emerald'
                            },
                            {
                                icon: Smartphone,
                                title: 'Suku Cadang Berkualitas',
                                desc: 'Kami hanya menggunakan suku cadang berkualitas terbaik untuk menjaga performa jangka panjang.',
                                color: 'rose'
                            },
                            {
                                icon: Award,
                                title: 'Teknisi Bersertifikat',
                                desc: 'Perangkat Anda ditangani oleh teknisi profesional yang berpengalaman di bidangnya.',
                                color: 'cyan'
                            }
                        ].map((feature, i) => {
                            const colorClasses = {
                                blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
                                amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600',
                                indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600',
                                emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600',
                                rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600',
                                cyan: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600'
                            };
                            return (
                                <div key={i} className="group p-8 rounded-3xl border border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white">
                                    <div className={`w-14 h-14 rounded-2xl ${colorClasses[feature.color]} flex items-center justify-center mb-6 group-hover:text-white transition-all duration-300`}>
                                        <feature.icon size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-600/5 to-transparent skew-x-12 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider mb-4">
                                TENTANG KAMI
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
                                Partner Terpercaya Untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Solusi Gadget</span> Anda
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                Berawal dari sebuah workshop kecil di tahun 2018, Labku Service kini telah berkembang menjadi salah satu pusat service gadget terkemuka yang dipercaya oleh ribuan pelanggan.
                            </p>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Visi kami adalah memberikan standar layanan service yang transparan, berkualitas tinggi, dan dapat diandalkan bagi seluruh lapisan masyarakat.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    'Teknisi berpengalaman & bersertifikat',
                                    'Peralatan modern & diagnostik akurat',
                                    'Garansi untuk setiap perbaikan',
                                    'Harga transparan tanpa biaya tersembunyi'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="text-blue-400 w-5 h-5" />
                                        <span className="text-slate-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-800 bg-gradient-to-br from-slate-700 to-slate-600 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="text-white font-bold flex items-center gap-2">
                                        <Award size={18} className="text-amber-400" />
                                        Dibuat oleh Profesional
                                    </div>
                                    <div className="text-slate-500 text-sm">Berpengalaman lebih dari 8 tahun</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center overflow-hidden">
                                    <div className="grid grid-cols-2 gap-4 p-8">
                                        <div className="space-y-4">
                                            <div className="h-40 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl animate-pulse"></div>
                                            <div className="h-60 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl"></div>
                                        </div>
                                        <div className="space-y-4 pt-8">
                                            <div className="h-60 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl"></div>
                                            <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-2xl animate-bounce">
                                <div className="text-slate-900 font-black text-3xl">99.9%</div>
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tingkat Keberhasilan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-4xl lg:text-5xl font-black text-white mb-6">Siap Mengembalikan Performa Gadget Anda?</h3>
                            <p className="text-blue-100 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
                                Jangan biarkan kerusakan kecil mengganggu produktivitas Anda. Daftar sekarang dan dapatkan <span className="font-bold">pengecekan gratis!</span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/login"
                                    className="inline-flex px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-50 hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 items-center justify-center gap-2"
                                >
                                    Konsultasi Sekarang
                                    <ChevronRight size={18} />
                                </Link>
                                <a
                                    href="#contact"
                                    className="inline-flex px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white font-black rounded-2xl hover:bg-blue-500/30 transition-all border border-white/20 items-center justify-center gap-2"
                                >
                                    Hubungi Kami
                                    <Phone size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-slate-900 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Smartphone className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-black tracking-tight text-white">LABKU<span className="text-blue-500">SERVICE</span></span>
                            </div>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Solusi service gadget profesional untuk Handphone, Laptop, dan Tablet dengan standar kualitas tertinggi.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { Icon: InstagramIcon, href: '#', color: 'hover:bg-gradient-to-tr hover:from-pink-500 hover:to-orange-400' },
                                    { Icon: FacebookIcon, href: '#', color: 'hover:bg-blue-600' },
                                    { Icon: TwitterIcon, href: '#', color: 'hover:bg-sky-500' }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        className={`w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 ${social.color} hover:text-white hover:border-transparent transition-all`}
                                    >
                                        <social.Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Navigasi</h4>
                            <ul className="space-y-3">
                                {['Tentang Kami', 'Layanan', 'Testimoni', 'Tracking Service'].map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Layanan Kami</h4>
                            <ul className="space-y-3">
                                {['Service iPhone', 'Service Android', 'Service Laptop', 'Ganti LCD', 'Ganti Baterai'].map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Kontak Kami</h4>
                            <ul className="space-y-4">
                                <li className="flex gap-3 group">
                                    <MapPin className="text-blue-500 shrink-0 mt-1 group-hover:text-blue-400 transition" size={18} />
                                    <span className="text-slate-400 group-hover:text-slate-300 transition">Jl. Perintis Kemerdekaan No. 123, Jakarta Selatan</span>
                                </li>
                                <li className="flex gap-3 group">
                                    <Phone className="text-blue-500 shrink-0 group-hover:text-blue-400 transition" size={18} />
                                    <span className="text-slate-400 group-hover:text-slate-300 transition">0812-3456-7890</span>
                                </li>
                                <li className="flex gap-3 group">
                                    <Mail className="text-blue-500 shrink-0 group-hover:text-blue-400 transition" size={18} />
                                    <span className="text-slate-400 group-hover:text-slate-300 transition">hello@labkuservice.id</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-800 text-center">
                        <p className="text-slate-500 text-sm">
                            {"\u00A9"} {new Date().getFullYear()} Labku Service. All rights reserved. Made with {"\u2764\uFE0F"} for better service
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;