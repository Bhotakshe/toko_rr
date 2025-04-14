'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserIcon, CogIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function AccountPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not logged in
  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const tabs = [
    { id: 'profile', name: 'Profil Saya', icon: UserIcon },
    { id: 'orders', name: 'Pesanan Saya', icon: ShoppingBagIcon },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon },
    { id: 'settings', name: 'Pengaturan', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Sidebar */}
            <div className="p-6 border-r border-gray-200">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-3 p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profil Saya</h2>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nama
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            defaultValue={session.user?.name || ''}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            defaultValue={session.user?.email || ''}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          No. Telepon
                        </label>
                        <div className="mt-1">
                          <input
                            type="tel"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Alamat
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={3}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Pesanan Saya</h2>
                  <div className="mt-6">
                    <p className="text-gray-500">Belum ada pesanan</p>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
                  <div className="mt-6">
                    <p className="text-gray-500">Wishlist Anda kosong</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Pengaturan</h2>
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Keamanan Akun</h3>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Ubah Password
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Notifikasi</h3>
                      <div className="mt-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            Terima notifikasi email untuk pembaruan pesanan
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 