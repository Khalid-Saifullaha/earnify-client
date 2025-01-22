import { Link } from "react-router-dom";

const Card = ({ task }) => {
  const {
    task_title,
    required_workers,
    payable_amount,
    completion_date,
    image: imageUrl,
    buyer,
    _id,
  } = task || {};
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      {/* Task Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={task_title}
          className="w-full h-40 object-cover rounded-t-md"
        />
      )}
      {/* Task Details */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">{task_title}</h2>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Buyer:</strong> {buyer.name}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Completion Date:</strong> {completion_date}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Payable Amount:</strong> ${payable_amount}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Required Workers:</strong> {required_workers}
        </p>
      </div>
      {/* View Details Button */}
      <Link to={`/task/${_id}`}>
        <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default Card;
