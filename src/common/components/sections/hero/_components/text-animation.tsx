'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import RedoAnimText from './redo-text-animation';
import CursorBlinker from './cursor-blinker';
import WordFadeIn from '@/common/components/ui/animation/word-fade-in';

export interface ITextAnimationProps {
  delay: number;
  baseText: string;
}

export default function TextAnimation({
  delay,
  baseText,
}: ITextAnimationProps) {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest),
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: 'tween',
      delay: delay,
      duration: 1,
      ease: 'easeInOut',
      onComplete: () => {
        setDone(true);
      },
    });
    return controls.stop;
  }, []);

  return (
    <motion.span
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      className="mb-10 h-64 max-w-96 text-start text-[2rem] font-extrabold lg:text-[3rem]"
    >
      <motion.span>{displayText}</motion.span>

     <div className='my-6'>
     <WordFadeIn
        words=" Unleashing creativity, crafting delightful experiences, and
              leaving lasting impressions. Join me on this exciting journey!"
      />
     </div>

      {/* <RedoAnimText delay={delay + 1} /> */}
      {/* <CursorBlinker /> */}
    </motion.span>
  );
}
