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

import { useEffect, useState } from 'react';
import InjectorLogic from './InjectorLogic';

function InjectModal({
  translate,
  isOpen,
  onOpenChange,
  selectedItems,
  selectedItemsList,
  unpinItem,
  moveItems,
  locations,
  currentLocationId,
  getRoomsInFloor,
  currentRoomId,
  isAction,
  setIsAction,
  setGroupSelected,
  downloadTransferReportGeneration
}) {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const actionMoveItem = () => {
    if (selectedRoomId !== null) {
      moveItems(selectedRoomId);
      setIsAction(true);
    }
  };


  const action = () => {
    if(isAction)
      downloadTransferReportGeneration(selectedRoomId);
    else
      actionMoveItem(selectedRoomId);
  }

  useEffect(() => {
    if (isAction) {
      setIsAction(false);
      setGroupSelected([]);
    }
  }, [isOpen]);

  return (
    <Modal
      scrollBehavior='inside'
      backdrop='blur'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ wrapper: 'overflow-hidden' }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {isAction
                ? 'Перенос завершен успешно'
                : translate.menu.tooltip.injectButton}
            </ModalHeader>
            <ModalBody className='p-0'>
              <InjectorLogic
                translate={translate}
                selectedItemsIds={selectedItems}
                selectedItemsList={selectedItemsList}
                unpinItem={unpinItem}
                locations={locations}
                currentLocationId={currentLocationId}
                getRoomsInFloor={getRoomsInFloor}
                currentRoomId={currentRoomId}
                setSelectedRoomId={setSelectedRoomId}
                isAction={isAction}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color='default'
                variant='flat'
                className='font-medium'
                onPress={onClose}
              >
                {translate.menu.content.room.modal.close}
              </Button>

              <Button
                color={isAction ? 'success' : 'primary'}
                onClick={action}
                isDisabled={selectedRoomId === null}
                className='text-white font-medium'
              >
                {isAction
                  ? 'Сформировать отчет'
                  : translate.menu.content.room.modal.action}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function Injector({
  translate,
  isItemSelected,
  selectedItems,
  selectedItemsList,
  unpinItem,
  moveItems,
  locations,
  currentLocationId,
  getRoomsInFloor,
  currentRoomId,
  setGroupSelected,
  downloadTransferReportGeneration
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isAction, setIsAction] = useState(false);

  useEffect(() => {
    if (isOpen) onClose();
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
            getRoomsInFloor={getRoomsInFloor}
            currentRoomId={currentRoomId}
            isAction={isAction}
            setIsAction={setIsAction}
            setGroupSelected={setGroupSelected}
            downloadTransferReportGeneration={downloadTransferReportGeneration}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Injector;
