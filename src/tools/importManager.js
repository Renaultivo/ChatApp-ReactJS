export function getAll(context) {
  return context.keys().map(key => key.split('/')[1]);
}