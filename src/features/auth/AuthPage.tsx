import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('demo@freelance.ir');
  const [password, setPassword] = useState('123456');
  const [fullName, setFullName] = useState('??????????? ?????????');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setErrorMsg(err.message || '????? ?? ???. ?????? ???? ????.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/30">
      <div className="grid lg:grid-cols-2 max-w-4xl w-full bg-card rounded-2xl border shadow-xl overflow-hidden">
        {/* Left Side (Visual Branding) */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-primary/95 to-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">FreelanceOS</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold leading-snug">
              ?????? ??????? ???? ? ????????? ????????
            </h2>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              ???? ?????? ????? ?????? ?????????? ?????? ??????? ? ???? ???? ????? ?? ?? ??????? ???? ? ????.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2.5 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>?????? ??? ?????? ? ????? ?? Redux Toolkit</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>????? ???? ? ?????????? ??????? ?? React Query</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>????? ??????? ?? ???? PostgreSQL ? Supabase RLS</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-primary-foreground/60 border-t border-white/10 pt-4">
            ????? ???? ??? ?? React, TypeScript, Redux & Tailwind
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <CardHeader className="p-0 mb-6">
            <div className="lg:hidden flex items-center gap-2 mb-4 text-primary font-bold">
              <Briefcase className="h-5 w-5" />
              <span>FreelanceOS</span>
            </div>
            <CardTitle className="text-2xl font-bold">
              {isRegister ? '????? ???? ?????? ????' : '???? ?? ??? ??????'}
            </CardTitle>
            <CardDescription className="text-xs">
              {isRegister
                ? '?????? ??? ?? ???? ???? ?????? ???????? ???? ????'
                : '???? ?????? ?? ??????? ? ???????? ???? ????'}
            </CardDescription>
          </CardHeader>

          {errorMsg && (
            <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">??? ? ??? ????????</label>
                <Input
                  required
                  placeholder="????: ??? ?????"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">???? ?????</label>
              <Input
                required
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">??? ????</label>
              <Input
                required
                type="password"
                placeholder="????????"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full gap-2 mt-2" disabled={loading}>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>{isRegister ? '??????? ? ????' : '???? ?? ?????'}</span>
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            {isRegister ? '????? ??????? ????????? ' : '???? ?????? ??????? '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold text-primary hover:underline cursor-pointer"
            >
              {isRegister ? '???? ????' : '???? ??????'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
