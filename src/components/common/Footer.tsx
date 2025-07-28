'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                10
              </div>
              <span className="text-xl font-bold">
                {language === 'bn' ? 'মিনিট স্কুল' : 'MINUTE SCHOOL'}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {language === 'bn' 
                ? 'দেশের সবচেয়ে বড় অনলাইন শিক্ষা প্ল্যাটফর্ম'
                : 'Bangladesh\'s largest online education platform'
              }
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                📘
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">YouTube</span>
                📺
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">TikTok</span>
                🎵
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'bn' ? 'দ্রুত লিংক' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  {language === 'bn' ? 'সাহায্য' : 'Help'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </h3>
            <p className="text-gray-400 mb-2">
              {language === 'bn' ? 'ফোন: ১৬৯১০' : 'Call: 16910'}
            </p>
            <p className="text-gray-400">
              {language === 'bn' 
                ? 'সময়: সকাল ৯টা - রাত ৯টা'
                : 'Hours: 9 AM - 9 PM'
              }
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {language === 'bn'
              ? '© ২০২৪ ১০ মিনিট স্কুল। সর্বস্বত্ব সংরক্ষিত।'
              : '© 2024 10 Minute School. All rights reserved.'
            }
          </p>
        </div>
      </div>
    </footer>
  )
} 