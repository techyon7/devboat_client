// Month Name List
const monthNamesList = () => [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const yearList = () => {
	let max = new Date().getFullYear(),
	    min = max - 169;

	let opt = [];

	for (let i = min; i<=max; i++){
		opt.push(i);
	}

	opt.reverse();
	return opt;
}

const dateList = () => {

	let opt = [];

	for (let i = 1; i<=31; i++){
		opt.push(i);
	}
	return opt;
}

const yearCollection = yearList;
const monthNamesCollection = monthNamesList;
const dateCollection = dateList;

const listCollection = () => ({yearCollection, monthNamesCollection, dateCollection});

export default listCollection;
