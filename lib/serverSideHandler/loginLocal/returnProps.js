
export const returnProps = (localUser, trainingSession) => {
if (!localUser) {
    console.log('localLogin failed');
    // eslint-disable-next-line consistent-return
    return { props: { localUser: null } };
  }
  if (!trainingSession) {
    console.log('no trainingSession found');
    // eslint-disable-next-line consistent-return
    return {
      redirect: {
        permanent: false,
        destination: '/build-program',
      },
    };
  }
  // eslint-disable-next-line consistent-return
  return {
    props: {
      trainingSession,
      localUser,
    },
  };
}