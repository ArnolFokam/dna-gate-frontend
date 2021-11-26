export const get7DaysHistogram = (data: string[]) => {
    const today = new Date();

    // these array values represents the day -n from today
    return [6, 5, 4, 3, 2, 1, 0].map(v => {

        var startDate = new Date(today);
        startDate.setDate(today.getDate() - v - 1);

        var endDate = new Date(today);
        endDate.setDate(today.getDate() - v);
        
        const events = data.filter(a => {
            var date = new Date(a);
            return (date >= startDate && date <= endDate);
          });
        return events.length; 
    });
}