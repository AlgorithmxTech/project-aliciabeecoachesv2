import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaLink,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface ShareMenuProps {
  show: boolean;
  slug: string;
  onClose: () => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ show, slug, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const articleUrl = typeof window !== 'undefined' ? `${window.location.origin}/articles/${slug}` : '';

  // 🔍 Click-outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(articleUrl);
    alert('Link copied to clipboard!');
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={ref}
          className="absolute top-8 right-2 z-50 bg-white shadow-lg rounded-lg p-3 border w-56"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex flex-col gap-3 text-sm">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaFacebookF /> Share on Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-sky-400"
            >
              <FaXTwitter /> Share on X
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?url=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-800"
            >
              <FaLinkedinIn /> Share on LinkedIn
            </a>
            <a
              href={`https://www.instagram.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500"
            >
              <FaInstagram /> Share on Instagram
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 hover:text-green-600"
            >
              <FaLink /> Copy Link
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareMenu;