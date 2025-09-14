import React, { useState, useRef, useEffect } from "react";
import useGetStories from "../../../hooks/use-get-stories";

// const initialStories = [
//   "https://picsum.photos/id/1011/300/300",
//   "https://picsum.photos/id/1012/300/300",
//   "https://picsum.photos/id/1013/300/300",
//   "https://picsum.photos/id/1014/300/300",
//   "https://picsum.photos/id/1015/300/300",
// ];

export default function StoryCarousel() {
    const {data} = useGetStories();
    // console.log(data)

    const [stories, setStories] = useState([]);
    useEffect(() => {
    if (data?.results) {
        setStories(data.results.map(item => ({ url: item.image, seen: false })));
    }
    }, [data]);
    // console.log(stories)
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const scrollRef = useRef(null);

    const handleStoryClick = (index) => {
        const newStories = [...stories];
        newStories[index].seen = true;

        const [seenStory] = newStories.splice(index, 1);
        newStories.push(seenStory);

        setStories(newStories);
        setLightboxIndex(index);
        setProgress(0);
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
        const scrollAmount = 160;
        scrollRef.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
        }
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % stories.length);
        setProgress(0);
    };

    const prevImage = () => {
        setLightboxIndex((prev) =>
        prev === 0 ? stories.length - 1 : prev - 1
        );
        setProgress(0);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        setProgress(0);
    };

    // تایمر اتوماتیک 10 ثانیه
    useEffect(() => {
        if (lightboxIndex === null) return;

        const interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
            nextImage();
            return 0;
            }
            return prev + 1; // هر 100 میلی ثانیه 1% افزایش
        });
        }, 100); // 100ms * 100 = 10s

        return () => clearInterval(interval);
    }, [lightboxIndex]);

    return (
        <div className="relative flex mt-20 items-center">
            {/* دکمه چپ */}
            <button
                onClick={() => scroll("left")}
                className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 opacity-80 hover:opacity-100 transition"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* استوری‌ها */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 py-4 px-8 scrollbar-hide w-full"
            >
                {stories?.map((story, idx) => (
                <div
                    key={idx}
                    onClick={() => handleStoryClick(idx)}
                    className={`w-[72px] h-[72px] flex-shrink-0 rounded-full p-1 cursor-pointer transition-all duration-300 ${
                    story.seen
                        ? "border-4 border-gray-400"
                        : "border-4 border-orange-400"
                    }`}
                >
                    <img
                    src={story?.url}
                    alt={`story-${idx}`}
                    className="w-full h-full rounded-full object-cover"
                    />
                </div>
                ))}
            </div>

            {/* دکمه راست */}
            <button
                onClick={() => scroll("right")}
                className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 opacity-80 hover:opacity-100 transition"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70">
                {/* Timeline */}
                    <div className="w-full max-w-[480px] fixed top-0 h-1 bg-gray-400 rounded-full mb-4 overflow-hidden">
                        <div
                            className="h-full bg-orange-400 rounded-full transition-[width] duration-100 linear"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                {/* تصویر بزرگ */}
                <img
                    src={stories[lightboxIndex].url}
                    alt="Lightbox"
                    className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
                />

                {/* دکمه بستن */}
                <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 text-white text-2xl font-bold"
                >
                    ✕
                </button>

                {/* دکمه چپ */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 text-white text-3xl font-bold"
                >
                    ◀
                </button>

                {/* دکمه راست */}
                <button
                    onClick={nextImage}
                    className="absolute right-4 text-white text-3xl font-bold"
                >
                    ▶
                </button>
                </div>
            )}
        </div>
    );
}
