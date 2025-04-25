function generateChartData(days: number, memberCount: any) {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      return {
        date: date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }),
        count: memberCount,
      };
    });
  }
  
  export async function getUsersGraph(members: { joinedTimestamp: number }[]) {
    const now = Date.now();
  
    // --- WEEK ---
    const weekData = Array.from({ length: 7 }).map((_, i) => {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);
      dayStart.setDate(dayStart.getDate() - (6 - i));
  
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);
  
      const count = members.filter(m => m.joinedTimestamp >= dayStart.getTime() && m.joinedTimestamp < dayEnd.getTime()).length;
  
      return {
        date: dayStart.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }),
        count,
      };
    });
  
    // --- MONTH ---
    const monthData = Array.from({ length: 30 }).map((_, i) => {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);
      dayStart.setDate(dayStart.getDate() - (29 - i));
  
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);
  
      const count = members.filter(m => m.joinedTimestamp >= dayStart.getTime() && m.joinedTimestamp < dayEnd.getTime()).length;
  
      return {
        date: dayStart.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }),
        count,
      };
    });
  
    // --- YEAR ---
    const yearData = Array.from({ length: 12 }).map((_, i) => {
      const start = new Date();
      start.setMonth(start.getMonth() - (11 - i), 1);
      start.setHours(0, 0, 0, 0);
  
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
  
      const count = members.filter(m => m.joinedTimestamp >= start.getTime() && m.joinedTimestamp < end.getTime()).length;
  
      return {
        date: start.toLocaleString('default', { year: "numeric", month: 'short' }),
        count,
      };
    });
  
    return {
      week: weekData,
      month: monthData,
      year: yearData,
    };
  }
  
  