import { Eye, EyeClosed, LockIcon, Mail, User2Icon, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Toaster } from "react-hot-toast";
import Bg from "../assets/images/signBg.jpg";

const Login = () => {
  const [state, setState] = useState('login'); // Changé à 'login' par défaut pour correspondre à la logique
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const { login, signup, user } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (state === 'login') {
      await login({ email, password });
    } else {
      await signup({ username, email, password });
    }
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <>
      <Toaster />
      <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-sans">
        
        {/* IMAGE DE FOND AVEC OVERLAY TYPE NETFLIX */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: `url(${Bg})` }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/90 via-black/50 to-green-900/40" />

        {/* CONTAINER PRINCIPAL */}
        <div className="relative z-20 w-full max-w-5xl mx-4 grid lg:grid-cols-2 bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          
          {/* DIV GAUCHE : WELCOME MESSAGE & SOCIALS */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-green-600/10 border-r border-white/5">
            <div>
              <h1 className="text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                Push your <br />
                <span className="text-green-500">Limits.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-xs leading-relaxed">
                Join <span className="text-white font-bold">FITtRACK</span> today and get access to premium training routines and nutrition plans.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-widest text-green-500">Follow our community</p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, color: "hover:bg-blue-600" },
                  { Icon: Instagram, color: "hover:bg-pink-600" },
                  { Icon: Twitter, color: "hover:bg-sky-500" },
                  { Icon: MessageCircle, color: "hover:bg-green-500" } // Pour WhatsApp
                ].map((social, index) => (
                  <button 
                    key={index} 
                    className={`p-3 bg-white/5 rounded-full text-white transition-all duration-300 ${social.color} hover:-translate-y-2`}
                  >
                    <social.Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DIV DROITE : FORMULAIRE */}
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="w-full">
              <h2 className="text-3xl text-white font-bold tracking-tight">
                {state === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                {state === 'login' ? "Please enter your details to access." : "Please enter your details to create an account."}
              </p>

              <div className="mt-8 space-y-5">
                {state !== 'login' && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Username</label>
                    <div className="relative mt-2">
                      <User2Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/60 size-5" />
                      <input 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username} 
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all" 
                        placeholder="FitnessWarrior" 
                        required 
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email</label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/60 size-5" />
                    <input 
                      onChange={(e) => setEmail(e.target.value)} 
                      value={email} 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all" 
                      placeholder="email@example.com" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                  <div className="relative mt-2">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/60 size-5" />
                    <input 
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password} 
                      type={showPassword ? 'text' : 'password'} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all" 
                      placeholder="Password" 
                      required 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                      {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitted} 
                  className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-95 disabled:opacity-70"
                >
                  {isSubmitted ? 'Processing...' : state === "login" ? 'Sign In' : 'Join Now'}
                </button>
              </div>

              <p className="text-center mt-8 text-sm text-gray-400">
                {state === 'login' ? "Don't have an account?" : "Already a member?"}
                <button 
                  type="button"
                  onClick={() => setState(state === 'login' ? 'Sign Up' : 'login')} 
                  className="ml-2 font-bold text-green-500 hover:text-green-400 transition-colors"
                > 
                  {state === 'login' ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;