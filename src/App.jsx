import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function App() {
  const [animate, setAnimate] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const contractAddress = "0x1234567890abcdef1234567890abcdef12345678";

  useEffect(() => {
    // Start GIF animation after 1.5 seconds
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1500);

    // Show NFT after GIF animation completes (1.5s delay + 0.75s animation)
    const nftTimer = setTimeout(() => {
      setShowNFT(true);
    }, 2250);

    return () => {
      clearTimeout(timer);
      clearTimeout(nftTimer);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 relative overflow-hidden">
      <motion.img
        src="/token.gif"
        alt="Token"
        className="absolute"
        initial={{
          // Start in center
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          width: '500px',
          height: '500px',
          opacity: 0
        }}
        animate={animate ? {
          // Animate to top left
          left: '20px',
          top: '20px',
          x: 0,
          y: 0,
          width: '60px',
          height: '60px',
          opacity: 1
        } : {
          opacity: 1
        }}
        transition={{
          duration: .75,
          ease: 'easeInOut'
        }}
      />

      {/* Contract Address Section */}
      <motion.div 
        className="absolute top-4 right-4 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={showNFT ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <button
          onClick={handleCopy}
          className="p-1 cursor-crosshair"
          aria-label="Copy contract address"
        >
          <motion.div
            initial={false}
            animate={copied ? { rotate: 0 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            {copied ? (
              <Check className="size-3 text-green-400" />
            ) : (
              <Copy className="size-3 text-zinc-300" />
            )}
          </motion.div>
        </button>
        <span className="text-zinc-300 font-mono text-xs">
          {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
        </span>
      </motion.div>

      {/* NFT Image that fades in after animation */}
      <motion.img
        src="/nft.png"
        alt="NFT"
        className="scale-[50%] md:scale-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showNFT ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* X.com link in bottom right */}
      <motion.a
        href="https://x.com/nofunctiontoken"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4"
        initial={{ opacity: 0 }}
        animate={showNFT ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img
          src="/x.png"
          alt="X"
          className="w-8 h-8 hover:opacity-80 transition-opacity"
        />
      </motion.a>
    </div>
  );
}