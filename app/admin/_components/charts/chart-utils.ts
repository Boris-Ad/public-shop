import { Prisma } from '@prisma/client';
import {
  differenceInDays,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMonthOfInterval,
  startOfMonth,
  endOfMonth,
  isValid,
  subWeeks,
  subMonths,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { ru } from 'date-fns/locale';

export const fromRange = {
  week: {
    title: 'За текущую неделю',
    start: startOfWeek(new Date(), { locale: ru }),
    end: endOfWeek(new Date(), { locale: ru }),
  },
  last_week: {
    title: 'За прошлую неделю',
    start: startOfWeek(subWeeks(new Date(), 1), { locale: ru }),
    end: endOfWeek(subWeeks(new Date(), 1), { locale: ru }),
  },
  month: {
    title: 'За текущий месяц',
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
  last_month: {
    title: 'За прошлый месяц',
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  },
  six_month: {
    title: 'За шесть месяцев',
    start: startOfMonth(subMonths(new Date(), 5)),
    end: endOfMonth(new Date()),
  },
};

export function getChartData(startDate?: string, endDate?: string) {
  const range = getCalendarRange(startDate, endDate);

  const { defaultStartDate, defaultEndDate } = defaultRange();
  const start = checkDate(startDate);
  const end = checkDate(endDate);

  if (start && end) {
    if (range === 'days') return chartArray(eachDayOfInterval({ start, end }));
    if (range === 'month') return chartArray(eachMonthOfInterval({ start, end }));
  }

  return chartArray(eachDayOfInterval({ start: defaultStartDate, end: defaultEndDate }));
}

export function createChartData(
  dbData: { createdAt: Date; price: number }[],
  chartArr: { date: Date; totalSales: number }[],
  start: string | undefined,
  end: string | undefined
) {
  const range = getCalendarRange(start, end);
  const chartData = dbData.reduce((data, order) => {
    const res = data.find(item => {
      if (range === 'days') return isSameDay(item.date, order.createdAt);
      if (range === 'month') return isSameMonth(item.date, order.createdAt);
    });
    if (res == null) return data;
    res.totalSales += order.price;
    return data;
  }, chartArr);
  return chartData;
}

function getCalendarRange(startDate?: string, endDate?: string): 'days' | 'month' {
  const start = checkDate(startDate);
  const end = checkDate(endDate);
  if (start && end) {
    const days = differenceInDays(end, start);
    if (days < 31) {
      return 'days';
    }
    return 'month';
  }
  return 'days';
}

export function getTickFormatDate(startDate?: string, endDate?: string) {
  const start = checkDate(startDate);
  const end = checkDate(endDate);
  const weekFormat = { short: 'EEE', long: 'dd MMM EEEE' };
  const monthFormat = { short: 'dd', long: 'dd MMMM' };
  const yearFormat = { short: 'MMM', long: 'MMMM' };

  if (start && end) {
    const days = differenceInDays(end, start);
    if (days < 8) return weekFormat;
    if (days < 31) return monthFormat;
    return yearFormat;
  }

  return weekFormat;
}

function chartArray(arr: Date[]) {
  return arr.map(date => ({ date, totalSales: 0 }));
}

function defaultRange() {
  const defaultStartDate = fromRange.week.start;
  const defaultEndDate = fromRange.week.end;

  return { defaultStartDate, defaultEndDate };
}

export function checkDate(date: string | null | undefined) {
  if (date && isValid(new Date(date))) {
    return new Date(date);
  }
  return null;
}

export const dbRange = (startDate?: string, endDate?: string) => {
  const createdAtQuery: Prisma.OrderWhereInput['createdAt'] = {};
  const { defaultStartDate, defaultEndDate } = defaultRange();

  const start = checkDate(startDate);
  const end = checkDate(endDate);

  if (start && end) {
    createdAtQuery.gte = start;
    createdAtQuery.lte = end;
  } else {
    createdAtQuery.gte = defaultStartDate;
    createdAtQuery.lte = defaultEndDate;
  }
  return createdAtQuery;
};

// const title = 'С ' + format(start, 'dd MMM', { locale: ru }) + ' - ' + format(end, 'dd MMM', { locale: ru })
