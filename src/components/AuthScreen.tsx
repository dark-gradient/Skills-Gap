import React, { useState } from 'react';
import { UserAccount, StudentProfile } from '../types/career';
import { apiClient } from '../services/apiClient';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthScreenProps {
  onLoginSuccess: (user: UserAccount, profile: StudentProfile) => void;
  onRegisterSuccess: (user: UserAccount, profile: StudentProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  onRegisterSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiClient.login(email.trim(), password);
      if (res.success && res.user && res.profile) {
        onLoginSuccess(res.user, res.profile);
      } else {
        setErrorMessage(res.error || 'Invalid email or password.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiClient.register({
        name: name.trim(),
        email: email.trim(),
        password,
        college: college.trim() || undefined,
        degree: degree.trim() || undefined,
        yearOfStudy: yearOfStudy.trim() || undefined,
      });

      if (res.success && res.user && res.profile) {
        onRegisterSuccess(res.user, res.profile);
      } else {
        setErrorMessage(res.error || 'Failed to create account.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!email.trim() || !newPassword) {
      setErrorMessage('Please enter your email and a new password.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiClient.resetPassword(email.trim(), newPassword);
      if (res.success) {
        setSuccessMessage('Password successfully updated! You can now log in with your new password.');
        setPassword('');
        setNewPassword('');
        setTimeout(() => {
          setMode('login');
        }, 1800);
      } else {
        setErrorMessage('Failed to reset password.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'No account found with this email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden bg-[#F6FAFF]">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#4D9FFF]/15 via-[#49C7E8]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-[#DCE8F5] rounded-3xl shadow-[0_20px_60px_rgba(23,43,77,0.08)] p-7 sm:p-9 relative z-10 space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#4D9FFF] border border-[#4D9FFF]/20 text-xs font-black tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Career Intelligence</span>
          </div>

          <h1 className="text-3xl font-black text-[#172B4D] tracking-tight">
            SKILLGAP
          </h1>

          <p className="text-xs sm:text-sm text-[#687A93] font-medium max-w-xs mx-auto">
            "Build the career you want."
          </p>
        </div>

        {/* Error / Success Alerts */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3.5 bg-[#FFF0ED] border border-[#FF8A72]/40 rounded-2xl flex items-start gap-2.5 text-xs text-[#172B4D]"
            >
              <AlertCircle className="w-4 h-4 text-[#FF8A72] shrink-0 mt-0.5" />
              <span className="font-semibold leading-relaxed">{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3.5 bg-[#EBFBF3] border border-[#42C98A]/40 rounded-2xl flex items-start gap-2.5 text-xs text-[#172B4D]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#42C98A] shrink-0 mt-0.5" />
              <span className="font-semibold leading-relaxed">{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] placeholder:text-[#687A93]/60 focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                />
                <Mail className="w-4 h-4 text-[#687A93] absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setMode('forgot');
                  }}
                  className="text-[11px] font-bold text-[#4D9FFF] hover:text-[#347DD9] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] placeholder:text-[#687A93]/60 focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                />
                <Lock className="w-4 h-4 text-[#687A93] absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#687A93] hover:text-[#172B4D] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-black tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'LOGGING IN...' : 'LOG IN'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode('register');
                }}
                className="w-full py-3 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-[#172B4D] text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>
        )}

        {/* 2. CREATE ACCOUNT FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                />
                <User className="w-4 h-4 text-[#687A93] absolute left-3.5 top-2.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                />
                <Mail className="w-4 h-4 text-[#687A93] absolute left-3.5 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                  Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  required
                  className="w-full px-3 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full px-3 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Optional Academic Fields */}
            <div className="pt-1 border-t border-[#DCE8F5]/80 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#687A93] block">
                Academic Background (Optional)
              </span>

              <div className="space-y-1.5 text-xs">
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="College / University"
                  className="w-full px-3 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="Degree (e.g. B.Tech CS)"
                    className="w-full px-3 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    placeholder="Year (e.g. 3rd Year)"
                    className="w-full px-3 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-black tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT & EXPLORE CAREERS'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode('login');
                }}
                className="w-full py-2.5 text-xs font-bold text-[#687A93] hover:text-[#172B4D] transition-colors cursor-pointer text-center"
              >
                Already have an account? Log in
              </button>
            </div>
          </form>
        )}

        {/* 3. FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div className="p-3.5 bg-[#EAF4FF] border border-[#4D9FFF]/30 rounded-2xl text-xs text-[#172B4D] leading-relaxed">
              Enter your registered email and choose a new password to restore access to your account.
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                Account Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.edu"
                required
                className="w-full px-3.5 py-2.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#687A93] block">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                className="w-full px-3.5 py-2.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] focus:bg-white transition-all"
              />
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-black tracking-wider uppercase transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'UPDATING...' : 'RESET PASSWORD'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode('login');
                }}
                className="w-full py-2 text-xs font-bold text-[#687A93] hover:text-[#172B4D] transition-colors cursor-pointer text-center"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
