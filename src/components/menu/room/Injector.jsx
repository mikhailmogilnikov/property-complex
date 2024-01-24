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

import { useEffect } from 'react';
import InjectorLogic from './InjectorLogic';


function InjectModal({ translate, isOpen, onOpenChange, selectedItems, selectedItemsList, unpinItem, moveItems, locations, currentLocationId }) {

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {translate.menu.tooltip.injectButton}
            </ModalHeader>
            <ModalBody>
              <InjectorLogic
                translate={translate}
                selectedItemsIds={selectedItems}
                selectedItemsList={selectedItemsList}
                unpinItem={unpinItem}
                locations={locations}
                currentLocationId={currentLocationId}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' onPress={onClose} onClick={moveItems}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function Injector({ translate, isItemSelected, selectedItems, selectedItemsList, unpinItem, moveItems, locations, currentLocationId }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    if(isOpen) onClose();
  }, [isItemSelected]);

  return (
    <AnimatePresence>
      {isItemSelected && (
        <motion.div
          initial={{ opacity: 0, y: '100%', scale: 0.1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '100%', scale: 0.1 }}
          className='w-full mb-1 h-12 px-3 items-center flex justify-between flex-shrink-0 origin-bottom'
        >
          <Button
            size='md'
            color='primary'
            variant='flat'
            className='w-full font-medium'
            onPress={onOpen}
          >
            {translate.menu.tooltip.injectButton} ({selectedItems.length})
          </Button>
          <InjectModal
            translate={translate}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            selectedItems={selectedItems}
            selectedItemsList={selectedItemsList}
            unpinItem={unpinItem}
            moveItems={moveItems}
            locations={locations}
            currentLocationId={currentLocationId}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Injector;
