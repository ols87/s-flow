import { modalStore, updateModalStore } from '@components/common/Modal';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

export function StreamModalComponent({ id }: any) {
  const updateModal = useSetRecoilState(modalStore(id));

  function close() {
    updateModal(updateModalStore({ isOpen: false }));
  }

  return (
    <>
      <p className="my-6" data-test="stream-modal-content">
        Please choose your stream type below. You can change your mind on the next screen if you select the wrong
        option.
      </p>

      <div className="flex justify-between">
        <Link data-test="stream-modal-vesting" className={`btn btn-outline w-[47.5%]`} href="/payment" onClick={close}>
          Vesting
        </Link>

        <Link data-test="stream-modal-payment" className={`btn btn-outline w-[47.5%]`} href="/payment" onClick={close}>
          Payment
        </Link>
      </div>
    </>
  );
}
