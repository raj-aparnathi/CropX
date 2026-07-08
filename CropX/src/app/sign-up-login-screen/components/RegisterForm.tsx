'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { Language } from './AuthScreen';

interface RegisterFormData {
  farmerName: string;
  email: string;
  password: string;
  confirmPassword: string;
  farmLocation: string;
  preferredLanguage: string;
  primaryCrop: string;
}

interface RegisterFormProps {
  language: Language;
  onSwitchMode: () => void;
}

const CROPS = ['Rice', 'Wheat', 'Tomato', 'Cotton', 'Potato', 'Maize', 'Soybean', 'Sugarcane', 'Onion', 'Chilli'];

export default function RegisterForm({ language, onSwitchMode }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    defaultValues: { farmerName: '', email: '', password: '', confirmPassword: '', farmLocation: '', preferredLanguage: language, primaryCrop: '' },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    // Backend integration point: POST /api/auth/register with farmer profile data
    await new Promise(resolve => setTimeout(resolve, 1400));
    toast.success(`Welcome to CropX, ${data.farmerName}! 🌾`, { description: 'Your farm profile has been created.' });
    setTimeout(() => router.push('/home-dashboard'), 600);
  };

  return (
    <div className="fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Create your farm profile</h2>
        <p className="text-muted-foreground text-sm mt-1">Join 50,000+ farmers protecting their harvest</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Farmer Name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Farmer Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              {...register('farmerName', { required: 'Your name is required' })}
              type="text"
              placeholder="e.g. Rajesh Patel"
              className="input-field pl-10"
            />
          </div>
          {errors.farmerName && <p className="mt-1 text-xs text-severity-high">{errors.farmerName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
              })}
              type="email"
              placeholder="you@farm.com"
              className="input-field pl-10"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-severity-high">{errors.email.message}</p>}
        </div>

        {/* Farm Location */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Farm Location</label>
          <p className="text-xs text-muted-foreground mb-1.5">Used for localized disease alerts and weather data</p>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              {...register('farmLocation', { required: 'Farm location is required for local disease alerts' })}
              type="text"
              placeholder="e.g. Anand, Gujarat"
              className="input-field pl-10"
            />
          </div>
          {errors.farmLocation && <p className="mt-1 text-xs text-severity-high">{errors.farmLocation.message}</p>}
        </div>

        {/* Primary Crop + Language row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Primary Crop</label>
            <div className="relative">
              <select
                {...register('primaryCrop', { required: 'Select your main crop' })}
                className="input-field appearance-none pr-8 cursor-pointer"
              >
                <option value="">Select crop</option>
                {CROPS.map(crop => (
                  <option key={`crop-${crop}`} value={crop}>{crop}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            {errors.primaryCrop && <p className="mt-1 text-xs text-severity-high">{errors.primaryCrop.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Language</label>
            <div className="relative">
              <select
                {...register('preferredLanguage')}
                className="input-field appearance-none pr-8 cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="gu">ગુજરાતી</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
          <p className="text-xs text-muted-foreground mb-1.5">Minimum 8 characters with at least one number</p>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: { value: /(?=.*\d)/, message: 'Include at least one number' },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              className="input-field pl-10 pr-10"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-severity-high">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              })}
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
              className="input-field pl-10 pr-10"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-xs text-severity-high">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full h-14 text-base mt-2"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : (<>Create Farm Account <ArrowRight size={18} /></>)}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-5">
        Already have an account?{' '}
        <button onClick={onSwitchMode} className="text-primary font-semibold hover:underline">Sign in</button>
      </p>
    </div>
  );
}