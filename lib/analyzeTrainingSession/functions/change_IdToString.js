export const change_IdToString = (array) => {
  console.log('ChangeKeyVALUE TOSTRING');

  const result = array.map((o) => ({ ...o, _id: String(o._id) }));
  return result;
};
