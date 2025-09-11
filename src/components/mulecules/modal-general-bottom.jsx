import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
    Transition,
    TransitionChild
  } from "@headlessui/react";
import Button from "../atoms/button";
  
function ModalGeneralBottom({
    Title,
    children,
    classBtns,
    isOpen,
    close,
    onSuccess,
    textAccept,
    classTitle
    }) {
    return (
        <Transition appear show={isOpen}>
            <Dialog
                as="div"
                className="relative z-[1000] focus:outline-none"
                onClose={close}
                >
                {/* 🔹 Backdrop */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </TransitionChild>

                {/* 🔹 Container پایین صفحه */}
                <div className="fixed inset-0 z-10 flex items-end justify-center">
                    <TransitionChild
                        enter="transform transition ease-out duration-300"
                        enterFrom="translate-y-full opacity-0"
                        enterTo="translate-y-0 opacity-100"
                        leave="transform transition ease-in duration-200"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="translate-y-full opacity-0"
                    >
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-t-2xl bg-white p-4 shadow-lg duration-300 ease-out 
                            data-closed:translate-y-full data-open:translate-y-0"
                            >
                            <DialogTitle
                                as="h3"
                                className={`text-base font-sans text-center mb-4 ${classTitle}`}
                            >
                                {Title}
                            </DialogTitle>

                            <div>{children}</div>

                            <div className={`mt-4 flex gap-2 ${classBtns}`}>
                                <Button
                                    className="items-center gap-2 rounded-lg px-3 py-2"
                                    onClick={onSuccess}
                                    >
                                    {textAccept}
                                </Button>
                                <Button
                                    className="items-center gap-2 rounded-lg px-3 py-2 font-sans bg-transparent border !border-BgCustom font-semibold !text-BgCustom"
                                    onClick={close}
                                    >
                                    بازگشت
                                </Button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ModalGeneralBottom;
