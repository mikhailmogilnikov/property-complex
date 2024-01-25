'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/store';
import transitions from '@/constants/transitions';

const Gallery = observer(() => {
  const { galleryStore } = useStore();

  const selectedId = galleryStore.getSelectedId();
  const imageLink = galleryStore.getImageLink();

  return (
    <AnimatePresence>
      {selectedId && (
        <aside className='absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute top-0 left-0 bottom-0 right-0 bg-white/40 dark:bg-black/40 backdrop-blur-3xl z-10'
            onClick={() => galleryStore.setSelectedId(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={transitions.menu.gallery}
            onClick={() => galleryStore.setSelectedId(null)}
            className='w-[95vw] lg:w-[80vw] aspect-video overflow-hidden bg-white/50 dark:bg-default/50 rounded-3xl shadow-medium z-20'
          >
            <Image
              width={1000}
              height={600}
              className='w-full h-full'
              src={imageLink}
              alt='full width image'
            />
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
});

export default Gallery;
