import Video from "next-video";

export default function VideoSection() {
  return (
    <div className="px-2">
      <div className="rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto">
        <Video
          src={
            "https://cdn.jsdelivr.net/gh/kknsukamarga/wisata-sukamarga-image/video/tes.mp4"
          }
        />
      </div>
    </div>
  );
}
