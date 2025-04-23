'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserIcon, CogIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string; // Keep address even if not in the current form view
  birthDate: string;
  gender: string;
  photo: string | null;
}

export default function AccountPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '', // Initialize empty, will be set by useEffect
    email: '', // Initialize empty, will be set by useEffect
    phone: '', // Add other fields as needed from your backend/session
    address: '',
    birthDate: '',
    gender: '',
    photo: null, // Initialize photo state
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Effect to initialize/update profile data from session and API
  useEffect(() => {
    const fetchProfileData = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/profile');
          if (response.ok) {
            const data = await response.json();
            setProfileData(prev => ({
              ...prev,
              ...data,
            }));
            if (data.photo) {
              setPhotoPreview(data.photo);
            }
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfileData();
  }, [session]);

  // Redirect if not logged in - should happen before hooks potentially fail
  // Use useEffect for redirection to avoid rendering issues
  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  // Render loading or null while session is loading or redirecting
  if (!session) {
    // You might want a loading indicator here instead of null
    return null;
  }


  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation (optional)
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error('Ukuran file melebihi 10MB');
          return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
          toast.error('Format file tidak didukung (hanya JPG, JPEG, PNG)');
          return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          const resultString = event.target.result as string;
          setPhotoPreview(resultString);
          // Store the base64 string or prepare for upload
          // For simplicity, storing base64 in state. In reality, you'd likely upload the file.
          setProfileData(prev => ({
            ...prev,
            photo: resultString // Or handle file object for upload
          }));
        }
      };

      reader.onerror = (error) => {
          console.error("File reading error:", error);
          toast.error('Gagal membaca file foto');
      }

      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update profile data in the backend
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Update the session with the new data
      await update({
        ...session,
        user: {
          ...session.user,
          name: profileData.name,
          email: profileData.email,
          image: profileData.photo || session.user.image,
        }
      });

      toast.success('Profil berhasil diperbarui!');
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error('Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profil Saya', icon: UserIcon },
    { id: 'orders', name: 'Pesanan Saya', icon: ShoppingBagIcon },
    { id: 'settings', name: 'Pengaturan', icon: CogIcon },
  ];

  // Determine initial character for avatar fallback
  const initialChar = profileData.name ? profileData.name.charAt(0).toUpperCase() : '?';

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
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-3 p-6 md:p-8">
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  {/* Title moved outside the flex container */}
                  <h2 className="text-2xl font-semibold text-gray-900">Ubah Biodata Diri</h2>
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Photo Upload Section */}
                    <div className="w-full lg:w-1/3 flex flex-col items-center">
                      {/* Removed blue background, adjusted styling */}
                      <div className="w-full max-w-xs flex flex-col items-center space-y-4">
                        <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4 ring-2 ring-offset-2 ring-primary/50">
                          {photoPreview ? (
                            <Image
                              src={photoPreview}
                              alt="Profile Preview"
                              width={144}
                              height={144}
                              className="object-cover w-full h-full"
                              priority // Prioritize loading profile image
                            />
                          ) : (
                            // Fallback Avatar
                            <span className="text-5xl font-medium text-gray-600">
                              {initialChar}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => document.getElementById('photo-upload')?.click()}
                          className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                        >
                          Pilih Foto
                        </button>
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/jpeg, image/png, image/jpg"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                        <p className="text-gray-500 text-xs text-center">
                          Max 10MB. Format: JPG, JPEG, PNG
                        </p>
                      </div>
                    </div>

                    {/* Form Section */}
                    <div className="w-full lg:w-2/3">
                      {/* Removed redundant h2, adjusted form structure */}
                      <form onSubmit={handleProfileSubmit} className="space-y-6">
                        {/* Section 1: Biodata Diri */}
                        <div className="border-b border-gray-200 pb-6">
                          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Biodata Diri</h3>
                          <div className="space-y-4">
                            {/* Name Field */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <label htmlFor="name" className="w-full sm:w-1/4 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                                Nama
                              </label>
                              <div className="w-full sm:w-3/4 flex items-center">
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={profileData.name}
                                  onChange={handleProfileChange}
                                  className="flex-grow block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm disabled:bg-gray-100"
                                  // disabled // Example: Make name non-editable if needed
                                />
                                {/* Removed Ubah button for name, assuming save happens via main button */}
                              </div>
                            </div>
                            {/* Birth Date Field (Placeholder) */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <label className="w-full sm:w-1/4 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                                Tanggal Lahir
                              </label>
                              <div className="w-full sm:w-3/4">
                                {/* Replace button with actual input or component */}
                                <input
                                  type="date" // Use date input
                                  name="birthDate"
                                  value={profileData.birthDate}
                                  onChange={handleProfileChange}
                                  className="block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                />
                                {/* <button type="button" className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">
                                  Tambah Tanggal Lahir
                                </button> */}
                              </div>
                            </div>
                            {/* Gender Field (Placeholder) */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <label className="w-full sm:w-1/4 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                                Jenis Kelamin
                              </label>
                              <div className="w-full sm:w-3/4">
                                {/* Replace button with actual select or radio buttons */}
                                <select
                                  name="gender"
                                  value={profileData.gender}
                                  onChange={handleProfileChange}
                                  className="block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                >
                                  <option value="">Pilih Jenis Kelamin</option>
                                  <option value="male">Laki-laki</option>
                                  <option value="female">Perempuan</option>
                                  <option value="other">Lainnya</option>
                                </select>
                                {/* <button type="button" className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">
                                  Tambah Jenis Kelamin
                                </button> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Kontak */}
                        <div className="pt-6 border-b border-gray-200 pb-6">
                          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Kontak</h3>
                          <div className="space-y-4">
                            {/* Email Field */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <label htmlFor="email" className="w-full sm:w-1/4 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                                Email
                              </label>
                              <div className="w-full sm:w-3/4 flex items-center space-x-2">
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={profileData.email}
                                  onChange={handleProfileChange}
                                  className="flex-grow block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm disabled:bg-gray-100"
                                  disabled // Email usually not changeable or requires verification flow
                                />
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                  Terverifikasi
                                </span>
                                {/* <button type="button" className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                                  Ubah
                                </button> */}
                              </div>
                            </div>
                            {/* Phone Number Field */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <label htmlFor="phone" className="w-full sm:w-1/4 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                                Nomor HP
                              </label>
                              <div className="w-full sm:w-3/4 flex items-center space-x-2">
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={profileData.phone}
                                  onChange={handleProfileChange}
                                  placeholder="Contoh: 08123456789" // Use local format example
                                  className="flex-grow block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                />
                                {/* Example verification status - adjust as needed */}
                                {profileData.phone ? (
                                    <button type="button" className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                                        Verifikasi
                                    </button>
                                ) : (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                        Belum diisi
                                    </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className={`inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                              isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                            } transition-colors duration-150`}
                          >
                            {isLoading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                              </>
                            ) : (
                              'Simpan Perubahan'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Pesanan Saya</h2>
                  <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
                    {/* TODO: Replace with actual order list component */}
                    <p className="text-gray-500 text-center">Anda belum memiliki pesanan.</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-gray-900">Pengaturan Akun</h2>
                  <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
                    {/* Security Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Keamanan Akun</h3>
                      <div className="mt-4">
                        <button
                          type="button"
                          // TODO: Add onClick handler for changing password
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                        >
                          Ubah Password
                        </button>
                      </div>
                    </div>
                    {/* Notification Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900">Notifikasi</h3>
                      <div className="mt-4">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notifications-email"
                              name="notifications-email"
                              type="checkbox"
                              // TODO: Add state and handler for checkbox
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notifications-email" className="font-medium text-gray-700">
                              Pembaruan Pesanan
                            </label>
                            <p className="text-gray-500">Terima notifikasi email untuk pembaruan status pesanan.</p>
                          </div>
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