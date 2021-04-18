import { string } from "prop-types";

export const change_IdToString = (array) => {
  console.log('ChangeKeyVALUE TOSTRING');

  const result = array.map((o) => {
    const is_IdString = typeof(o._id) === 'string';
    console.log(is_IdString);
    return is_IdString ? ({...o}) : ({ ...o, _id: String(o._id) })});
  return result;
};
