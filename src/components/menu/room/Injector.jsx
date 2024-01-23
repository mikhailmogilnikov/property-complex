import { Button } from '@nextui-org/button';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';

function InjectModal({isOpen, onOpenChange}) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Перенос предметов
            </ModalHeader>
            <ModalBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat
                consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
                et. Culpa deserunt nostrud ad veniam.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function Injector({ translate, isItemSelected, selectedItemsLength }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <AnimatePresence>
      {isItemSelected && (
        <motion.div
          initial={{ opacity: 0, y: '100%', scale: 0.1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '100%', scale: 0.1 }}
          className='w-full mb-1 h-12 px-3 items-center flex justify-between origin-bottom'
        >
          <Button
            size='md'
            color='primary'
            variant='flat'
            className='w-full font-medium'
            onPress={onOpen}
          >
            {translate.menu.tooltip.injectButton} ({selectedItemsLength})
          </Button>
          <InjectModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Injector;
