import { LayoutGrid, UserRound, MessageSquareText, UsersRound } from 'lucide-react';

export const dashboardCardsData = [
  {
    id: 1,
    title: 'Total Aplikasi',
    value: '10',
    icon: LayoutGrid,
    iconBgColor: 'bg-[#CA2323]',
    showTrend: true,
    trendValue: '4%',
    trendType: 'up',
    trendPeriod: '30 hari'
  },
  {
    id: 2,
    title: 'Total Pengguna',
    value: '200',
    icon: UserRound,
    iconBgColor: 'bg-[#E45E14]',
    showTrend: true,
    trendValue: '4%',
    trendType: 'up',
    trendPeriod: '30 hari'
  },
  {
    id: 3,
    title: 'Total Testimoni',
    value: '75',
    icon: MessageSquareText,
    iconBgColor: 'bg-[#F0C419]',
    showTrend: false
  },
  {
    id: 4,
    title: 'Total Pengunjung',
    value: '500',
    icon: UsersRound,
    iconBgColor: 'bg-[#3B97D3]',
    showTrend: true,
    trendValue: '12%',
    trendType: 'down',
    trendPeriod: '30 hari'
  }
];
