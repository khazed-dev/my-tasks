import { Preferences } from '@capacitor/preferences';

const KEY = 'tasks';

export async function getTasks() {
  const { value } = await Preferences.get({ key: KEY });
  return value ? JSON.parse(value) : [];
}

export async function saveTasks(tasks) {
  await Preferences.set({
    key: KEY,
    value: JSON.stringify(tasks),
  });
}
