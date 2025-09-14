import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import Button from "../atoms/button";


function ModalGeneral({ Title, children, classBtns, isOpen, close, onSuccess, textAccept }) {
    return (
        <Dialog
        open={isOpen}
        as="div"
        className="relative z-[1000] focus:outline-none"
        onClose={close}
        >
            {/* 🔹 Backdrop */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/60 backdrop-blur-sm duration-300 ease-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-[400px] rounded-xl bg-white p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle
                            as="h3"
                            className="text-base font-sans text-center "
                            >
                            {Title}
                        </DialogTitle>

                        <div>{children}</div>

                        <div className={`mt-4 ${classBtns}`}>
                            <Button
                                className="items-center gap-2 rounded-lg px-3 py-2 "
                                onClick={onSuccess}
                            >
                                {textAccept}
                            </Button>
                            <Button
                                className="items-center gap-2 rounded-lg px-3 py-2 font-sans bg-transparent border !border-BgBlue font-semibold !text-BgBlue"
                                onClick={close}
                            >
                                إغلاق
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default ModalGeneral;
