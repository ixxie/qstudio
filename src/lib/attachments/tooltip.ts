import type { Attachment } from 'svelte/attachments';

export function tooltip(
  content: string,
  {
    position,
    gap,
  }: {
    position?: 'top' | 'bottom' | 'left' | 'right';
    gap?: number;
  } = {}
): Attachment {
  return (element) => {
    let textbox: HTMLElement | null = null;

    const show = () => {
      position ??= 'bottom';
      gap ??= 10;

      // create element
      textbox = document.createElement('div');

      // add css
      textbox.style.cssText = `
          position: absolute;
          z-index: 1000;
          pointer-events: none;
          text-wrap: nowrap;
        `;
      // allow external styling
      textbox.className = 'tooltip';

      // add content
      textbox.innerHTML = content;

      // mount tooltip textbox
      document.body.appendChild(textbox);

      // position
      const targetRect = element.getBoundingClientRect();
      switch (position) {
        case 'top':
          textbox.style.left =
            targetRect.left +
            targetRect.width / 2 -
            textbox.offsetWidth / 2 +
            'px';
          textbox.style.top =
            targetRect.top - textbox.offsetHeight - gap + 'px';
          break;
        case 'bottom':
          textbox.style.left =
            targetRect.left +
            targetRect.width / 2 -
            textbox.offsetWidth / 2 +
            'px';
          textbox.style.top = targetRect.bottom + gap + 'px';
          break;
        case 'left':
          textbox.style.left =
            targetRect.left - textbox.offsetWidth - gap + 'px';
          textbox.style.top =
            targetRect.top +
            targetRect.height / 2 -
            textbox.offsetHeight / 2 +
            'px';
          break;
        case 'right':
          textbox.style.left = targetRect.right + gap + 'px';
          textbox.style.top =
            targetRect.top +
            targetRect.height / 2 -
            textbox.offsetHeight / 2 +
            'px';
          break;
      }
    };

    const hide = () => {
      if (textbox) {
        document.body.removeChild(textbox);
        textbox = null;
      }
    };

    element.addEventListener('mouseenter', show);
    element.addEventListener('mouseleave', hide);

    // cleanup
    return () => {
      element.removeEventListener('mouseenter', show);
      element.removeEventListener('mouseleave', hide);
      hide();
    };
  };
}
