"use client";

import ThemeButton from "@/components/theme-button";
import { useState } from "react";
import {
  useAudiomackPlaylists,
  useAudiomackTracks,
  AudiomackPlaylist,
  AudiomackTrack,
} from "@/lib/spotify";

function msToMinSec(ms: number) {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function Page() {
  const [username, setUsername] = useState("systemexe"); // Default Audiomack username for demo
  const [selectedPlaylist, setSelectedPlaylist] = useState<AudiomackPlaylist | null>(null);

  const {
    data: playlists,
    isLoading: playlistsLoading,
    error: playlistsError,
  } = useAudiomackPlaylists(username);

  const {
    data: tracks,
    isLoading: tracksLoading,
    error: tracksError,
  } = useAudiomackTracks(selectedPlaylist?.id || "");

  const isLoading = playlistsLoading || (selectedPlaylist && tracksLoading);
  const error = playlistsError || tracksError;
  const songs: AudiomackTrack[] = tracks || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Nav */}
      <nav className="fixed top-0 left-0 w-full z-20 flex items-center px-4 py-3 justify-between bg-background/70 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <span className="font-bold text-lg tracking-tight">My Music</span>
        <div className="flex items-center gap-2">
          {/* Token dialog button removed for Audiomack */}
          <ThemeButton />
        </div>
      </nav>
      {/* Audiomack username input */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          placeholder="Enter Audiomack username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <span className="text-xs text-muted-foreground">Audiomack username</span>
      </div>
      {/* Playlist selector */}
      {playlists && playlists.length > 0 && (
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Select Playlist:</label>
          <select
            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            value={selectedPlaylist?.id || ""}
            onChange={e => {
              const pl = playlists.find(p => p.id === e.target.value) || null;
              setSelectedPlaylist(pl);
            }}
          >
            <option value="">-- Select a playlist --</option>
            {playlists.map(pl => (
              <option key={pl.id} value={pl.id}>
                {pl.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Page body */}
      <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading && (
            <div className="col-span-full text-center py-8 text-lg">
              Loading songs from Audiomack...
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-8 text-red-600">
              {error.message}
            </div>
          )}
         {!isLoading && !error && songs.length === 0 && (
           <div className="col-span-full text-center py-8 text-muted-foreground">
             No songs found in this playlist.
           </div>
         )}
         {!isLoading &&
           !error &&
           songs.map((song) => (
             <div
               key={song.id}
               className="rounded-2xl shadow-lg border bg-card/80 dark:bg-card/70 overflow-hidden flex flex-col transition-all hover:scale-105 duration-200"
             >
               <div className="p-0">
                 <img
                   src={song.cover || ""}
                   alt={song.title}
                   className="aspect-square object-cover w-full rounded-t-2xl"
                 />
               </div>
               <div className="flex-1 flex flex-col justify-between px-4 py-3">
                 <div>
                   <h3 className="font-semibold truncate">{song.title}</h3>
                   <p className="text-sm opacity-70">
                     {song.artist}
                   </p>
                   <p className="text-xs opacity-60">{song.album}</p>
                 </div>
                 <div className="flex justify-between mt-2 items-center">
                   <span className="text-xs text-muted-foreground">
                     {msToMinSec(song.duration)}
                   </span>
                   {song.stream_url ? (
                     <a
                       href={song.stream_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 shadow"
                       style={{ border: 0 }}
                       title="Play"
                     >
                       ▶
                     </a>
                   ) : (
                     <span className="w-9 h-9 flex items-center justify-center text-muted-foreground">
                       —
                     </span>
                   )}
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
