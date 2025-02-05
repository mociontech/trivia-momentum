export default function Loader() {
  return (
    <div className="absolute z-50 h-screen w-screen flex justify-center items-center bg-black/10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 -960 960 960"
        width="500"
        className="animate-spin w-[100px] h-[100px] mb-[100px]"
      >
        <path
          className="fill-black"
          d="M480-80q-84 0-157-31t-127-85q-54-54-85-127T80-480q0-84 31-157t85-127q54-54 127-85t157-31q12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80Z"
        />
      </svg>
    </div>
  );
}
