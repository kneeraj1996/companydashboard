import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const DetailView = ({
  isOpen,
  title,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-message"
        className="relative w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close success message"
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        
        <h2 id="success-modal-title" className="text-xl font-bold text-gray-800">
          {title}
        </h2>
        <p id="success-modal-message" className="mt-2 text-sm text-gray-600">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DetailView;
