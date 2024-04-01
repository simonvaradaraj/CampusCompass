import PropTypes from 'prop-types';
import SquareRow from './SquareRow';

function AverageHero({ratings}) {

    const calculateAverageSubscores = (ratings) => {
        if (ratings.length === 0) {
            return {
                social: 'N/A',
                events: 'N/A',
                happiness: 'N/A',
                officers: 'N/A',
                overall: 'N/A'
            };
        }

        const totalSocial = ratings.reduce((sum, rating) => sum + Number(rating.social), 0);
        const totalEvents = ratings.reduce((sum, rating) => sum + Number(rating.events), 0);
        const totalHappiness = ratings.reduce((sum, rating) => sum + Number(rating.happiness), 0);
        const totalOfficers = ratings.reduce((sum, rating) => sum + Number(rating.officers), 0);

        const averageSocial = Math.floor(totalSocial / ratings.length);
        const averageEvents = Math.floor(totalEvents / ratings.length);
        const averageHappiness = Math.floor(totalHappiness / ratings.length);
        const averageOfficers = Math.floor(totalOfficers / ratings.length);
        const averageOverall = ((totalSocial + totalEvents + totalHappiness + totalOfficers) / (ratings.length * 4)).toFixed(1)

        return {
            social: averageSocial,
            events: averageEvents,
            happiness: averageHappiness,
            officers: averageOfficers,
            overall: averageOverall
        };
    };

    const averageSubscores = calculateAverageSubscores(ratings);

    return (
        <div className="flex flex-row gap-10 mb-4">
            <div className="flex flex-col justify-center items-center w-[20%]">
                <h2 className="text-[70px] font-bold">{averageSubscores.overall}</h2>
                <p className="text-xl">Overall Score</p>
            </div>
            <div className="bg-gray-200 w-[25%] p-4 border-[1px] border-gray-400 ">
                <h1 className="font-bold text-xl mb-3">Section Average Scores</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h1 className="font-bold">Social</h1>
                        {averageSubscores.social != "N/A" ? <SquareRow number={Number(averageSubscores.social)}/> : "N/A"}
                    </div>
                    <div>
                        <h1 className="font-bold">Events</h1>
                        {averageSubscores.events != "N/A" ? <SquareRow number={Number(averageSubscores.events)}/> : "N/A"}
                    </div>
                    <div>
                        <h1 className="font-bold">Happiness</h1>
                        {averageSubscores.happiness != "N/A" ? <SquareRow number={Number(averageSubscores.happiness)}/> : "N/A"}
                    </div>
                    <div>
                        <h1 className="font-bold">Officers</h1>
                        {averageSubscores.officers != "N/A" ? <SquareRow number={Number(averageSubscores.officers)}/> : "N/A"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AverageHero

AverageHero.propTypes = {
    ratings: PropTypes.array.isRequired
}