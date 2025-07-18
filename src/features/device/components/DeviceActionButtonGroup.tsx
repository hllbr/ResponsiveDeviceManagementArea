interface DeviceActionButtonGroupProps {
  onRotate: () => void;
}

const DeviceActionButtonGroup: React.FC<DeviceActionButtonGroupProps> = ({
  onRotate,
}) => (
  <div className="bg-yellow-200 rounded-lg p-2 grid gap-3 shadow w-[60px] h-[70vh] place-items-center">
    <button
      onClick={onRotate}
      className="bg-blue-500 hover:bg-blue-600 text-white w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors"
      aria-label="Ekranı döndür"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white flex-shrink-0"
      >
        <path
          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C7.75097 22 4.11466 19.4097 2.64124 15.75H4.6863C5.97474 18.1581 8.73679 19.75 12 19.75C16.2773 19.75 19.75 16.2773 19.75 12C19.75 7.72266 16.2773 4.25 12 4.25V7L7 3.5L12 0V2Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
);

export default DeviceActionButtonGroup;
