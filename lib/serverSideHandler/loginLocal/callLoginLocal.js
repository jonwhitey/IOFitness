import { loginLocal } from '../../api/customer';

export const callLoginLocal = async (user) => {
  if (user) {  
    try {
          const { localUser } = await loginLocal({ user });
         
          if (!localUser) {
            console.log('localLogin failed');
            // eslint-disable-next-line consistent-return
            return null;
          }
          return localUser;
        } catch (e) {
            return e;
        };
    }
}