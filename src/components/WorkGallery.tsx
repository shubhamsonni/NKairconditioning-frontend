"use client";

import Image from "next/image";
import type { GalleryPage } from "@/data/services";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from "lucide-react";

function VideoPlayer({ src, label }: { src: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const format = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  async function toggle() {
    if (!video.current) return;
    if (video.current.paused) {
      try { await video.current.play(); setStarted(true); } catch { setPlaying(false); }
    } else video.current.pause();
  }
  return <div className="project-video" ref={frame}>
    <video ref={video} src={`${src}#t=0.1`} preload="metadata" playsInline muted={muted}
      aria-label={label} onClick={toggle} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)} onError={() => setError(true)}
      onLoadedMetadata={e => setDuration(Number.isFinite(e.currentTarget.duration) ? e.currentTarget.duration : 0)}
      onTimeUpdate={e => setTime(e.currentTarget.currentTime)} />
    {!started && !error && <button className="video-preview" onClick={toggle} aria-label={`Play ${label}`}>
      <span className="video-play-icon"><Play size={30} fill="currentColor"/></span><span>Watch project video</span>
    </button>}
    {error ? <div className="video-error">Unable to load this video. <a href={src}>Open video</a></div> :
      <div className="video-toolbar">
        <input className="video-seek" type="range" min={0} max={duration || 0} step="0.1" value={time} aria-label="Video progress"
          onChange={e => { if (video.current) { video.current.currentTime = Number(e.target.value); setTime(Number(e.target.value)); } }}/>
        <div className="video-actions">
          <button onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>{playing ? <Pause size={19}/> : <Play size={19}/>}</button>
          <span>{format(time)} / {format(duration)}</span>
          <button className="video-volume" onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute video" : "Mute video"}>{muted ? <VolumeX size={19}/> : <Volume2 size={19}/>}</button>
          <button onClick={() => { const result = frame.current?.requestFullscreen(); result?.catch(() => {}); }} aria-label="Fullscreen video"><Maximize size={19}/></button>
        </div>
      </div>}
  </div>;
}

export default function WorkGallery({ slug, initialPage, name }: { slug: string; initialPage: GalleryPage; name: string }) {
  const [data, setData] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController|null>(null);
  const retryPage = useRef(1);
  useEffect(() => () => request.current?.abort(), []);
  const {page, totalPages: pages, items, total, pageSize} = data;
  const start = (page - 1) * pageSize;
  async function changePage(next: number) {
    request.current?.abort();
    const controller = new AbortController(); request.current = controller;
    retryPage.current = next; setLoading(true); setError("");
    try {
      const response = await fetch(`/api/catalog/services/${encodeURIComponent(slug)}/media?page=${next}`, {signal: controller.signal});
      if (!response.ok) throw new Error("Unable to load this page. Please try again.");
      const result = await response.json() as GalleryPage;
      if (!controller.signal.aborted) { setData(result); root.current?.scrollIntoView({behavior:"smooth",block:"start"}); }
    } catch (failure) {
      if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : "Unable to load this page.");
    } finally { if (!controller.signal.aborted) setLoading(false); }
  }
  return <div ref={root} className="project-gallery" aria-busy={loading}>
    <p className="gallery-count" aria-live="polite">{loading ? "Loading gallery…" : `Showing ${total ? start + 1 : 0}–${Math.min(start + pageSize, total)} of ${total} photos & videos`}</p>
    {error && <p className="gallery-error" role="alert">{error} <button onClick={() => changePage(retryPage.current)}>Retry</button></p>}
    <div className="project-media-grid">{items.map((item, i) =>
      item.type === "video" ? <VideoPlayer key={item.src} src={item.src} label={`${name} work video ${start + i + 1}`}/> :
        <a className="project-photo" key={item.src} href={item.src} target="_blank" rel="noreferrer" aria-label={`Open ${name} work photo ${start + i + 1}`}>
          <Image src={item.src} alt={`${name} work ${start + i + 1}`} fill sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"/>
        </a>
    )}</div>
    <nav className="gallery-pagination" aria-label="Gallery pages">
      <button disabled={loading || page === 1} onClick={() => changePage(page - 1)}><ChevronLeft size={16}/> Previous</button>
      <div className="gallery-page-numbers">{Array.from({ length: pages }, (_, i) => i + 1).map(number =>
        <button key={number} disabled={loading} aria-label={`Page ${number}`} aria-current={number === page ? "page" : undefined} onClick={() => changePage(number)}>{number}</button>
      )}</div>
      <button disabled={loading || page === pages} onClick={() => changePage(page + 1)}>Next <ChevronRight size={16}/></button>
    </nav>
  </div>;
}
