import moment from "moment";

export const getLastSevenDays = (date: Date) => {
    return [6, 5, 4, 3, 2, 1, 0].map(v => {

        var lastDate = new Date(date);
        lastDate.setDate(date.getDate() - v);
        return moment(lastDate).format('DD MMM');
    });
}