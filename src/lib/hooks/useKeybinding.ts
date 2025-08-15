const aliases: { [key: string]: string } = {
  space: ' ',
  ctrl: 'control',
};

export function useKeybinding(keycombo: string, callback: () => void) {
  let [key, ...modifiers] = keycombo.toLowerCase().split('+').reverse();

  if (key in aliases) {
    key = aliases[key];
  }

  return (event: KeyboardEvent) => {
    const validEvent =
      !event.repeat && !(event.target instanceof HTMLInputElement);
    const validModifiers = modifiers.every(
      (mod) => `${mod}Key` in event && event[`${mod}Key` as keyof KeyboardEvent]
    );
    const validKey = event.key.toLowerCase() === key;
    if (validEvent && validModifiers && validKey) {
      callback();
    }
  };
}
