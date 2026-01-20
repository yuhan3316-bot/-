
import React, { useState, useEffect } from 'react';
import { TabType, ScheduleItem, Booking, Expense, PlanningTask } from './types';
import Navigation from './components/Navigation';
import Schedule from './components/Schedule';
import Bookings from './components/Bookings';
import ExpenseComponent from './components/Expense';
import Planning from './components/Planning';
import { MOCK_SCHEDULE, MOCK_BOOKINGS, MOCK_EXPENSES, MOCK_TASKS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const [isLoaded, setIsLoaded] = useState(false);

  // Persistence logic using LocalStorage
  const [scheduleData, setScheduleData] = useState<Record<string, ScheduleItem[]>>(() => {
    const saved = localStorage.getItem('trip_schedule');
    return saved ? JSON.parse(saved) : MOCK_SCHEDULE;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('trip_bookings');
    return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('trip_expenses');
    return saved ? JSON.parse(saved) : MOCK_EXPENSES;
  });

  const [tasks, setTasks] = useState<PlanningTask[]>(() => {
    const saved = localStorage.getItem('trip_tasks');
    return saved ? JSON.parse(saved) : MOCK_TASKS;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('trip_schedule', JSON.stringify(scheduleData));
    localStorage.setItem('trip_bookings', JSON.stringify(bookings));
    localStorage.setItem('trip_expenses', JSON.stringify(expenses));
    localStorage.setItem('trip_tasks', JSON.stringify(tasks));
  }, [scheduleData, bookings, expenses, tasks]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-beige-100">
        <div className="w-16 h-16 border-4 border-clay-green border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-bold text-brown-deep animate-pulse font-['Noto_Sans_TC']">載入您的專屬行程...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule': 
        return <Schedule data={scheduleData} setData={setScheduleData} />;
      case 'bookings': 
        return <Bookings items={bookings} setItems={setBookings} />;
      case 'expense': 
        return <ExpenseComponent items={expenses} setItems={setExpenses} />;
      case 'planning': 
        return <Planning items={tasks} setItems={setTasks} />;
      default: 
        return <Schedule data={scheduleData} setData={setScheduleData} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24 relative overflow-x-hidden bg-beige-100 font-['Noto_Sans_TC']">
      <header className="pt-8 px-6 pb-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-brown-deep tracking-tight">日本冬之旅</h1>
            <p className="text-sm font-bold text-clay-green mt-1">2025.02.15 - 02.22</p>
          </div>
          <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-beige-300 soft-shadow">
            <span className="text-xs font-bold text-brown-soft">名古屋・高山</span>
          </div>
        </div>
      </header>

      <main className="px-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
