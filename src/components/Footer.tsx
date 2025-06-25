import React from 'react';
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between w-full py-4 px-8 text-sm text-black">
      <div className="mb-2 sm:mb-0">
        <p>
          Background by{' '}
          <Link
            href="https://opengameart.org/content/sunset-clouds-over-the-sea-pixel-background"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            OpenGameArt
          </Link>
        </p>
      </div>

      <div className="mb-2 sm:mb-0 text-center flex-grow">
        <p>&copy; 2025 MoodMate by Faiyaz</p>
      </div>

      <div className="flex gap-4">
        <Link
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <span className="flex items-center gap-1">
            <FaYoutube /> <span className="link-underline">YouTube</span>
          </span>
        </Link>

        <Link
          href="https://github.com/yourgithub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <span className="flex items-center gap-1">
            <FaGithub /> <span className="link-underline">GitHub</span>
          </span>
        </Link>
        <Link
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <span className="flex items-center gap-1">
            <FaXTwitter /> <span className="link-underline">Twitter (X)</span>
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
