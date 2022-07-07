const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

//#region Callback hell
// alice1.animate(aliceTumbling, aliceTiming).finished.then(
//   () => alice2.animate(aliceTumbling, aliceTiming).finished.then(
//     () => alice3.animate(aliceTumbling, aliceTiming)
//   )
// );
//#endregion

//#region  then catch
// alice1.animate(aliceTumbling, aliceTiming).finished.then(
//   () => alice2.animate(aliceTumbling, aliceTiming).finished
// ).then(
//   () => alice3.animate(aliceTumbling, aliceTiming)
// ).catch(
//   e => console.error(`Detect error: '${e}', while animating.`)
// );
//#endregion

//#region async await
async function animateOneByOne() {
  try {
    await alice1.animate(aliceTumbling, aliceTiming).finished;
    await alice2.animate(aliceTumbling, aliceTiming).finished;
    alice3.animate(aliceTumbling, aliceTiming);
  } catch (e) {
    console.error(`Detect error: '${e}', while animating.`)
  }
}

animateOneByOne();
//#endregion