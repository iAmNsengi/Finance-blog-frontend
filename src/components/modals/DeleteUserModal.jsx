import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const DeleteUserModal = ({
  isOpen,
  onClose,
  selectedUser,
  handleDeleteUser,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Kullanıcı Deaktif Etme Onayı
            </ModalHeader>
            <ModalBody>
              {selectedUser && (
                <div className="space-y-2">
                  <p>
                    <b>{selectedUser.userName}</b> ({selectedUser.email})
                    kullanıcısını deaktif etmek istediğinize emin misiniz?
                  </p>
                  <p className="text-gray-600">
                    Bu işlem sonucunda kullanıcı sisteme giriş yapamayacak,
                    ancak hesap bilgileri veritabanında korunacaktır. Hesabı
                    daha sonra tekrar aktifleştirebilirsiniz.
                  </p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onCloseModal}>
                İptal
              </Button>
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onPress={handleDeleteUser}
                isLoading={isLoading}
              >
                Deaktif Et
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
