import { Button } from "@/components/Button.tsx";
import { Dialog } from "@/components/intrinsic.ts";
import { MenuLink } from "@/components/Menu.tsx";
import type { ComponentChildren, Intent, JSX } from "@/types.ts";
import { cn, createPortal, IS_BROWSER } from "@/utils.ts";
import { useRandomID } from "@/hooks.ts";

export type ConfirmProps = {
  intent?: Intent;
  modalTitle?: ComponentChildren;
  label?: ComponentChildren;
  submitLabel?: ComponentChildren;
  cancelLabel?: ComponentChildren;
} & JSX.IntrinsicElements["form"];

export const ConfirmButton = ({
  children,
  label,
  intent,
  class: className,
  ...props
}: ConfirmProps) => {
  const id = useRandomID();

  return (
    <>
      <Button intent={intent} id={id} class={className}>{label}</Button>
      <ConfirmModal intent={intent} {...props}>
        {children}
      </ConfirmModal>
      <script>
        {`
document.querySelector('#${id}').addEventListener('click', function(e) {
  e.currentTarget.nextElementSibling.showModal();
});
      `}
      </script>
    </>
  );
};

export const ConfirmModal = (
  {
    children,
    modalTitle = "Confirm?",
    class: className,
    intent = "accent",
    cancelLabel = "Cancel",
    submitLabel = "OK",
    id: propId,
    ...props
  }: ConfirmProps,
) => {
  const altId = useRandomID();
  const id = propId || altId;

  return (
    <>
      <Dialog id={id}>
        {modalTitle && <h6 class="font-bold border-b">{modalTitle}</h6>}
        <form
          {...props}
          class={cn("overflow-auto flex flex-col gap-2", className)}
        >
          {children}
          <fieldset class="flex gap-2 justify-end">
            <Button formmethod="dialog">{cancelLabel}</Button>
            <Button intent={intent}>{submitLabel}</Button>
          </fieldset>
        </form>
      </Dialog>
      {!IS_BROWSER && (
        <script>
          {`
document.querySelector('#${id}').addEventListener('click', function(e) {
  if (e.target === this) {
    this.close();
  }
});
      `}
        </script>
      )}
    </>
  );
};

export function MenuConfirm({ children, label, ...props }: ConfirmProps) {
  const id = useRandomID();
  return (
    <>
      <MenuLink
        onClick={() =>
          document.querySelector<HTMLDialogElement>(`#${id}`)?.showModal()}
      >
        {label}
      </MenuLink>
      {IS_BROWSER &&
        createPortal(
          <ConfirmModal {...props} id={id}>{children}</ConfirmModal>,
          document.body,
        )}
    </>
  );
}
