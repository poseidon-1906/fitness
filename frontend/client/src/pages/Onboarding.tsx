import { Scale3dIcon, TargetIcon, User, ArrowLeft, ArrowRight, Trophy, Flame, Activity } from "lucide-react"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { useAppContext } from "../context/AppContext";
import type { ProfileFormData, UserData } from "../types";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import mockApi from "../assets/mockApi";
import AthleteBg from "../assets/images/signBg.jpg";

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const { user, setOnboardingCompleted, fetchUser } = useAppContext();
    const [formData, setFormData] = useState<ProfileFormData>({
        age:0, weight:0, goal: 'maintain', height: 0, dailyCalorieIntake: 2000, dailyCalorieBurn: 500
    });

    const totalSteps = 3;
    const updateField = (field: keyof ProfileFormData, value: string | number) => {
        setFormData({...formData, [field]: value});
    }

    const handleNext = async () => {
        if(step === 1){
            if(!formData.age || Number(formData.age) < 13 || Number(formData.age) > 120){
                return toast("Informations are required")
        }}

        if (step < totalSteps){
            setStep(step + 1);
        }
        else {
            const userData = {
                ...formData, age: formData.age,
                weight: formData.weight,
                height: formData.height ? formData.height : null,
                createdAt : new Date().toISOString()
            }
            localStorage.setItem('fitnessUser', JSON.stringify(userData))
            await mockApi.user.update(user?.id || "", userData as unknown as Partial<UserData> )
            toast.success('Profile completed!')
            setOnboardingCompleted(true);
            fetchUser(user?.token || "");
        }
    }

    const goalOptions = [
        {
            value: 'lose',
            label: 'Weight Loss',
            description: 'Sculpt your ideal physique with precision',
            icon: Flame,
            gradient: 'from-rose-500/20 to-orange-500/20'
        },
        {
            value: 'maintain',
            label: 'Performance',
            description: 'Sustain peak wellness and vitality',
            icon: Activity,
            gradient: 'from-emerald-500/20 to-teal-500/20'
        },
        {
            value: 'gain',
            label: 'Muscle Gain',
            description: 'Build strength and muscular excellence',
            icon: Trophy,
            gradient: 'from-blue-500/20 to-indigo-500/20'
        }
    ];



  return (
    <>
      <Toaster />
      <div className="max-h-screen bg-zinc-950 flex overflow-hidden">
        {/* LEFT SIDE - Cinematic Photography */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Background Image with Emerald Lighting Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[20s] hover:scale-110"
            style={{ backgroundImage: `url(${AthleteBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-zinc-900/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          {/* Typography Overlay */}
          <div className="relative z-10 flex flex-col justify-end p-16 pb-24">
            <h1 
              className="text-7xl font-bold leading-[0.95] tracking-tighter text-white mb-6"
            >
              CHASE<br />YOUR<br />
              <span className="text-emerald-400">BETTER SELF.</span>
            </h1>
            <p className="text-zinc-300 text-lg max-w-md leading-relaxed">
              Elevate your journey with personalized wellness designed for extraordinary results.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Minimalist Bento Interaction Panel */}
        <div className="w-full lg:w-1/2 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-xl">
            {/* Header */}
            <div className="mb-12">
              <h2 
                className="text-4xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight"
              >
                Let's Begin
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-base">
                Crafting a unique experience just for you
              </p>
            </div>

            {/* Hairline Progress */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Step {step} of {totalSteps}
                </span>
              </div>
              <div className="relative h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[420px]">
              {step === 1 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                      <User className="w-7 h-7 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">
                        Your Age
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Tailoring your wellness roadmap
                      </p>
                    </div>
                  </div>
                  <Input
                    className=""
                    label="Age"
                    type="number"
                    onChange={(v) => updateField('age', v)}
                    placeholder="Enter your age"
                    min={13}
                    max={120}
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Scale3dIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">
                        Your Metrics
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Precision tracking for optimal results
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <Input
                      label="Weight (kg)"
                      type="number"
                      onChange={(v) => updateField('weight', v)}
                      min={30}
                      placeholder="0"
                      required
                    />
                    <Input
                      label="Height (cm) - Optional"
                      type="number"
                      onChange={(v) => updateField('height', v)}
                      placeholder="0"
                      min={50}
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                      <TargetIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">
                        Your Goal
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Define your transformation path
                      </p>
                    </div>
                  </div>

                  {/* Interactive Goal Selection Cards */}
                  <div className="space-y-4">
                    {goalOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = formData.goal === option.value;
                      
                      return (
                        <button
                          key={option.value}
                          onClick={() => updateField('goal', option.value)}
                          className={`
                            w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left
                            bg-gradient-to-br ${option.gradient}
                            backdrop-blur-xl
                            ${isSelected 
                              ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/20' 
                              : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-400/50 dark:hover:border-emerald-600/50'
                            }
                            group hover:scale-[1.02] active:scale-[0.98]
                          `}
                        >
                          <div className="flex items-start gap-5">
                            {/* 3D Abstract Icon */}
                            <div className={`
                              w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                              ${isSelected 
                                ? 'bg-emerald-500 shadow-lg shadow-emerald-500/40' 
                                : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-500/10'
                              }
                            `}>
                              <Icon 
                                className={`w-7 h-7 transition-colors ${
                                  isSelected 
                                    ? 'text-white' 
                                    : 'text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500'
                                }`} 
                                strokeWidth={2}
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <h4 className={`
                                text-xl font-bold mb-1 transition-colors
                                ${isSelected 
                                  ? 'text-emerald-600 dark:text-emerald-400' 
                                  : 'text-zinc-900 dark:text-white'
                                }
                              `}>
                                {option.label}
                              </h4>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {option.description}
                              </p>
                            </div>

                            {/* Selection Indicator */}
                            <div className={`
                              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                              ${isSelected 
                                ? 'border-emerald-500 bg-emerald-500' 
                                : 'border-zinc-300 dark:border-zinc-700'
                              }
                            `}>
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              {step > 1 ? (
                <Button
                  variant="secondary"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5" strokeWidth={2} />
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                onClick={handleNext}
                className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                {step === totalSteps ? 'Begin Journey' : 'Continue'}
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Onboarding