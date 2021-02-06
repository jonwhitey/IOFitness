/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
export const executeTimerLogic = (liveGroup, num, groupedExercises) => {
  const {
    groupNum: liveGroupNum,
    exerciseIndex: liveExerciseIndex,
    workOrRest: liveWorkOrRest,
    setNumber: liveSetNumber,
    totalSets: liveTotalSets,
    exercise: liveExercise,
  } = liveGroup;

  const numberOfExercises = (liveGroupNumber) => {
    return groupedExercises[liveGroupNumber].exercises.length;
  };

  const { _id: liveExcID } = liveExercise;
  const isLastRound = liveGroup.setNumber === liveGroup.totalSets;
  const isLastExercise =
    groupedExercises[liveGroupNum].exercises[numberOfExercises(liveGroupNum) - 1]._id === liveExcID;
  const isFirstExercise = groupedExercises[liveGroupNum].exercises[0]._id === liveExcID;
  const isRest = liveWorkOrRest === 'rest';
  const isStart = liveWorkOrRest === 'start';
  const isWork = liveWorkOrRest === 'work';
  const isFirstSet = liveSetNumber === 1;
  const numberOfGroups = Object.keys(groupedExercises).length;

  const isGroupComplete = () => {
    return isLastRound && isLastExercise && isRest;
  };

  const isFirstExerciseOfGroup = () => {
    return isFirstSet && isFirstExercise && isWork;
  };

  const isLastExerciseOfSession = (groupNum) => {
    const isLastGroup = numberOfGroups === groupNum;
    return !!(isLastGroup && isLastRound && isLastExercise && isWork);
  };

  const isFirstExerciseOfSession = (groupNum, setNumber, exerciseIndex, workOrRest) => {
    return !!(groupNum === 1 && setNumber === 1 && exerciseIndex === 0 && workOrRest === 'work');
  };

  let groupNum;
  let setNumber;
  let exerciseIndex;
  let workOrRest;

  if (num === 1) {
    console.log({ liveGroupNum });
    groupNum =
      isGroupComplete() && liveGroupNum !== numberOfGroups ? liveGroupNum + 1 : liveGroupNum;
    setNumber =
      isLastExercise && isRest && !isLastRound
        ? liveSetNumber + 1
        : isGroupComplete()
        ? 1
        : liveSetNumber;

    exerciseIndex =
      isStart || (isLastExercise && isRest)
        ? 0
        : isRest
        ? liveExerciseIndex + 1
        : liveExerciseIndex;

    workOrRest = isStart ? 'work' : isRest ? 'work' : 'rest';

    // eslint-disable-next-line no-unused-expressions
    isLastExerciseOfSession(liveGroupNum, liveSetNumber, liveExerciseIndex, liveWorkOrRest)
      ? ([groupNum, setNumber, exerciseIndex, workOrRest] = [
          liveGroupNum,
          liveSetNumber,
          liveExerciseIndex,
          'work',
        ])
      : null;
  }

  if (num === -1) {
    console.log({ groupNum });
    console.log(groupNum !== 1);
    groupNum = isFirstExerciseOfGroup() && liveGroupNum !== 1 ? liveGroupNum - 1 : liveGroupNum;
    console.log({ groupNum });
    setNumber =
      isFirstExercise && isWork && !isFirstSet
        ? liveSetNumber - 1
        : isFirstExerciseOfGroup()
        ? groupedExercises[groupNum].totalSets
        : liveSetNumber;

    exerciseIndex =
      groupNum !== liveGroupNum || (isFirstExercise && isWork)
        ? numberOfExercises(groupNum) - 1
        : isWork && numberOfExercises(groupNum) > 1
        ? liveExerciseIndex - 1
        : liveExerciseIndex;

    workOrRest = isWork ? 'rest' : 'work';

    isFirstExerciseOfSession(liveGroupNum, liveSetNumber, liveExerciseIndex, liveWorkOrRest)
      ? ([groupNum, setNumber, exerciseIndex, workOrRest] = [
          liveGroupNum,
          liveSetNumber,
          liveExerciseIndex,
          'work',
        ])
      : null;
  }

  const exercise = groupedExercises[groupNum].exercises[exerciseIndex];
  const { totalSets } = groupedExercises[groupNum];
  console.log({ groupNum, setNumber, exerciseIndex, workOrRest });
  return {
    groupNum,
    exerciseIndex,
    exercise,
    workOrRest,
    setNumber,
    totalSets,
  };
};
