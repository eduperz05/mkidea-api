
// TO DO preguntar donde poner esto
export const filterModel = (obj: any, keys: string[]) => {
  Object.keys(obj).forEach(key => {
    if (!keys.includes(key)) {
      delete obj[key];
    }
    if (obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
};