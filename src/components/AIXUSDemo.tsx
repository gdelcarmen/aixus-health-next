"use client";

import { useState, useRef } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

export default function AIXUSDemo() {
  // Recovery slider state
  const [recoveryDays, setRecoveryDays] = useState(7);
  // OTP input state
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Radar chart data
  const radarData = [
    { subject: 'Recovery Time', A: 7, fullMark: 10 },
    { subject: 'Pain', A: 5, fullMark: 10 },
    { subject: 'Hospital Stay', A: 6, fullMark: 10 },
    { subject: 'Physical Activity', A: 4, fullMark: 10 },
  ];

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="space-y-12">
      {/* Clinician dashboard */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Clinician Dashboard</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Hannah card */}
          <div className="bg-secondary rounded-lg p-4 w-72 shadow-md">
            <h3 className="font-semibold text-lg">Hannah Young</h3>
            <p className="text-sm text-gray-400 mb-1">Appendectomy</p>
            <div className="text-4xl font-bold mb-2">70</div>
            <p className="text-sm text-yellow-400">Missing Informed Consent</p>
            <p className="text-sm text-yellow-400">Anti-coagulant missing</p>
            <div className="h-2 bg-darkbg rounded mt-2 mb-1 overflow-hidden">
              <div className="h-full bg-accent" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm">85% of tasks completed</p>
          </div>
          {/* George card */}
          <div className="bg-secondary rounded-lg p-4 w-72 shadow-md">
            <h3 className="font-semibold text-lg">George Mallory</h3>
            <p className="text-sm text-gray-400 mb-1">Inguinal Hernia Repair</p>
            <div className="text-4xl font-bold mb-2">93</div>
            <p className="text-sm text-green-400">All tasks completed</p>
            <div className="h-2 bg-darkbg rounded mt-2 mb-1 overflow-hidden">
              <div className="h-full bg-green-400 w-full"></div>
            </div>
            <p className="text-sm">100% of tasks completed</p>
          </div>
        </div>
        <div className="bg-secondary rounded-lg p-4 mt-6 shadow-md max-w-xl mx-auto">
          <h3 className="font-semibold text-lg mb-3">Hannah’s Outcome Concerns</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="80%">
                <PolarGrid stroke="#143d6c" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#eef2f7', fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 10]}
                  tick={{ fill: '#eef2f7', fontSize: 10 }}
                />
                <Radar
                  name="Hannah"
                  dataKey="A"
                  stroke="#81a7ef"
                  fill="#81a7ef"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      {/* Patient tasks */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Patient Tasks</h2>
        <div className="bg-secondary rounded-lg p-4 mx-auto max-w-sm text-center shadow-md">
          <h3 className="font-semibold mb-1">Readiness Score</h3>
          <div className="text-5xl font-bold mb-2">87</div>
          <p className="text-sm text-gray-400">You're well prepared for surgery</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex justify-between"><span>Oct 15</span><span>Eat 85 g protein</span></li>
            <li className="flex justify-between"><span>Oct 15</span><span>Chlorhexidine bath</span></li>
            <li className="flex justify-between"><span>Oct 16</span><span>Stop anti-coagulant</span></li>
          </ul>
        </div>
      </section>
      {/* Modern informed consent */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Modern Informed Consent</h2>
        <div className="bg-secondary rounded-lg p-4 mx-auto max-w-md shadow-md">
          <p className="mb-3">
            Welcome Hannah,<br />Dr. Grey has prepared this informed consent process for you.
          </p>
          <p className="mb-3">
            While you are learning about your appendectomy we will be collecting some data to make sure you are
            prepared for your surgery.
          </p>
          <p className="mb-4">Please enter the six-digit code sent to your email to continue:</p>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[idx] = el)}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="w-10 h-10 text-center text-lg rounded-md border border-primary bg-darkbg focus:outline-none text-white"
              />
            ))}
          </div>
        </div>
      </section>
      {/* Recovery time */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recovery Time</h2>
        <div className="bg-secondary rounded-lg p-4 mx-auto max-w-md text-center shadow-md">
          <p className="mb-4">
            Based on what you have heard so far adjust the slider to the number of days you expect to be back at work.
          </p>
          <input
            type="range"
            min={1}
            max={14}
            value={recoveryDays}
            onChange={(e) => setRecoveryDays(Number(e.target.value))}
            className="w-full accent-accent mb-2"
          />
          <div className="mb-2">Selected: {recoveryDays} days</div>
          <button className="px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90">
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}
