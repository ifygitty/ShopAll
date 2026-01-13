import { Link } from "react-router-dom";

const UserAvatar = ({ user }) => {
  const emailInitial = user?.email?.[0]?.toUpperCase();

  return (
    <Link
      to="/account"
      className="relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-blue-600 text-white font-semibold text-sm shadow hover:scale-105 transition"
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{emailInitial}</span>
      )}
    </Link>
  );
};

export default UserAvatar;
