import PropTypes from 'prop-types';

function SquareRow({ number }) {
    const colors = ["#e51f1f", "#f2a134", "#FFFF00", "#bbdb44", "#2E7F18"];
    
    return (
        <div className="flex">
            {Array.from({ length: number }, (_, index) => (
                <div
                    key={index}
                    className={`w-6 h-6 mr-2`}
                    style={{ backgroundColor: colors[number - 1] }}
                ></div>
            ))}
        </div>
    );
}

export default SquareRow

SquareRow.propTypes = {
    number: PropTypes.number.isRequired, // Validate that message is a string and is required
};