import { useRef } from "react";

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleStartCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  return (
    <div>
      <h2>리액트 영역입니다.</h2>
      <button onClick={handleStartCapture}>비디오 시작</button>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}
