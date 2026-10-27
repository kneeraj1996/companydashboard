
const PeopleCard = (props) => {
  const { item } = props;
  const { image, name } = item;
  return (
    <div className="w-full flex-shrink-0 px-2 pb-10 pt-2 rounded-xl overflow-hidden">
      <div className="relative h-[430px] w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-white p-3 shadow-lg">
        <img
          src="https://nipsidcardholders.com/wp-content/uploads/2025/10/DDV8-1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        <div className="relative flex h-full flex-col items-center justify-center rounded-md p-5 text-center text-white">
          <img
            src={image}
            alt="user"
            className="mb-3 h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
          />
          <h3 className="text-xl font-bold drop-shadow">{name}</h3>
          <p className="mt-1 text-sm drop-shadow">Family member</p>
          <span className="mt-4 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-gray-800">
            Family
          </span>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
